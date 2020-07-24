// react
import * as React from 'react';

// font awesome
import { faHome } from '@fortawesome/fontawesome-free-solid';

// components
import Icon from './Icon';

export default class HomeIcon extends React.Component<{}, {}> {
    render() {
        return (
            <Icon name='home' icon={faHome} />
        );
    }
}
