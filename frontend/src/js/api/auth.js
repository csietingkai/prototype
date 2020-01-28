import axios from 'axios';

import setting from 'js/util/setting'

const LOGIN_PATH = setting.API_BASE_URL + '/login';
const REGISTER_PATH = setting.API_BASE_URL + '/login';

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

export default {
	login,
	register
};