import * as api from "../api/chats";
import db from "../db/firestore";

import {
	CHATS_CREATE_SUCCESS,
	CHATS_JOIN_SUCCESS,
	CHATS_FETCH_INIT,
	CHATS_FETCH_SUCCESS,
	CHATS_SET_ACTIVE_CHAT,
} from "./types";

// returns sortedChat[]
// sortedChat[]: joined[], available[]
export const fetchChats = () => async (dispatch, getState) => {
	dispatch({ type: CHATS_FETCH_INIT });
	const chatData = await api.fetchChats();

	const authUser = getState().auth.user;
	const joined = [];
	const available = [];

	// iterate chat
	chatData.forEach((chat) => {
		// iterate joinedUsers
		for (let i = 0; i < chat.joinedUsers.length; i++) {
			if (authUser.uid == chat.joinedUsers[i].id) {
				joined.push(chat);
				return;
			}
		}
		available.push(chat);
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
		.then((chatId) => {
			api.joinChat(userId, chatId);
			dispatch({
				type: CHATS_JOIN_SUCCESS,
				chat: { ...chatData, id: chatId },
			});
		});
};

export const joinChat = (userId, chat) => (dispatch) => {
	return api.joinChat(userId, chat.id).then((_) => {
		dispatch({ type: CHATS_JOIN_SUCCESS, chat });
	});
};

// API returns chat snapshot data as (chat)
export const subscribeToChat = (chatId) => (dispatch) => {
	return api.subscribeToChat(chatId, async (chat) => {
		const joinedUsers = await Promise.all(
			chat.joinedUsers.map(async (user) => {
				const userSnapshot = await user.get();

				return { id: userSnapshot.id, ...userSnapshot.data() };
			})
		);

		chat.joinedUsers = joinedUsers;

		dispatch({ type: CHATS_SET_ACTIVE_CHAT, chat });
	});
};
