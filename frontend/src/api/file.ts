import axios from 'axios';

import { API_URL, FILE_DOWNLOAD_PATH } from 'util/Contants';

enum Role {
    ROOT,
    ADMIN,
    USER
}
export const download = async (filename: string) => {
    const { data } = await axios.get(API_URL + FILE_DOWNLOAD_PATH, { params: { filename }, responseType: 'blob' });
    return data;
};
