import * as api from "../api/chats";

import { CHATS_FETCH_SUCCESS } from "./types";

// export function fetchChats() {
// 	return async function (dispatch) {
// 		const chats = await api.fetchChats();
// 		// debugger;

// 		dispatch({
// 			type: "CHATS_FETCH_SUCCESS",
// 			chats,
// 		});

// 		return chats;
// 	};
// }

export const fetchChats = () => async (dispatch) => {
	//TODO: trycatch
	const chats = await api.fetchChats();

	dispatch({
		type: CHATS_FETCH_SUCCESS,
		chats,
	});
};