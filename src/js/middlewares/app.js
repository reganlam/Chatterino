import { APP_IS_ONLINE, APP_IS_OFFLINE } from "../actions/types";
import Notification from "../utils/notifications";

export default (store) => (next) => (action) => {
	switch (action.type) {
		case APP_IS_ONLINE:
		case APP_IS_OFFLINE:
			Notification.show({
				title: "Connection status:",
				body: action.type == APP_IS_OFFLINE ? "Online" : "Offline",
			});
	}
	next(action);
};
