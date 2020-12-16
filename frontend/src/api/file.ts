import axios from 'axios';

import { getAuthHeader } from 'util/AppUtil';
import { API_URL, FILE_DOWNLOAD_PATH, FILE_UPLOAD_PATH } from 'util/Constant';
import { FileResponse } from 'util/Interface';

const upload = async (file: any, category?: string) => {
    const headers = Object.assign(getAuthHeader(), { 'content-type': 'multipart/form-data' });
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(API_URL + FILE_UPLOAD_PATH, { formData, category }, { headers });
    const data: FileResponse = response.data;
    return data;
};

const download = async (filename: string) => {
    const response = await axios.get(API_URL + FILE_DOWNLOAD_PATH, { params: { filename }, responseType: 'blob' });
    const data = response.data;
    return data;
};

export default { upload, download };
