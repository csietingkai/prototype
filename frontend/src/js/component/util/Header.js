import React from 'react';
import { Button, Navbar, Nav, Form, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import 'resource/css/header.css'

export default class Header extends React.Component {

	render() {
		let link = (
			<a className="black-link" href="https://github.com/csietingkai/prototype">GitHub</a>
		);

		let logoutBtn = (
			<Button variant='outline-primary' className='logout-btn' onClick={this.props.removeToken}>
				<i className='fa fa-sign-out'></i>
				<span> Logout</span>
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
			<Navbar bg='light' expand='lg'>
				<Navbar.Brand href='/'>Prototype</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto' />
					{form}
				</Navbar.Collapse>
			</Navbar>
		);
	}
};