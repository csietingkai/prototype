import React from 'react';
import Table from 'react-bootstrap/Table';

import item from 'js/api/item';

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

	getColumnNames = (list) => {
		let columnNames = [];
		if (Array.isArray(list)) {
			for (let item of list) {
				columnNames.push(...Object.keys(item));
			}
		}
		return [...new Set(columnNames)];
	}

	renderTableHead = (columnNames) => {
		let headInfo = columnNames.map((name) => {
			return (
				<th key={name}>{name}</th>
			);
		});
		console.log(headInfo);
		return (
			<thead>
				<tr>
					{headInfo}
				</tr>
			</thead>
		);
	}

	renderTableBody = (list, keys) => {
		let rows = list.map((item, itemIndex) => {
			let cells = keys.map((key, keyIndex) => {
				let tdKey = itemIndex + '-' + keyIndex;
				let tdValue = item[key];
				return (
					<td key={tdKey}>{tdValue}</td>
				);
			});
			return (
				<tr key={itemIndex}>
					{cells}
				</tr>
			);
		});
		return (
			<tbody>
				{rows}
			</tbody>
		);
	}

	render() {
		let columnNames = this.getColumnNames(this.state.list);
		let thead = this.renderTableHead(columnNames);
		let tbody = this.renderTableBody(this.state.list, columnNames);
		return (
			<div>
				<span>ItemTable</span>
				<Table striped bordered hover>
					{thead}
					{tbody}
				</Table>
			</div>
		);
	}
};
