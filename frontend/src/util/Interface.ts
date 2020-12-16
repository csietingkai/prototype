import { Role } from 'util/Enum';

// common
export interface Record<K, V> {
    key: K;
    value: V;
}

// redux
export interface SystemState {
    authToken: AuthToken;
}

export interface Action<T> {
    type: string;
    payload: T;
}

// api
export interface AuthToken {
    name: string;
    role: Role;
    tokenString: string;
    expiryDate: Date;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
}

export interface AuthResponse extends ApiResponse<AuthToken> { }

export interface FileResponse extends ApiResponse<void> { }

// component/layout
export interface SidebarItem {
    name: string;
    type?: 'dropdown' | 'wrapper' | 'divider';
    url?: string;
    icon?: JSX.Element;
    children?: SidebarItem[];
    component?: React.ComponentType<any>;
}
