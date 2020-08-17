// react
import * as React from 'react';
import { Container } from 'react-bootstrap';

// components
import Tabs from 'components/common/Tabs';
import Form from 'components/common/Form';
import UserIcon from 'components/common/icons/UserIcon';
import LockIcon from 'components/common/icons/LockIcon';

// utils
import { onTextChange } from 'util/OnChangeFunctions';

interface LoginProps {
    loginFunc: (username: string, password: string) => void;
    registerFunc: (username: string, email: string, password: string) => void;
}

interface LoginState {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

    public onLoginClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log('Login Button Clicked', event);
        const { username, password } = this.state;
        this.props.loginFunc(username, password);
    };

    public onRegisterClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log('Register Button Clicked', event);
        const { username, email, password, confirmPassword } = this.state;
        if (password && confirmPassword && password === confirmPassword) {
            this.props.registerFunc(username, email, password);
        }
    };

    render() {
        const loginForm = (
            <Form
                contents={[
                    { text: 'username', icon: UserIcon, showIcon: true, type: 'text', value: this.state.username, onChange: onTextChange(this, 'username') },
                    { text: 'password', icon: LockIcon, showIcon: true, type: 'password', value: this.state.password, onChange: onTextChange(this, 'password') },
                ]}
                buttons={[
                    { text: 'Login', onClick: this.onLoginClick }
                ]}
            />
        );
        const registerForm = (
            <Form
                contents={[
                    { text: 'Username', showText: true, type: 'text', required: true, value: this.state.username, onChange: onTextChange(this, 'username') },
                    { text: 'Email', showText: true, type: 'text', required: true, value: this.state.email, onChange: onTextChange(this, 'email') },
                    { text: 'Password', showText: true, type: 'password', required: true, value: this.state.password, onChange: onTextChange(this, 'password') },
                    { text: 'Confirm Password', showText: true, type: 'password', required: true, value: this.state.confirmPassword, onChange: onTextChange(this, 'confirmPassword') }
                ]}
                buttons={[
                    { text: 'Register', onClick: this.onRegisterClick }
                ]}
            />
        );

        return (
            <Container className='login-block top-space buttom-space'>
                <Tabs
                    name='login-tabs'
                    center={true}
                    data={[
                        { text: 'Login', children: loginForm },
                        { text: 'Register', children: registerForm }
                    ]}
                />
            </Container>
        );
    }
}
