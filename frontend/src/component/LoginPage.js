import React from 'react';
import auth from 'api/auth';
import 'assets/css/login.css'

export default class LoginPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			username: '',
			password: ''
		};
		this.handleUsernameChanged = this.handleUsernameChanged.bind(this);
		this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.handleRegisterClick = this.handleRegisterClick.bind(this);
	}

	handleUsernameChanged(event) {
		this.setState({
			username: event.target.value
		});
	}

	handlePasswordChanged(event) {
		this.setState({
			password: event.target.value
		});
	}

	handleLoginClick() {
		auth.login(this.state.username, this.state.password).then((response) => {
			console.log(response);
		});
	}

	handleRegisterClick() {
		auth.register(this.state.username, this.state.password).then((response) => {
			console.log(response);
		});
	}
	
	render() {
		return (
			<div>
				<div className="container">
					<div className="loginCard">
						<div className="title">
							<h2>Welcome WTDS System</h2>
						</div>
						<div className="loginForm">
							<form>
								<input onChange={this.handleUsernameChanged}></input>
								<input type="password" onChange={this.handlePasswordChanged}></input>
							</form>
						</div>
						<div className="loginBtn">
							<button onClick={this.handleLoginClick}>LOGIN</button>
							<button onClick={this.handleRegisterClick}>REGISTER</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
};