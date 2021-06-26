import { APP_IS_ONLINE, APP_IS_OFFLINE } from "../actions/types";

export default (store) => (next) => (action) => {
	switch (action.type) {
		case APP_IS_ONLINE:
		case APP_IS_OFFLINE:
			console.log("App notification");
	}
	next(action);
};
