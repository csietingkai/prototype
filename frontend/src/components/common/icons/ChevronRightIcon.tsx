// react
import * as React from 'react';

// font awesome
import { faChevronRight } from '@fortawesome/fontawesome-free-solid';

// components
import Icon from './Icon';

export default class ChevronRightIcon extends React.Component<{}, {}> {
    render() {
        return (
            <Icon name='chevron-right' icon={faChevronRight} />
        );
    }
}
