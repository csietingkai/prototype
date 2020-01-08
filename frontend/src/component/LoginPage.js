import React from 'react';
import auth from 'api/auth';
import { Button, Container, Row, Col, Form, Image } from 'react-bootstrap';
import bg from 'assets/img/bg.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/css/login.css'

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

	handleLoginClick = () => {
		auth.login(this.state.username, this.state.password).then((response) => {
			this.props.setToken(response.data.tokenString);
		});
	}

	handleRegisterClick = () => {
		auth.register(this.state.username, this.state.password).then((response) => {
			console.log(response);
		});
	}
	
	render() {
		// TODO 
		let bgImg = (
			<div className="login-background-image" >
				<Image alt="bg" className="w-100 h-100" src={bg} ></Image>
			</div>
		);
		let loginBlock = (
			<Container className="login-block">
				<Row className="login-title">
					<Col>Welcome</Col>
				</Row>
				<Form className="login-form">
					<Form.Group as={Row}>
						<Form.Label column sm="3">Username</Form.Label>
						<Col sm="9">
							<Form.Control placeholder="Username" onChange={this.handleUsernameChanged} />
						</Col>
					</Form.Group>
					<Form.Group as={Row}>
						<Form.Label column sm="3">Password</Form.Label>
						<Col sm="9">
							<Form.Control type="password" placeholder="Password" onChange={this.handlePasswordChanged}/>
						</Col>
					</Form.Group>
					<Button variant="primary" className="login-btn" onClick={this.handleLoginClick}>
						Login
					</Button>
					<Button variant="primary" className="login-btn" onClick={this.handleRegisterClick}>
						Register
					</Button>
				</Form>
			</Container>
		);
		return (
			<div className="App">
				{bgImg}
				{loginBlock}
			</div>
		);
	}
};