import React from 'react';
import Cookie from 'js-cookie'
import { NotificationContainer } from 'react-notifications';

import LoginPage from 'js/component/LoginPage'
import MainPage from 'js/component/MainPage';
import setting from 'js/util/setting'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import 'resource/css/main.css';

class App extends React.Component {
	render() {
		let app = (
			<LoginPage/>
		);

		if (Cookie.get(setting.COOKIE_TOKEN_KEY)) {
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
