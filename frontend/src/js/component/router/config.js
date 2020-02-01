import HomeIcon from '@material-ui/icons/Home';
import AppsIcon from '@material-ui/icons/Apps';

import EntityTable from 'js/component/util/EntityTable';
import About from 'js/component/view/About';

export default [
	{
		text: 'Home',
		route: '/',
		icon: HomeIcon,
		component: About
	},
	'divider',
	{
		text: 'Component',
		icon: AppsIcon,
		list: [
			{
				text: 'EntityTable',
				route: '/EntityTable',
				component: EntityTable
			}
		]
	}
];