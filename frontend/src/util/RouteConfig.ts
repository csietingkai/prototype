// react
import * as React from 'react';

// components
import About from 'components/view/About';
import Home from 'components/view/Home';
import Example from 'components/view/Example';
import HomeIcon from 'components/common/icons/HomeIcon';
import InfoIcon from 'components/common/icons/InfoIcon';
import TableIcon from 'components/common/icons/TableIcon';

interface IRouterConfig {
    text: string;
    route: string;
    icon?: React.ComponentType<any>;
    component: React.ComponentType<any>;
}

const RouterConfig: Array<IRouterConfig> = [
    {
        text: 'Home',
        route: '/',
        icon: HomeIcon,
        component: Home
    },
    {
        text: 'About',
        route: '/about',
        icon: InfoIcon,
        component: About
    },
    {
        text: 'Simple DB Table',
        route: '/table',
        icon: TableIcon,
        component: Example
    }
];

export default RouterConfig;
