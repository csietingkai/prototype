import React from 'react';

import { Modal, Button, Container } from 'react-bootstrap';

import item from 'js/api/item';
import Form from 'js/component/util/Form';
import Table from 'js/component/util/Table';

export default class ItemTable extends React.Component {
	constructor(props) {
		super(props)
		this.fetchItems();
		this.state = {
			list: [],
			selectItem: null,
			editModalOpen: false,
			deleteModalOpen: false
		};
	}

	fetchItems = () => {
		item.getAll().then((response) => {
			this.setState({
				list: response.data
			});
		});
	}

	onItemEdit = (rowData) => {
		this.showModal('editModalOpen', true, rowData);
	}

	onItemDelete = (rowData) => {
		this.showModal('deleteModalOpen', true, rowData);
	}

	showModal = (modalStateName, isOpen, selectItem) => {
		const newState = {}
		newState[modalStateName] = !!isOpen;
		newState.selectItem = selectItem;
		this.setState(newState);
	}

	onEditInputNameChange = (event) => {
		console.log(event.target.value);
	}

	render() {
		let table = (<Table list={this.state.list} type='item' editFunction={this.onItemEdit} deleteFunction={this.onItemDelete} />);

		let editInputs = [
			{
				text: 'name',
				onChange: this.onEditInputNameChange,
				type: 'text',
				placeholder: 'New Name'
			},
			{
				text: 'price',
				onChange: this.onEditInputNameChange,
				type: 'text',
				placeholder: 'New Price'
			}
		];
		let editButtons = [];
		let editModal = (
			<Modal show={this.state.editModalOpen} aria-labelledby='contained-modal-title-vcenter' centered onHide={this.showModal.bind(this, 'editModalOpen', false)}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container style={{ maxWidth: '80%' }}>
						<Form name='editItemForm' inputs={editInputs} buttons={editButtons} />
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='primary' onClick={this.showModal.bind(this, 'editModalOpen', false)}>
						Save Changes
					</Button>
					<Button variant='secondary' onClick={this.showModal.bind(this, 'editModalOpen', false)}>
						Close
					</Button>
				</Modal.Footer>
			</Modal >
		);

		let deleteModal = (
			<Modal show={this.state.deleteModalOpen} aria-labelledby='contained-modal-title-vcenter' centered onHide={this.showModal.bind(this, 'deleteModalOpen', false)}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={this.showModal.bind(this, 'deleteModalOpen', false)}>
						Close
					</Button>
					<Button variant='primary' onClick={this.showModal.bind(this, 'deleteModalOpen', false)}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		);

		return (
			<div>
				<h3>ItemTable</h3>
				<br />
				{table}
				{editModal}
				{deleteModal}
			</div>
		);
	}
};
