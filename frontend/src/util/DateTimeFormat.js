function formatDateTime(datetime) {
	if (datetime instanceof Date) {
		let year = datetime.getFullYear();
		let month = formatTwoDigital(datetime.getMonth() + 1);
		let date = formatTwoDigital(datetime.getDate());
		let hour = formatTwoDigital(datetime.getHours());
		let minute = formatTwoDigital(datetime.getMinutes());
		let second = formatTwoDigital(datetime.getSeconds());
		return year + "/" + month + "/" + date + " " + hour + ":" + minute + ":" + second;
	} else {
		// console.log("parameter is not a Date")
	}
}

function formatTwoDigital(num) {
	if (!isNaN(num)) {
		return num < 10 ? '0' + num : num;
	} else {
		// console.log(num + " is not a number");
		return '' + num;
	}
}

export default { formatDateTime }