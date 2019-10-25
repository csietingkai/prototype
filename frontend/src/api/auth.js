import axios from 'axios';

export default {
	login(username, password) {
		return axios.post('/api/login', null, {
			params: {
				username,
				password
			}
		});
	},
	register(username, password) {
		const user = {
			name: username,
			pwd: password,
			role: 'USER'
		};
		return axios.post('/api/register', user);
	}
};