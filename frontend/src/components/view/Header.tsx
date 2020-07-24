// react
import * as React from 'react';
import { Button, Nav, Form, Col, Navbar } from 'react-bootstrap';

// components
import ChevronLeftIcon from 'components/common/icons/ChevronLeftIcon';
import ChevronRightIcon from 'components/common/icons/ChevronRightIcon';
import SignOutIcon from 'components/common/icons/SignOutIcon';

interface HeaderProps {
    isSidebarShow?: boolean;
    logout: () => void;
    toggleSidebar?: () => void;
}

interface HeaderState { }

export class Header extends React.Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
        super(props);
        this.state = {};
    }

    render() {
        const { isSidebarShow, logout, toggleSidebar } = this.props;

        const showToggleBtn: boolean = isSidebarShow !== undefined;
        let toggleBtn = null;
        if (showToggleBtn) {
            toggleBtn = (
                <Button variant='outline-secondary' onClick={toggleSidebar} className='right-interval'>
                    {isSidebarShow ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </Button>
            );
        }

        let link = (
            <a className='black-link' href='https://github.com/csietingkai/prototype'>GitHub</a>
        );

        let logoutBtn = (
            <Button variant='outline-primary' className='logout-btn' onClick={logout}>
                <SignOutIcon />
                <span>{' Logout'}</span>
            </Button>
        );

        let form = (
            <Form inline>
                <Form.Row as={Col}>
                    {link}
                </Form.Row>
                {logoutBtn}
            </Form>
        );

        return (
            <Navbar bg='light' expand='lg' className='border-bottom'>
                {toggleBtn}
                <Navbar.Brand href='/'>{' Prototype'}</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto' />
                    {form}
                </Navbar.Collapse>
            </Navbar>
        );
        // <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        //     {toggleBtn}
        //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //         <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        //             <li className="nav-item active">
        //                 <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
        //             </li>
        //             <li className="nav-item">
        //                 <a className="nav-link" href="#">Link</a>
        //             </li>
        //             <li className="nav-item dropdown">
        //                 <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        //                     {'Dropdown'}
        //                 </a>
        //                 <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
        //                     <a className="dropdown-item" href="#">Action</a>
        //                     <a className="dropdown-item" href="#">Another action</a>
        //                     <div className="dropdown-divider"></div>
        //                     <a className="dropdown-item" href="#">Something else here</a>
        //                 </div>
        //             </li>
        //         </ul>
        //     </div>
        // </nav>
    }
}
