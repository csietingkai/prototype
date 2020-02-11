import HomeIcon from '@material-ui/icons/Home';
import AppsIcon from '@material-ui/icons/Apps';

import ItemTable from 'js/component/util/ItemTable';
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
				text: 'ItemTable',
				route: '/ItemTable',
				component: ItemTable
			}
		]
	}
];