import axios from 'axios';

import { API_URL, AUTH_LOGIN_PATH, AUTH_REGISTER_PATH, AUTH_VALIDATE_PATH } from 'util/Contants';

enum Role {
    ROOT,
    ADMIN,
    USER
}

export const login = async (username: string, password: string) => {
    const { data } = await axios.post(API_URL + AUTH_LOGIN_PATH, null, { params: { username, password } });
    return data;
};

export const register = async (username: string, email: string, password: string, sendMail?: boolean) => {
    const { data } = await axios.post(API_URL + AUTH_REGISTER_PATH, {
        name: username,
        email: email,
        pwd: password,
        role: Role.USER
    }, { params: { sendMail } });
    return data;
};

export const validate = async (tokenString: string) => {
    const { data } = await axios.get(API_URL + AUTH_VALIDATE_PATH, { params: { tokenString } });
    return data;
};
