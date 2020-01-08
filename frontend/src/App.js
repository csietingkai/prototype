import React from 'react';
import LoginPage from 'component/LoginPage'
import MainPage from 'component/MainPage'
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

		return app;
	}
}

export default App;
