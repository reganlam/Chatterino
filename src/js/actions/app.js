import { APP_IS_ONLINE, APP_IS_OFFLINE } from "./types";

const onConnectionChange = (dispatch) => () => {
	const isOnline = navigator.onLine;

	return isOnline
		? dispatch({ type: APP_IS_ONLINE })
		: dispatch({ type: APP_IS_OFFLINE });
};

export const listenToConnectionChanges = () => (dispatch) => {
	const connectionHandler = onConnectionChange(dispatch);

	window.addEventListener("online", connectionHandler);
	window.addEventListener("offline", connectionHandler);

	return function cleanup() {
		window.removeEventListener("online", connectionHandler);
		window.removeEventListener("offline", connectionHandler);
	};
};
