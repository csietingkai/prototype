import React from 'react';
import auth from 'api/auth';
import 'assets/css/login.css'

export default class LoginPage extends React.Component {
	
	render() {
		const errorMsg = 'LOGIN FAILED';
		return (
			<div>
				<div class="container">
					<div class="loginCard">
						<div class="title">
							<h2 style="color:#333333;">Welcome WTDS System</h2>
							<span style="color:#AA0000">{errorMsg}</span>
						</div>
						<div class="loginForm">
							<form>
								<input></input>
								<input type="password"></input>
							</form>
						</div>
						<div class="loginBtn">
							<button >LOGIN</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
};