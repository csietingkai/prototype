export const isNull = (str: string): boolean => {
    return str === null || str === undefined;
};

export const isEmpty = (str: string): boolean => {
    return isNull(str) || !str.length;
};

export const isBlank = (str: string): boolean => {
    return isNull(str) || !str.trim().length;
};

export const isObjEqual = (objA: any, objB: any): boolean => {
    return JSON.stringify(objA) === JSON.stringify(objB);
};

export const isValidDate = (obj: any): boolean => {
    return obj instanceof Date && !isNaN(obj.getTime());
};

export const isFunction = (obj: any): boolean => {
    return obj && {}.toString.call(obj) === '[object Function]';
};

export interface Record {
    key: string;
    value: any;
};

export const convert = (records: Record[], key: string): any => {
    const record = records.find(x => x.key === key);
    return record ? record.value : key;
};

export const groupBy = (datas: any[], key: string) => {
    return datas.reduce((group, item) => {
        const value = item[key];
        if (!Array.isArray(group[value])) {
            group[value] = [];
        }
        group[value].push(item);
    }, {});
};