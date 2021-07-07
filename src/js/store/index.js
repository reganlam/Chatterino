import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import chatReducer from "../reducers/chats";
import authReducer from "../reducers/auth";
import appReducer from "../reducers/app";

import appMiddleware from "../middlewares/app";

import { AUTH_LOGOUT_SUCCESS } from "../actions/types";

export default function configureStore() {
	const middlewares = [thunkMiddleware, appMiddleware];

	// TESTING
	// const store = createStore(() => {
	// 	return {
	// 		message: "Hello World",
	// 		data1: "Testing data1",
	// 		data2: "testing data2 hahah",
	// 	};
	// }, applyMiddleware(...middlewares));

	// TESTING COMMAND
	// store.getState()

	const mainReducer = combineReducers({
		chats: chatReducer,
		auth: authReducer,
		app: appReducer,
	});

	// Reset State on logout
	const rootReducer = (state, action) => {
		if (action.type === AUTH_LOGOUT_SUCCESS) {
			state = undefined;
		}

		return mainReducer(state, action);
	};

	const store = createStore(rootReducer, applyMiddleware(...middlewares));

	// TESTING
	if (process.env.NODE_ENV === "development") {
		window.store = store;
	}

	return store;
}
