import { Role } from 'util/Enum';
import { AuthToken } from 'util/Interface';

// authReducer
export const getAuthToken = (state: any): AuthToken => state.auth.authToken;
export const getAuthTokenName = (state: any): string => getAuthToken(state).name;
export const getAuthTokenRole = (state: any): Role => getAuthToken(state).role;
export const getAuthTokenString = (state: any): string => getAuthToken(state).tokenString;
export const getAuthTokenExpiryDate = (state: any): Date => getAuthToken(state).expiryDate;
