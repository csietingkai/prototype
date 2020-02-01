import React from 'react';
import { Button, Navbar, Nav, Form } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import 'resource/css/header.css'

export default class Header extends React.Component {

	render() {
		let formContent = (
			<Button variant='outline-primary' className='logout-btn'>
				<i className='fa fa-sign-out'></i>
				<span> Logout</span>
			</Button>
		);

		return (
			<Navbar bg='light' expand='lg'>
				<Navbar.Brand href='/'>Prototype</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto' />
					<Form inline>
						{formContent}
					</Form>
				</Navbar.Collapse>
			</Navbar>
		);
	}
};