import axios from 'axios';

import { getAuthHeader } from 'util/AppUtil';
import { API_URL, ITEM_GET_ALL_PATH } from 'util/Constant';

const getAll = async () => {
    const headers = getAuthHeader();
    const response = await axios.get(API_URL + ITEM_GET_ALL_PATH, { headers });
    const data = response.data;
    return data;
};

export default { getAll };
