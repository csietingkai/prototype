// react
import * as React from 'react';

interface VerticalSpacingProps { }

interface VerticalSpacingState { }

export default class VerticalSpacing extends React.Component<VerticalSpacingProps, VerticalSpacingState> {
    constructor(props: VerticalSpacingProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <span className='vertical-space' />
        );
    }
}
