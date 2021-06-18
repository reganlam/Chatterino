import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import chatReducer from "../reducers/chats";

export default function configureStore() {
	const middlewares = [thunkMiddleware];

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
		}),
		applyMiddleware(...middlewares)
	);

	return store;
}
