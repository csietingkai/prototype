// react
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// utils
import RouterConfig from 'util/RouteConfig';

interface SidebarProps {
    isShow: boolean;
}

interface SidebarState { }

export default class Sidebar extends React.Component<SidebarProps, SidebarState> {
    constructor(props: SidebarProps) {
        super(props);
        this.state = {};
    }

    render() {
        const { isShow } = this.props;

        const routes = RouterConfig.map((config, index) => {
            const { text, route, icon: Icon } = config;
            return (
                <Link className='list-group-item list-group-item-action bg-light' to={route} key={`sidebar${index}`}>
                    <Icon />
                    {' '}
                    {text}
                </Link>
            );
        });
        const sidebar = (
            <Container className='bg-light border-right sidebar no-space' >
                <Container className='list-group list-group-flush no-space'>
                    {routes}
                </Container>
            </Container>
        );
        if (isShow) {
            return sidebar;
        } else {
            return null;
        }
    }
}
