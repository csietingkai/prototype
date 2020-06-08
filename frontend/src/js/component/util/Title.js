import React from 'react';
import PropTypes from 'prop-types';

export default class Title extends React.Component {
    render() {
        return (
            <div>{this.props.text}</div>
        );
    }
}

Title.propTypes = {
    text: PropTypes.string.isRequired
}