import axios from 'axios';

export default {
	getAll() {
		const headers = COMMON_HEADER(getToken());
		return axios.get('/api/item/getAll', {
			headers
		});
	}
};