import { combineReducers } from "redux";
import {
	CHATS_FETCH_INIT,
	CHATS_FETCH_RESET,
	CHATS_FETCH_SUCCESS,
	CHATS_JOIN_SUCCESS,
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

	return combineReducers({ joined, available });
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
