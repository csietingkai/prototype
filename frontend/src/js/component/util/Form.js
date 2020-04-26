import React from 'react';
import PropTypes from 'prop-types';
import { Button, Navbar, Nav, Form as BSForm, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import 'resource/css/form.css'

export default class Form extends React.Component {
    render() {
        let inputs = this.props.inputs.map((inputConfig, idx) => {
            let inputTitle = inputConfig.text;
            if (inputConfig.useIcon) {
                inputTitle = (
                    <i className={'fa fa-' + inputConfig.text}></i>
                );
            }
            return (
                <BSForm.Group as={Row} key={this.props.name + 'input' + idx}>
                    <BSForm.Label column sm={this.props.spiltAt ? this.props.spiltAt : 2}>
                        {inputTitle}
                    </BSForm.Label>
                    <Col sm={this.props.spiltAt ? 12 - this.props.spiltAt : 10}>
                        <BSForm.Control type={inputConfig.type} placeholder={inputConfig.placeholder} onChange={inputConfig.onChange} />
                    </Col>
                </BSForm.Group>
            );
        });

        let buttons = this.props.buttons.map((buttonConfig, idx) => {
            return (
                <Button variant={buttonConfig.primary ? buttonConfig.primary : 'primary'} onClick={buttonConfig.onClick} key={this.props.name + 'button' + idx}>
                    {buttonConfig.text}
                </Button>
            );
        });

        return (
            <BSForm>
                {inputs}
                {buttons}
            </BSForm>
        )
    }
};

Form.propTypes = {
    name: PropTypes.string.isRequired,
    spiltAt: PropTypes.number,
    inputs: PropTypes.arrayOf(PropTypes.shape({
        useIcon: PropTypes.bool,
        text: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        type: PropTypes.oneOf(['text', 'select', 'password']).isRequired,
        placeholder: PropTypes.string
    })),
    buttons: PropTypes.arrayOf(PropTypes.shape({
        primary: PropTypes.string,
        text: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    }))
}