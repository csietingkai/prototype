// react
import * as React from 'react';

// font awesome
import { faChevronLeft } from '@fortawesome/fontawesome-free-solid';

// components
import Icon from './Icon';

export default class ChevronLeftIcon extends React.Component<{}, {}> {
    render() {
        return (
            <Icon name='chevron-left' icon={faChevronLeft} />
        );
    }
}
