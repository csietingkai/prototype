import { AddressCardIcon, BoxesIcon, ListUlIcon, TachometerAltIcon, TextHeightIcon } from 'component/common/Icons';
import { ToastOptions, ToastPosition } from 'react-toastify';
import { Record, SidebarItem } from 'util/Interface';
import { isArrayEmpty } from './AppUtil';

// general
export const API_URL: string = process.env.API_URL;

// api auth
export const AUTH_LOGIN_PATH: string = '/login';
export const AUTH_REGISTER_PATH: string = '/register';
export const AUTH_VALIDATE_PATH: string = '/validate';

// api file
const FILE_API_PREFIX: string = '/file';
export const FILE_UPLOAD_PATH: string = FILE_API_PREFIX + '/upload';
export const FILE_DOWNLOAD_PATH: string = FILE_API_PREFIX + '/download';

// localStorage
export const AUTH_TOKEN_KEY: string = 'AUTH_TOKEN';

// notify position
export const NOTIFICATION_POSTITION: ToastPosition = 'bottom-right';
export const NOTIFICATION_SHOW_POGRESS_BAR: boolean = false;
export const NOTIFICATION_PAUSE_ON_HOVER: boolean = true;
export const NOTIFICATION_CLOSE_DELAY_SECONDS: number = 2;

export const NOTIFICATION_DEFAULT_CONFIG: ToastOptions = {
    position: NOTIFICATION_POSTITION,
    hideProgressBar: !NOTIFICATION_SHOW_POGRESS_BAR,
    pauseOnHover: NOTIFICATION_PAUSE_ON_HOVER,
    autoClose: NOTIFICATION_CLOSE_DELAY_SECONDS * 2000
};

// sidebar
export const SIDEBAR_ITEMS: SidebarItem[] = [
    {
        name: 'Dashboard',
        url: '/dashboard',
        icon: TachometerAltIcon()
    },
    {
        name: 'Component',
        type: 'wrapper'
    },
    {
        name: 'Base',
        type: 'dropdown',
        url: '/base',
        icon: BoxesIcon(),
        children: [
            {
                name: 'Cards',
                url: '/cards',
                icon: AddressCardIcon()
            },
            {
                name: 'Forms',
                url: '/forms',
                icon: TextHeightIcon()
            }
        ]
    }
];
const getRoutes = (items: SidebarItem[]): Record<string, string>[] => {
    return items.reduce((current: Record<string, string>[], item: SidebarItem) => {
        if (item.url) {
            current = current.concat({ key: item.url, value: item.name });
            if (!isArrayEmpty(item.children)) {
                current = current.concat(
                    getRoutes(item.children.map(child => {
                        return child.url ? { ...child, url: item.url + child.url } : { ...child };
                    }))
                );
            }
        }
        return current;
    }, []);
};
export const ROUTES: Record<string, string>[] = [{ key: '/', value: 'Home' }].concat(getRoutes(SIDEBAR_ITEMS));