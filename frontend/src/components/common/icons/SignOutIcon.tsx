// react
import * as React from 'react';

// font awesome
import { faSignOutAlt } from '@fortawesome/fontawesome-free-solid';

// components
import Icon from './Icon';

export default class SignOutIcon extends React.Component<{}, {}> {
    render() {
        return (
            <Icon name='sign-out-alt' icon={faSignOutAlt} />
        );
    }
}
