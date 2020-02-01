import React from 'react';

import Header from 'js/component/util/Header';
import Sidebar from 'js/component/router/SideBar';
import RouterView from 'js/component/router/RouterView';

export default class MainPage extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<div className='row'>
					<div className='col-md-3'>
						<Sidebar />
					</div>
					<div className='col-md-9'>
						<RouterView />
					</div>
				</div>
			</div>
		);
	}
};