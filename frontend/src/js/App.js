import React from 'react';
import { NotificationContainer } from 'react-notifications';

import auth from 'js/api/auth';
import LoginPage from 'js/component/LoginPage';
import MainPage from 'js/component/MainPage';
import util from 'js/util/util';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import 'resource/css/main.css';

class App extends React.Component {
	render() {
		let app = (
			<LoginPage root={this}/>
		);

		let token = util.getToken();
		if (token) {
			auth.validate(token).then((response) => {
				if (response.success) {
					app = (
						<MainPage root={this}/>
					);
				}
			});
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
