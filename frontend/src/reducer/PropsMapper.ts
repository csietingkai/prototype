import { AuthToken } from 'util/Interface';
import { Login, Logout } from './Action';

export const LoginDispatcher = (dispatch: any) => (authToken: AuthToken) => dispatch(Login(authToken));

export const LogoutDispatcher = (dispatch: any) => () => dispatch(Logout());
