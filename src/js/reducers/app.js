import { APP_IS_ONLINE, APP_IS_OFFLINE } from "../actions/types";

export default function appReducer(_, action) {
	switch (action.type) {
		case APP_IS_ONLINE:
		case APP_IS_OFFLINE:
		default:
			return { isOnline: navigator.onLine };
	}
}
