import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import chatReducer from "../reducers/chats";
import authReducer from "../reducers/auth";
import appReducer from "../reducers/app";

import appMiddleware from "../middlewares/app";

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

	const store = createStore(
		combineReducers({
			chats: chatReducer,
			auth: authReducer,
			app: appReducer,
		}),
		applyMiddleware(...middlewares)
	);

	// TESTING
	if (process.env.NODE_ENV === "development") {
		window.store = store;
	}

	return store;
}
