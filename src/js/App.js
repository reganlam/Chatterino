import React, { useEffect } from "react";
import HomeView from "./views/HomeView";
import WelcomeView from "./views/WelcomeView";
import SettingsView from "./views/SettingsView";
import ChatView from "./views/ChatView";

import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

import { Provider, useDispatch, useSelector } from "react-redux";
import configureStore from "./store";

import { listenToAuthChanges } from "./actions/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const user = useSelector(({ auth }) => auth.user);

	return (
		<Route
			{...rest}
			render={(props) =>
				user ? <Component {...props} /> : <Redirect to="/" />
			}
		/>
	);
};

const ChatApp = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listenToAuthChanges());
	}, [dispatch]);

	return (
		<Router>
			<div className="content-wrapper">
				<Switch>
					<Route path="/" exact>
						<WelcomeView />
					</Route>
					<PrivateRoute component={ChatView} path="/chat/:id" />
					<PrivateRoute component={SettingsView} path="/settings" />
					<PrivateRoute component={HomeView} path="/home" />
				</Switch>
			</div>
		</Router>
	);
};

const store = configureStore();
export default function App() {
	return (
		<Provider store={store}>
			<ChatApp />
		</Provider>
	);
}
