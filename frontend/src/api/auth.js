import axios from 'axios';

export default {
	login(username, password) {
		return axios.post('/api/login', null, {
			params: {
				username,
				password
			}
		});
	}
};