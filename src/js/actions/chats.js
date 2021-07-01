import * as api from "../api/chats";
import db from "../db/firestore";

import { CHATS_CREATE_SUCCESS, CHATS_FETCH_SUCCESS } from "./types";

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

export const fetchChats = () => (dispatch) => {
	return api
		.fetchChats()
		.then((chats) => dispatch({ type: CHATS_FETCH_SUCCESS, chats }));
};

// formData + admin + joinedUsers
export const createChat = (formData, uid) => (dispatch) => {
	const chatData = { ...formData };
	chatData.admin = db.collection("profiles").doc(uid);
	chatData.joinedUsers = [chatData.admin];

	return api
		.createChat(chatData)
		.then((_) => dispatch({ type: CHATS_CREATE_SUCCESS }));
};
