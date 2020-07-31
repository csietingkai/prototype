export const isNull = (str: string): boolean => {
    return str === null || str === undefined;
};

export const isEmpty = (str: string): boolean => {
    return isNull(str) || !str.length;
};

export const isBlank = (str: string): boolean => {
    return isNull(str) || !str.trim().length;
};
