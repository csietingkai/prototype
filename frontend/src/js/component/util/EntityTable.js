import React from 'react';
import Table from 'react-bootstrap/Table';

import item from 'js/api/item';

export default class EntityTable extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			list: []
		};
		this.fetchEntity()
	}

	fetchEntity = () => {
		item.getAll().then((response) => {
			this.setState({
				list: response.data
			});
		});
	}

	render() {
		for (let i = 0; i < this.state.list.length; i++) {
			console.log(this.state.list[i]);
		}
		return (
			<Table>
				<thead>
				</thead>
				<tbody>

				</tbody>
			</Table>
		);
	}
};