// react
import { toast } from 'react-toastify';

export const info = (msg: string) => {
    toast.info(msg);
};

export const success = (msg: string) => {
    toast.success(msg);
};

export const warning = (msg: string) => {
    toast.warning(msg);
};

export const error = (msg: string) => {
    toast.error(msg);
};

export const dark = (msg: string) => {
    toast.dark(msg);
};

export default { info, success, warning, error, dark };
