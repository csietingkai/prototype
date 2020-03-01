import React from 'react';
import { Button, Container, Row, Col, Form, Image, InputGroup, FormControl } from 'react-bootstrap';

import auth from 'js/api/auth';
import notify from 'js/util/notify';
import constant from 'js/util/constant';

import bg from 'resource/img/bg.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import 'resource/css/login.css'

export default class LoginPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
	}

	handleUsernameChanged = (event) => {
		this.setState({
			username: event.target.value
		});
	}

	handlePasswordChanged = (event) => {
		this.setState({
			password: event.target.value
		});
	}

	handleLoginClick = async () => {
		let response = await auth.login(this.state.username, this.state.password);
		let authToken = response.authToken;
		if (response.success && authToken) {
			notify.success(response.message);
			this.props.setToken(authToken.tokenString);
		} else {
			notify.warning(response.message);
		}
	}

	handleEnterKey = (event) => {
		if (event.charCode === constant.ENTER_CHAR_CODE) {
			this.handleLoginClick();
		}
	}

	render() {
		let bgImg = (
			<div className='login-background-image' >
				<Image alt='bg' className='w-100 h-100' src={bg} ></Image>
			</div>
		);
		let loginBlock = (
			<Container className='login-block'>
				<Row className='login-title'>
					<Col>Welcome</Col>
				</Row>
				<Form className='login-form'>
					<Form.Group as={Row}>
						<InputGroup className='login-input'>
							<InputGroup.Prepend>
								<InputGroup.Text>
									<i className='fa fa-user'></i>
								</InputGroup.Text>
							</InputGroup.Prepend>
							<FormControl placeholder='Username' onKeyPress={this.handleEnterKey} onChange={this.handleUsernameChanged} />
						</InputGroup>
					</Form.Group>
					<Form.Group as={Row}>
						<InputGroup className='login-input'>
							<InputGroup.Prepend>
								<InputGroup.Text>
									<i className='fa fa-lock'></i>
								</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control type='password' placeholder='Password' onKeyPress={this.handleEnterKey} onChange={this.handlePasswordChanged} />
						</InputGroup>
					</Form.Group>
					<Button as={Row} variant='primary' className='login-btn' onClick={this.handleLoginClick}>
						Login
					</Button>
				</Form>
			</Container>
		);
		return (
			<div className='App'>
				{bgImg}
				{loginBlock}
			</div>
		);
	}
};