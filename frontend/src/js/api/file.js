import axios from 'axios';

import constant from 'js/util/constant';
import util from 'js/util/util';

const FILE_CONTROLLER_PREFIX = constant.API_BASE_URL + '/file';
const REPOSITORIES_PATH = FILE_CONTROLLER_PREFIX + '/repositories';
const FILE_LIST_PATH = FILE_CONTROLLER_PREFIX + '/list';
const UPLOAD_PATH = FILE_CONTROLLER_PREFIX + '/upload';
const DOWNLOAD_PATH = FILE_CONTROLLER_PREFIX + '/download';

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

const upload = async (file) => {
    const data = new FormData()
    data.append('file', file)
    const headers = util.getCommonHeader(util.getToken());
    return axios.post(UPLOAD_PATH, data, {
        headers
    }).then((response) => {
        return response.data
    });
}

const download = async (filename) => {
    const headers = util.getCommonHeader(util.getToken());
    return axios.get(DOWNLOAD_PATH, {
        headers,
        responseType: 'blob',
        params: {
            filename
        }
    }).then((response) => {
        return response.data;
    });
}

export default {
    getFileRepositories,
    getFileList,
    upload,
    download
};