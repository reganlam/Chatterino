import * as api from "../api/connection";
import { CONNECTION_USER_CONNECTED } from "./types";

// isConnected is the snapshot.value() that is being returned from the API
export const checkUserConnection = (userId) => (dispatch) => {
	return api.onConnectionChanged((isConnected) => {
		// console.log(isConnected);

		api.setUserOnlineStatus(userId, isConnected);
		dispatch({ type: CONNECTION_USER_CONNECTED });
	});
};
