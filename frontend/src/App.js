import React from 'react';
import LoginPage from 'component/LoginPage'
import 'assets/css/main.css';

class App extends React.Component {
	constructor() {
		super();
		this.state = { }
	}

	componentDidMount() {
		
	}

	render() {
		return (
			<LoginPage />
		)
	}
}

export default App;
