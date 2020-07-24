// react
import * as React from 'react';

// font awesome
import { faLock } from '@fortawesome/fontawesome-free-solid';

// components
import Icon from './Icon';

export default class LockIcon extends React.Component<{}, {}> {
    render() {
        return (
            <Icon name='lock' icon={faLock} />
        );
    }
}
