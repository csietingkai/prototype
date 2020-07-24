// react
import * as React from 'react';

// font awesome
import { faInfoCircle } from '@fortawesome/fontawesome-free-solid';

// components
import Icon from './Icon';

export default class InfoIcon extends React.Component<{}, {}> {
    render() {
        return (
            <Icon name='info-circle' icon={faInfoCircle} />
        );
    }
}
