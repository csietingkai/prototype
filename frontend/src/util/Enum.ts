export enum SortType {
    ASC, DESC
}

export enum Role {
    ROOT = 'ROOT',
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | 'link';

export type DivWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export enum InputType {
    text = 'text',
    email = 'email',
    password = 'password',
    textarea = 'textarea',
    select = 'select',
    radio = 'radio',
    checkbox = 'checkbox',
    file = 'file'
}
