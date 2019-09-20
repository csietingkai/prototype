import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			items: []
		}
	}

	componentDidMount() {
		const params= {
			username: 'tingkai',
			password: 'htkkoeoh'
		}
		axios.post('/api/login', null, {params}).then((response) => {
			console.log(response);
			const headers = {
				'Access-Control-Allow-Headers': 'x-access-token',
				'X-Auth-Token': response.data.tokenString
			};
			axios.get('/api/item/getAll', {headers}).then(items => {
				console.log(items);
				this.setState({
					items: items.data
				});
			})
		})
	}

	render() {
		const items = this.state.items.map((item, idx) => <li key={idx}>{item.name} - ${item.price}</li>);

		return (
			<div>
				<h1>Hello World!</h1>
				<ul>{items}</ul>
			</div>
		)
	}
}

export default App;
