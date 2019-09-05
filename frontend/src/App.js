import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			users: []
		}
	}

	componentDidMount() {
    axios.get('/api/user/getAll')
      .then(res => {
        this.setState({ users: res.data });
      })
  }

	render() {
		const items = this.state.users.map(user => <li>{user.account}</li>);

		return (
			<div>
				<h1>Hello World!</h1>
				<ul>{items}</ul>
			</div>
		)
	}
}

export default App;
