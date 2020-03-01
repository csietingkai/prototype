import axios from 'axios';

import constant from 'js/util/constant';
import util from 'js/util/util';

const FILE_CONTROLLER_PREFIX = constant.API_BASE_URL + '/file';
const REPOSITORIES_PATH = FILE_CONTROLLER_PREFIX + '/repositories';
const FILE_LIST_PATH = FILE_CONTROLLER_PREFIX + '/list';

const getFileRepositories = async () => {
    const headers = util.getCommonHeader(util.getToken());
    return axios.get(REPOSITORIES_PATH, {
        headers
    });
}

const getFileList = async (repositoryName) => {
    const headers = util.getCommonHeader(util.getToken());
    return axios.get(FILE_LIST_PATH, {
        headers,
        params: {
            repositoryName
        }
    });
}

export default {
    getFileRepositories,
    getFileList
};