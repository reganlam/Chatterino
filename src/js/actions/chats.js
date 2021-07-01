import * as api from "../api/chats";
import db from "../db/firestore";

import {
	CHATS_CREATE_SUCCESS,
	CHATS_FETCH_INIT,
	CHATS_FETCH_SUCCESS,
} from "./types";

// returns sortedChat[]
// sortedChat[]: joined[], available[]
export const fetchChats = () => async (dispatch, getState) => {
	dispatch({ type: CHATS_FETCH_INIT });
	const chatData = await api.fetchChats();

	const authUser = getState().auth.user;
	const joined = [];
	const available = [];

	chatData.forEach((chat) => {
		for (let i = 0; i < chat.joinedUsers.length; i++) {
			authUser.uid == chat.joinedUsers[i].id
				? joined.push(chat)
				: available.push(chat);
		}
	});

	const sortedChat = { joined, available };

	dispatch({
		type: CHATS_FETCH_SUCCESS,
		...sortedChat,
	});

	return sortedChat;
};

// formData + admin + joinedUsers
export const createChat = (formData, userId) => (dispatch) => {
	const chatData = { ...formData };
	chatData.admin = db.collection("profiles").doc(userId);

	return api
		.createChat(chatData)
		.then((chatId) => {
			dispatch({ type: CHATS_CREATE_SUCCESS });
			return chatId;
		})
		.then((chatId) => api.joinChat(userId, chatId));
};
