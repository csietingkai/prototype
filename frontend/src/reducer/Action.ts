import { Action, AuthToken } from 'util/Interface';
import { LOGIN, LOGOUT } from 'reducer/ActionType';

export const Login = (payload: AuthToken): Action<AuthToken> => ({ type: LOGIN, payload });

export const Logout = (): Action<undefined> => ({ type: LOGOUT, payload: undefined });
