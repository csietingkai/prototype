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

const formatDateTime = (datetime, showMilisecond) => {
	if (datetime instanceof Date) {
		let year = datetime.getFullYear();
		let month = formatDigital(datetime.getMonth() + 1);
		let date = formatDigital(datetime.getDate());
		let hour = formatDigital(datetime.getHours());
		let minute = formatDigital(datetime.getMinutes());
		let second = formatDigital(datetime.getSeconds());
		return year + '/' + month + '/' + date + ' ' + hour + ':' + minute + ':' + second + (showMilisecond ? '.' + formatDigital(datetime.getMilliseconds(), 3) : '');
	} else {
		// console.log('parameter is not a Date')
	}
}

const formatDigital = (num, digital) => {
	if (isNaN(digital)) {
		// default
		digital = 2;
	}

	if (!isNaN(num)) {
		let str = '';
		for (let i = 0; i < digital; i++) {
			if (num < Math.pow(10, i)) {
				str = '0' + str;
			}
		}
		return str + num;
	} else {
		// console.log(num + ' is not a number');
		return '';
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
