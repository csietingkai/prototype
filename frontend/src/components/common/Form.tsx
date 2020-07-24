// react
import * as React from 'react';
import { Container, Row, InputGroup, Form as RbForm, Button } from 'react-bootstrap';

// components
import { Title } from 'components/common/Title';

interface FormContent {
    text: string;
    icon?: React.ComponentType<any>;
    showText?: boolean;
    showIcon?: boolean;
    type: 'text' | 'select' | 'radio' | 'password' | 'file' | 'email' | 'check';
    value: any;
    onChange?: (event: any) => void;
    disabled?: boolean;
    required?: boolean;
}

interface FormButton {
    text: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean;
}

interface FormProps {
    title?: string;
    contents: Array<FormContent>;
    buttons?: Array<FormButton>;
}

interface FormState { }

export class Form extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        this.state = {};
    }

    render() {
        const { title, contents, buttons } = this.props;

        const requiredSign = (
            <span className='color-red'>*</span>
        );

        const formTitle = title ? (
            <Title text={title} />
        ) : undefined;

        const formGroups = contents.map((content, index) => {
            const { text, icon: Icon, showText, showIcon, type, value, onChange, disabled, required } = content;
            let inputAutoComplete;
            switch (type) {
                case 'text':
                    inputAutoComplete = 'username';
                    break;
                case 'email':
                    inputAutoComplete = 'email';
                    break;
                case 'password':
                    inputAutoComplete = 'new password';
                    break;
                default:
                    break;
            }
            return (
                <RbForm.Group as={Row} key={title + text + type + index}>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                {showText && !showIcon && required && requiredSign}
                                {showIcon ? <Icon /> : undefined}
                                {showIcon ? ' ' : undefined}
                                {showText ? text : undefined}
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <RbForm.Control value={value} type={type} onChange={onChange} disabled={disabled} autoComplete='off' />
                    </InputGroup>
                </RbForm.Group>
            );
        });
        const formButtons = buttons ? buttons.map((button, index) => {
            const { text, onClick, disabled } = button;
            return (
                <Button variant='outline-primary' onClick={onClick} disabled={disabled} className='centered-element left-interval right-interval' key={title + text + index}>
                    {text}
                </Button>
            );
        }) : undefined;

        return (
            <Container className='top-interval bottom-interval'>
                {formTitle}
                <RbForm className='top-interval'>
                    {formGroups}
                    <Container className='centered-elements width-40-percent'>
                        {formButtons}
                    </Container>
                </RbForm>
            </Container>
        );
    }
}
