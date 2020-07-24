// general
export const API_URL: string = process.env.API_URL;

// auth
export const AUTH_TOKEN_KEY: string = 'token';
export const AUTH_TOKEN_EXPIRE: number = 1; // days
export const AUTH_LOGIN_PATH: string = '/login';
export const AUTH_REGISTER_PATH: string = '/register';
export const AUTH_VALIDATE_PATH: string = '/validate';

export default {
	AUTH_TOKEN_KEY,
	AUTH_TOKEN_EXPIRE,
	AUTH_LOGIN_PATH,
	AUTH_REGISTER_PATH,
	AUTH_VALIDATE_PATH,
};
