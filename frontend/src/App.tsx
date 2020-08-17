// react
import * as React from 'react';
import { ToastContainer } from 'react-toastify';

// components
import Login from 'components/view/Login';
import Main from 'components/view/Main';

// apis
import { login, register, validate } from 'api/auth';

// utils
import { getAuthToken, setAuthToken, removeAuthToken } from 'util/TokenHelper';
import notify from 'util/Notify';

export interface AppProps { }

export interface AppState {
    isLogin: boolean;
}

export class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            isLogin: false
        };
        this.checkToken();
    }

    private onLoginClick = async (username: string, password: string) => {
        const { message, data, success } = await login(username, password);
        if (success) {
            notify.success(message);
            const { tokenString } = data;
            setAuthToken(tokenString);
            this.checkToken();
        } else {
            notify.warning(message);
        }
    };

    private onRegisterClick = async (username: string, email: string, password: string) => {
        const { message, data, success } = await register(username, email, password, process.env.MODE === 'developement');
        console.log(message);
    };

    private checkToken = async () => {
        const tokenString: string = getAuthToken();
        if (tokenString) {
            const { success } = await validate(tokenString);
            this.setState({ isLogin: success });
        }
    };

    private logout = () => {
        removeAuthToken();
        this.setState({ isLogin: false });
    };

    public render() {
        const { isLogin } = this.state;

        let app = (
            <Login
                loginFunc={this.onLoginClick}
                registerFunc={this.onRegisterClick}
            />
        );
        if (isLogin) {
            app = (
                <Main
                    logout={this.logout}
                />
            );
        }

        return (
            <>
                {app}
                <ToastContainer />
            </>
        );
    }
}
