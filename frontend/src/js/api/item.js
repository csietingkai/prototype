import axios from 'axios';

import constant from 'js/util/constant';
import util from 'js/util/util';

const ITEM_CONTROLLER_PREFIX = constant.API_BASE_URL + '/item';
const GET_ALL_PATH = ITEM_CONTROLLER_PREFIX + '/getAll';

const getAll = () => {
	const headers = util.COMMON_HEADER(util.getToken());
	return axios.get(GET_ALL_PATH, {
		headers
	});
}

export default {
	getAll
};