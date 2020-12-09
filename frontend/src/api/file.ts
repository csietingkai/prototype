import axios from 'axios';

import { API_URL, FILE_DOWNLOAD_PATH } from 'util/Constant';
import { FileResponse } from 'util/Interface';

const upload = async (file: any, category?: string) => {
    const response = await axios.post(API_URL + FILE_DOWNLOAD_PATH, { file, category });
    const data: FileResponse = response.data;
    return data;
};

const download = async (filename: string) => {
    const response = await axios.get(API_URL + FILE_DOWNLOAD_PATH, { params: { filename }, responseType: 'blob' });
    const data = response.data;
    return data;
};

export default { upload, download };
