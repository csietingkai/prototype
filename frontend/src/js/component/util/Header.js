import React from 'react';
import { Button, Navbar, Nav, Form } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';

export default class Header extends React.Component {

	render() {
		let formContent = (
			<Button>
				<span>User Icon</span>
				<i className="fa fa-sign-in"></i>
			</Button>
		);
		if (!this.props.isLogin) {
			// formContent = 
		}

		return (
			<Navbar bg="light" expand="lg">
				<Navbar.Brand href='/'>Prototype</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto" />
					<Form inline>
						{formContent}
					</Form>
				</Navbar.Collapse>
			</Navbar>
		);
	}
};