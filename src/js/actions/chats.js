import * as api from "../api/chats";
import db from "../db/firestore";

import {
	CHATS_CREATE_SUCCESS,
	CHATS_JOIN_SUCCESS,
	CHATS_FETCH_INIT,
	CHATS_FETCH_SUCCESS,
	CHATS_SET_ACTIVE_CHAT,
	CHATS_UPDATE_USER_STATE,
	CHATS_MESSAGE_SENT,
	CHATS_REGISTER_MESSAGE_SUB,
	CHATS_SET_MESSAGES,
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

				return userSnapshot.data();
			})
		);

		chat.joinedUsers = joinedUsers;

		dispatch({ type: CHATS_SET_ACTIVE_CHAT, chat });
	});
};

export const subscribeToProfile = (userId, chatId) => (dispatch) => {
	return api.subscribeToProfile(userId, async (user) => {
		dispatch({ type: CHATS_UPDATE_USER_STATE, user, chatId });
	});
};

export const sendChatMessage = (message, chatId) => (dispatch, getState) => {
	const userId = getState().auth.user.uid;
	const user = db.collection("profiles").doc(userId);
	message.author = user;

	return api
		.sendChatMessage(message, chatId)
		.then((_) => dispatch({ type: CHATS_MESSAGE_SENT }));
};

export const subscribeToChatMessage = (chatId) => async (dispatch) => {
	return api.subscribeToChatMessage(chatId, async (messagesSnapshot) => {
		// Destructurize Message Collection
		const messages = messagesSnapshot.map((message) => {
			if (message.type === "added") {
				return { id: message.doc.id, ...message.doc.data() };
			}
		});

		// Get author snapshot
		const cache = {};
		for await (let message of messages) {
			if (!cache[message.author.id]) {
				const userSnapshot = await message.author.get();
				cache[userSnapshot.id] = userSnapshot.data();
			}
			message.author = cache[message.author.id];
		}

		return dispatch({
			type: CHATS_SET_MESSAGES,
			messages,
			chatId,
		});
	});
};

export const registerChatMessageSub = (chatId, sub) => (dispatch) => {
	return dispatch({
		type: CHATS_REGISTER_MESSAGE_SUB,
		chatId,
		sub,
	});
};
