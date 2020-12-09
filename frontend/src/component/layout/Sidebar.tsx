import * as React from 'react';
import { NavLink, RouteChildrenProps } from 'react-router-dom';
import { Nav, NavItem, NavLink as RbNavLink } from 'react-bootstrap';
import classNames from 'classnames';

import SidebarMinimizer from 'component/layout/SidebarMinimizer';

import { SIDEBAR_ITEMS } from 'util/Constant';
import { SidebarItem } from 'util/Interface';
import { isArray, isArrayEmpty, isExternalUrl } from 'util/AppUtil';

export interface SidebarProps extends RouteChildrenProps<any> { }

export interface SidebarState { }

export default class Sidebar extends React.Component<SidebarProps, SidebarState> {

    constructor(props: SidebarProps) {
        super(props);
    }

    private handleClick = (event: any) => {
        event.preventDefault();
        event.target.parentElement.classList.toggle('open');
    };

    private activeRoute = (routeName: string) => {
        return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
    };

    private hideMobile = () => {
        if (document.body.classList.contains('sidebar-mobile-show')) {
            document.body.classList.toggle('sidebar-mobile-show');
        }
    };

    private navList = (items: SidebarItem[]) => {
        return !isArrayEmpty(items) && items.map((item, idx) => {
            const { type } = item;
            const key: React.Key = `sidebar-item-${idx}`;
            if (type === 'dropdown') {
                if (isArray(item.children)) {
                    return (
                        <li key={key} className={this.activeRoute(item.url)}>
                            <a className='nav-link nav-dropdown-toggle' href='#' onClick={this.handleClick}>
                                <span className='icon'>{item.icon}</span>
                                {item.name}
                            </a>
                            <ul className='nav-dropdown-items'>
                                {this.navList(item.children.map(child => { return child.url ? { ...child, url: item.url + child.url } : { ...child }; }))}
                            </ul>
                        </li>
                    );
                } else {
                    return this.navLink(item, key, { link: classNames('nav-link') });
                }
            } else if (type === 'wrapper') {
                return <li key={key} className='nav-title'>{item.name}</li>;
            }
            return this.navLink(item, key, { link: classNames('nav-link') });
        });
    };

    private navLink = (item: SidebarItem, key: React.Key, classes: any) => {
        const url = item.url ? item.url : '';
        return (
            <NavItem key={key}>
                { isExternalUrl(url) ?
                    <RbNavLink href={url} active className={classes.link}>
                        <span className='icon'>{item.icon}</span>
                        {item.name}
                    </RbNavLink>
                    :
                    <NavLink to={url} activeClassName='active' className={classes.link} onClick={this.hideMobile}>
                        <span className='icon'>{item.icon}</span>
                        {item.name}
                    </NavLink>
                }
            </NavItem>
        );
    };

    render() {
        return (
            <div className='sidebar'>
                <nav className='sidebar-nav'>
                    <Nav>
                        {this.navList(SIDEBAR_ITEMS)}
                    </Nav>
                </nav>
                <SidebarMinimizer />
            </div>
        );
    }
}
