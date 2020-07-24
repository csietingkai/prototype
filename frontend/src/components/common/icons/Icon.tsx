// react
import * as React from 'react';

// font awesome
import { library } from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IconDefinition } from '@fortawesome/fontawesome-free-solid';

export interface IIcon {
    name: IconProp;
    icon: IconDefinition;
}

export default class Icon extends React.Component<IIcon, {}> {
    render() {
        const { name, icon } = this.props;
        library.add(icon);
        return (
            <FontAwesomeIcon icon={name} />
        );
    }
}
