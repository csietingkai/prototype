import Cookie from "js-cookie"

const API_BASE_URL = '/api';

const getCommonHeader = (token) => {
	return {
		'X-Auth-Token': token
	};
};

const COOKIE_TOKEN_KEY = 'token'

const setToken = (token) => {
	Cookie.set('token', token)
}

const getToken = () => {
	Cookie.get('token');
}

const ENTER_CHAR_CODE = 13;

export default {
	API_BASE_URL,
	getCommonHeader,
	COOKIE_TOKEN_KEY,
	setToken,
	getToken,
	ENTER_CHAR_CODE
}

