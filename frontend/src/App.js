import React from 'react';
import { NotificationContainer } from 'react-notifications';

import LoginPage from 'component/LoginPage'
import MainPage from 'component/MainPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import 'assets/css/main.css';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			token: undefined
		}
	}

	setToken = (token) => {
		this.setState({
			token: token
		})
	}

	render() {
		let app = (
			<LoginPage setToken={this.setToken}/>
		);

		if (this.state.token) {
			app = (
				<MainPage />
			);
		}

		return (
			<div>
				{app}
				<NotificationContainer/>
			</div>
		);
	}
}

export default App;
