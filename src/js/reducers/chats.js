import { combineReducers } from "redux";
import { createReducer, current } from "@reduxjs/toolkit";

import {
	CHATS_FETCH_INIT,
	CHATS_FETCH_RESET,
	CHATS_FETCH_SUCCESS,
	CHATS_JOIN_SUCCESS,
	CHATS_SET_ACTIVE_CHAT,
	CHATS_UPDATE_USER_STATE,
} from "../actions/types";

const DEFAULT_STATE = {
	items: [],
};

const createChatReducer = () => {
	const joined = (state = [], action) => {
		switch (action.type) {
			case CHATS_FETCH_RESET:
				return [];
			case CHATS_FETCH_SUCCESS:
				return action.joined;
			case CHATS_JOIN_SUCCESS:
				return [...state, action.chat];
			default:
				return state;
		}
	};
	const available = (state = [], action) => {
		switch (action.type) {
			case CHATS_FETCH_RESET:
				return [];
			case CHATS_FETCH_SUCCESS:
				return action.available;
			case CHATS_JOIN_SUCCESS:
				return state.filter((chat) => chat.id != action.chat.id);
			default:
				return state;
		}
	};

	const activeChats = createReducer(
		{},
		{
			CHATS_SET_ACTIVE_CHAT: (state, action) => {
				const { chat } = action;
				state[chat.id] = chat;
			},

			CHATS_UPDATE_USER_STATE: (state, action) => {
				const { user, chatId } = action;
				const joinedUsers = state[chatId].joinedUsers;

				const idx = joinedUsers.findIndex(
					(joinedUser) => joinedUser.uid == user.uid
				);

				if (idx < 0) return state;
				if (joinedUsers[idx].status == user.status) return state;

				joinedUsers[idx].status = user.status;
			},
		}
	);

	const messages = createReducer(
		{},
		{
			CHATS_SET_MESSAGES: (state, action) => {
				const { messages, chatId } = action;
				const prevMessages = state[action.chatId] || [];

				state[chatId] = [...prevMessages, ...messages];
			},
			CHATS_MESSAGE_SENT: (state, action) => {},
		}
	);

	return combineReducers({ joined, available, activeChats, messages });
};

export default createChatReducer();

// export default function chatReducer(state = DEFAULT_STATE, action) {
// 	switch (action.type) {
// 		case "CHATS_FETCH_SUCCESS":
// 			return { items: action.chats };
// 		default: {
// 			return state;
// 		}
// 	}
// }
