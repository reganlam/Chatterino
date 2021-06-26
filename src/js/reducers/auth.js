import { combineReducers } from "redux";

import {
	AUTH_ON_ERROR,
	AUTH_ON_INIT,
	AUTH_ON_SUCCESS,
	AUTH_REGISTER_ERROR,
	AUTH_REGISTER_INIT,
	AUTH_LOGIN_ERROR,
	AUTH_LOGIN_INIT,
} from "../actions/types";

const createLoginReducer = () => {
	const error = (state = null, action) => {
		switch (action.type) {
			case AUTH_LOGIN_ERROR:
				return action.error;
			default:
				return state;
		}
	};

	return combineReducers({ error });
};

const createRegisterReducer = () => {
	const error = (state = null, action) => {
		switch (action.type) {
			case AUTH_REGISTER_ERROR:
				return action.error;
			default:
				return state;
		}
	};

	return combineReducers({ error });
};

const createAuthReducer = () => {
	const user = (state = null, action) => {
		switch (action.type) {
			case AUTH_ON_INIT:
			case AUTH_ON_ERROR:
				return null;
			case AUTH_ON_SUCCESS:
				return action.user;
			default:
				return state;
		}
	};
	const isChecking = (state = false, action) => {
		switch (action.type) {
			case AUTH_ON_INIT:
			case AUTH_REGISTER_INIT:
			case AUTH_LOGIN_INIT:
				return true;
			case AUTH_ON_SUCCESS:
			case AUTH_ON_ERROR:
			case AUTH_LOGIN_ERROR:
			case AUTH_REGISTER_ERROR:
				return false;
			default:
				return state;
		}
	};
	return combineReducers({
		user,
		isChecking,
		login: createLoginReducer(),
		register: createRegisterReducer(),
	});
};

export default createAuthReducer();

// const DEFAULT_STATE = {
// 	user: null,
// 	isChecking: false,
// };

// export default function authReducer(state = DEFAULT_STATE, action) {
// 	switch (action.type) {
// 		case AUTH_REGISTER_INIT:
// 		case AUTH_LOGIN_INIT:
// 			return { ...state, isChecking: true };
// 		case AUTH_LOGIN_SUCCESS:
// 		case AUTH_REGISTER_SUCCESS:
// 			return { ...state, isChecking: false };
// 		case AUTH_ON_INIT:
// 			return { user: null, isChecking: true };
// 		case AUTH_ON_SUCCESS:
// 			return { user: action.user, isChecking: false };
// 		case AUTH_ON_ERROR:
// 			return { user: null, isChecking: false };
// 		default: {
// 			return state;
// 		}
// 	}
// }

// const loginReducer = (state = { error: null }, action) => {
// 	switch (action.type) {
// 		case AUTH_LOGIN_ERROR:
// 			return { error: action.error };
// 		default:
// 			return state;
// 	}
// };

// const registerReducer = (state = { error: null }, action) => {
// 	switch (action.type) {
// 		case AUTH_REGISTER_ERROR:
// 			return { error: action.error };
// 		default:
// 			return state;
// 	}
// };
