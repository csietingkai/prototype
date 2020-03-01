import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';

import config from 'js/component/router/config';

import 'resource/css/sidebar.css'

export default class SideBar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			items: config
		};
	}

	render() {
		const items = this.state.items.map((item, index) => {
			let sidebarItem = null;
			if (item === 'divider') {
				sidebarItem = (
					<Divider className='sidebar-divider' />
				);
			} else {
				sidebarItem = (
					<SideBarItem level={this.props.level} item={item} />
				);
			}
			return (
				<React.Fragment key={`${item.text}${index}`}>
					{sidebarItem}
				</React.Fragment>
			);
		});

		return (
			<div className='sidebar'>
				<List disablePadding dense>
					{items}
				</List>
			</div>
		);
	}
};

class SideBarItem extends React.Component {
	static defaultProps = {
		level: 0
	}

	constructor(props) {
		super(props);
		this.state = {
			collapse: true
		};
	}

	onClick = () => {
		this.setState({
			collapse: !this.state.collapse
		});
	}

	render() {
		let hasSubList = Array.isArray(this.props.item.list) && this.props.item.list.length;
		let expandIcon = null;
		let subList = null;
		let subItems = null;

		if (hasSubList) {
			// render arrow icon
			if (this.state.collapse) {
				expandIcon = (
					<ExpandLessIcon className='sidebar-item-expand-arrow sidebar-item-expand-arrow-expanded' />
				);
			} else {
				expandIcon = (
					<ExpandMoreIcon className='sidebar-item-expand-arrow' />
				);
			}

			// render subItems
			subItems = this.props.item.list.map((subItem, index) => {
				let fragmentContent = null;
				if (subItem === 'divider') {
					fragmentContent = <Divider style={{ margin: '6px 0' }} />
				} else {
					fragmentContent = (
						<SideBarItem level={this.props.level + 1} item={subItem} />
					);
				}
				return (
					<React.Fragment key={`${subItem.name}${index}`}>
						{fragmentContent}
					</React.Fragment>
				);
			});

			subList = (
				<List disablePadding dense>
					{subItems}
				</List>
			);
		}

		let hasIcon = !!this.props.item.icon;
		let itemIcon = null;
		if (hasIcon) {
			let Icon = this.props.item.icon;
			itemIcon = (
				<Icon className='sidebar-item-icon' fontSize='small' />
			);
		}

		let link = this.props.item.text
		if (this.props.item.route) {
			link = (
				<Link to={this.props.item.route}>{this.props.item.text}</Link>
			);
		}

		return (
			<div>
				<ListItem className='sidebar-item' onClick={this.onClick} dense>
					<div style={{ paddingLeft: this.props.level * 10 }} className='sidebar-item-content' >
						{itemIcon}
						<div className='sidebar-item-text'>
							{link}
						</div>
					</div>
					{expandIcon}
				</ListItem>
				<Collapse in={!this.state.collapse} timeout='auto' unmountOnExit>
					{subList}
				</Collapse>
			</div>
		);
	}
}

SideBarItem.propTypes = {
	level: PropTypes.number.isRequired,
	item: PropTypes.oneOfType(
		[
			PropTypes.shape({
				text: PropTypes.string.isRequired
			}),
			PropTypes.string.isRequired
		]
	)
};