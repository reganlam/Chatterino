import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";

import {
	CHATS_FETCH_INIT,
	CHATS_FETCH_RESET,
	CHATS_FETCH_SUCCESS,
	CHATS_JOIN_SUCCESS,
	CHATS_SET_ACTIVE_CHAT,
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
		}
	);

	return combineReducers({ joined, available, activeChats });
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
