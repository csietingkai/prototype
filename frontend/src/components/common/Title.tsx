// react
import * as React from 'react';

interface TitleProps {
    text: string;
}

interface TitleState { }

export default class Title extends React.Component<TitleProps, TitleState> {
    constructor(props: TitleProps) {
        super(props);
        this.state = {};
    }

    render() {
        const { text } = this.props;
        return (
            <span>
                {text}
            </span>
        );
    }
}
