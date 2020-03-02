import React from 'react';

import item from 'js/api/item';
import Table from 'js/component/util/Table';

export default class ItemTable extends React.Component {

	constructor(props) {
		super(props)
		this.fetchItems();
		this.state = {
			list: []
		};
	}

	fetchItems = () => {
		item.getAll().then((response) => {
			this.setState({
				list: response.data
			});
		});
	}

	render() {
		// TODO edit function
		let table = (<Table list={this.state.list} type='item' />);
		return (
			<div>
				<h3>ItemTable</h3>
				<br />
				{table}
			</div>
		);
	}
};
