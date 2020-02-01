import React from 'react';
import { Switch, Route } from 'react-router-dom';

import config from 'js/component/router/config';

export default class RouterView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			items: config
		};
	}

	getRouteConfigs = (items) => {
		const result = [];
		items.forEach((item) => {
			if (item.route) {
				result.push({
					key: item.text,
					link: item.route,
					component: item.component
				});
			}
			if (item.list) {
				result.push(...this.getRouteConfigs(item.list));
			}
		})
		return result;
	}

	render() {
		let routeConfigs = this.getRouteConfigs(this.state.items);
		let routes = routeConfigs.map((routeConfig, index) => {
			return (
				<Route path={routeConfig.link} component={routeConfig.component} exact={index === 0} key={routeConfig.key} />
			);
		})
		return (
			<div className='col-md-9'>
				<Switch>
					{routes}
				</Switch>
			</div>
		);
	}
}