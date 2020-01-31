import React from 'react';
import { NotificationContainer } from 'react-notifications';

import auth from 'js/api/auth';
import LoginPage from 'js/component/LoginPage';
import MainPage from 'js/component/MainPage';
import util from 'js/util/util';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import 'resource/css/main.css';

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			tokenValidateResult: false
		};

	}

	componentWillMount = () => {
		this.getValidateResult(util.getToken());
	}

	setToken = (token) => {
		util.setToken(token);
		this.setState({
			tokenValidateResult: true
		});
	}

	getValidateResult = (token) => {
		auth.validate(token).then((response) => {
			this.setState({
				tokenValidateResult: response.success
			});
		});
	}

	render() {
		let app = (
			<LoginPage setToken={this.setToken} />
		);

		let token = util.getToken();
		if (token && this.state.tokenValidateResult) {
			app = (
				<MainPage />
			);
		}

		return (
			<div>
				{app}
				<NotificationContainer />
			</div>
		);
	}
}
