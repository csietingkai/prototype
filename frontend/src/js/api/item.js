import axios from 'axios';

export default {
	getAll(token) {
		const headers = {
			'X-Auth-Token': token
		};
		return axios.get('/api/item/getAll', {
			headers
		});
	}
};