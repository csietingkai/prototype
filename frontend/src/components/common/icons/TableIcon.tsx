// react
import * as React from 'react';

// font awesome
import { faTable } from '@fortawesome/fontawesome-free-solid';

// components
import Icon from './Icon';

export default class TableIcon extends React.Component<{}, {}> {
    render() {
        return (
            <Icon name='table' icon={faTable} />
        );
    }
}
