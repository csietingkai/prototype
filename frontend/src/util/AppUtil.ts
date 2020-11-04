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

export const isNumber = (obj: any) : boolean => {
    return (!isNaN(obj)) && /^-?\d+(\.\d*)?$/.test(obj);
}

export const isValidDate = (obj: any): boolean => {
    return obj instanceof Date && !isNaN(obj.getTime());
};

export const isFunction = (obj: any): boolean => {
    return obj && {}.toString.call(obj) === '[object Function]';
};

export interface Record {
    key: string;
    value: string;
};

export const convert = (records: Record[], key: string): string => {
    const record = records.find(x => x.key === key);
    return record ? record.value : key;
};

export const reverseConvert = (records: Record[], value: string): string => {
    const record = records.find(x => x.value === value);
    return record ? record.value : value;
}

export const groupBy = (datas: any[], key: string) => {
    return datas.reduce((group, item) => {
        const value = item[key];
        if (!Array.isArray(group[value])) {
            group[value] = [];
        }
        group[value].push(item);
    }, {});
};

export const getValueByKeys = (obj: any, ...keys: string[]): any => {
    let value: any = obj;
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (!isNull(value[key])) {
            value = value[key];
        } else {
            return value;
        }
    }
    return value;
};

export const sum = (list: number[]): number => {
    return list.reduce((acc, val) => { return acc + val; }, 0);
}

export const sumByKey = (list: any[], key: string): number => {
    const convertedList: number[] = list.map(item => parseFloat(item[key]) || 0);
    return sum(convertedList);
}