import React from 'react';

import item from 'js/api/item';
import renderTable from 'js/component/util/Table'

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
		let table = renderTable(this.state.list, 'item', null, null);
		return (
			<div>
				<span>ItemTable</span>
				{table}
			</div>
		);
	}
};
