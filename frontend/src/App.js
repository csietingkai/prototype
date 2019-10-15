import React from 'react';
import auth from 'api/auth';
import item from 'api/item';
import LoginPage from 'component/LoginPage'
import 'assets/css/main.css';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			items: []
		}
	}

	componentDidMount() {
		const username = 'tingkai';
		const password = 'htkkoeoh';
		auth.login(username, password).then((response) => {
			item.getAll(response.data.tokenString).then(items => {
				this.setState({
					items: items.data
				});
			})
		})
	}

	render() {
		const items = this.state.items.map((item, idx) => <li key={idx}>{item.name} - ${item.price}</li>);

		return (
			<LoginPage />
		)
	}
}

export default App;
