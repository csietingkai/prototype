import { NotificationManager } from 'react-notifications';

export default {
	success(message) {
		NotificationManager.success(message, "Success", 2000);
	},
	info(message) {
		NotificationManager.info(message, "Warning", 2000);
	},
	warning(message) {
		NotificationManager.warning(message, "Warning", 2000);
	},
	error(message) {
		NotificationManager.error(message, "Warning", 2000);
	}
}