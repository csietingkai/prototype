// cookies
import * as Cookies from 'js-cookie';

// utils
import { AUTH_TOKEN_KEY, AUTH_TOKEN_EXPIRE } from 'util/Constants';

export const setAuthToken = (token: string) => {
	Cookies.set(AUTH_TOKEN_KEY, token, { expires: AUTH_TOKEN_EXPIRE });
};

export const getAuthToken = (): string => {
	return Cookies.get(AUTH_TOKEN_KEY);
};

export const removeAuthToken = () => {
	Cookies.remove(AUTH_TOKEN_KEY);
};

export default {
	setAuthToken,
	getAuthToken,
	removeAuthToken
};
