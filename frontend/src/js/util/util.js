import Cookie from 'js-cookie'

import constant from 'js/util/constant'

const getCommonHeader = (token) => {
	return {
		'X-Auth-Token': token
	};
};

const setToken = (token, expires) => {
	Cookie.set(constant.COOKIE_TOKEN_KEY, token, {
		expires: expires
	});
}

const getToken = () => {
	return Cookie.get(constant.COOKIE_TOKEN_KEY);
}

const removeToken = () => {
	Cookie.remove(constant.COOKIE_TOKEN_KEY);
}

const isFunction = (obj) => {
	return !!(obj && obj.constructor && obj.call && obj.apply);
}

const formatDateTime = (datetime) => {
	if (datetime instanceof Date) {
		let year = datetime.getFullYear();
		let month = formatTwoDigital(datetime.getMonth() + 1);
		let date = formatTwoDigital(datetime.getDate());
		let hour = formatTwoDigital(datetime.getHours());
		let minute = formatTwoDigital(datetime.getMinutes());
		let second = formatTwoDigital(datetime.getSeconds());
		return year + '/' + month + '/' + date + ' ' + hour + ':' + minute + ':' + second;
	} else {
		// console.log('parameter is not a Date')
	}
}

const formatTwoDigital = (num) => {
	if (!isNaN(num)) {
		return num < 10 ? '0' + num : num;
	} else {
		// console.log(num + ' is not a number');
		return '' + num;
	}
}

const formatFileSize = (num) => {
	if (!isNaN(num)) {
		const unit = ['B', 'KB', 'MB', 'GB', 'TB'];
		// convert bytes
		let level = 0;
		while (num / 1024 > 1 && level < unit.length) {
			num /= 1024;
			level++;
		}
		return num.toFixed(2) + unit[level];
	} else {
		// console.log(num + ' is not a number');
		return '' + num;
	}
}

export default {
	getCommonHeader,
	setToken,
	getToken,
	removeToken,
	isFunction,
	formatDateTime,
	formatFileSize
}
