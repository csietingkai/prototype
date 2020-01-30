import Cookie from "js-cookie"

import constant from 'js/util/constant'

const getCommonHeader = (token) => {
	return {
		'X-Auth-Token': token
	};
};

const setToken = (token) => {
	Cookie.set(constant.COOKIE_TOKEN_KEY, token);
}

const getToken = () => {
	return Cookie.get(constant.COOKIE_TOKEN_KEY);
}

export default {
	getCommonHeader,
	setToken,
	getToken
}

