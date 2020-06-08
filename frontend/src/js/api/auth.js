import axios from 'axios';

import constant from 'js/util/constant';

const LOGIN_PATH = constant.API_BASE_URL + '/login';
const REGISTER_PATH = constant.API_BASE_URL + '/register';
const VALIDATE_PATH = constant.API_BASE_URL + '/validate';

const login = async (username, password) => {
	const response = await axios.post(LOGIN_PATH, null, {
		params: {
			username,
			password
		}
	})
	return response.data;
}

const register = async (username, email, password) => {
	const user = {
		name: username,
		email: email,
		pwd: password,
		role: 'USER'
	};
	return axios.post(REGISTER_PATH, user);
}

const validate = async (tokenString) => {
	const response = await axios.get(VALIDATE_PATH, {
		params: {
			tokenString
		}
	})
	return response.data;
}

export default {
	login,
	register,
	validate
};