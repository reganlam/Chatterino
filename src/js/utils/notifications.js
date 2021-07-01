export default {
	setup() {
		if (!("Notification" in window)) {
			console.error("Notification Permissions are not enabled.");
		} else if (Notification.permission === "granted") {
			return;
		} else if (Notification.permission !== "denied") {
			Notification.requestPermission().then((permission) => {
				if (permission === "granted") {
					console.log("Notification Permissions has been enabled.");
				}
			});
		}
	},
	show({ title, body }) {
		new Notification(title, { body });
	},
};
