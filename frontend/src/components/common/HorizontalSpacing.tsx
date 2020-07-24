// react
import * as React from 'react';

interface HorizontalSpacingProps { }

interface HorizontalSpacingState { }

export class HorizontalSpacing extends React.Component<HorizontalSpacingProps, HorizontalSpacingState> {
    constructor(props: HorizontalSpacingProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <span className='horizontal-space' />
        );
    }
}
