import HomeIcon from '@material-ui/icons/Home';
import AppsIcon from '@material-ui/icons/Apps';

import About from 'js/component/view/About';
import ItemTable from 'js/component/view/ItemTable';
import UploadPage from 'js/component/view/UploadPage';

export default [
	{
		text: 'Home',
		route: '/',
		icon: HomeIcon,
		component: About
	},
	'divider',
	{
		text: 'Example',
		icon: AppsIcon,
		list: [
			{
				text: 'Upload File',
				route: '/upload',
				component: UploadPage
			}
		]
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