import axios from 'axios';

import constant from 'js/util/constant'

const LOGIN_PATH = constant.API_BASE_URL + '/login';
const REGISTER_PATH = constant.API_BASE_URL + '/register';
const VALIDATE_PATH = constant.API_BASE_URL + '/validate';

const login = async (username, password) => {
	return axios.post(LOGIN_PATH, null, {
		params: {
			username,
			password
		}
	}).then((response) => {
		return response.data;
	});
}

const register = (username, email, password) => {
	const user = {
		name: username,
		email: email,
		pwd: password,
		role: 'USER'
	};
	return axios.post(REGISTER_PATH, user);
}

const validate = (token) => {
	return axios.get(VALIDATE_PATH, null, {
		params: {
			tokenString: token
		}
	});
}

export default {
	login,
	register,
	validate
};