import React from 'react';

import EntityTable from 'js/component/util/EntityTable';
import constant from 'js/util/constant'

import 'resource/css/login.css'

export default class MainPage extends React.Component {
	render() {
		return (
			<EntityTable name={constant.ENTITIES.ITEM}></EntityTable>
		);
	}
};