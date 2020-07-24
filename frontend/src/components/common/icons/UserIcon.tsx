// react
import * as React from 'react';

// font awesome
import { faUser } from '@fortawesome/fontawesome-free-solid';

// components
import Icon from './Icon';

export default class UserIcon extends React.Component<{}, {}> {
    render() {
        return (
            <Icon name='user' icon={faUser} />
        );
    }
}
