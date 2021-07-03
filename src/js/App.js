import React, { useEffect } from "react";
import HomeView from "./views/HomeView";
import WelcomeView from "./views/WelcomeView";
import SettingsView from "./views/SettingsView";
import ChatView from "./views/ChatView";
import ChatCreateView from "./views/ChatCreateView";
import LoadingView from "./components/Shared/LoadingView";

import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

import { Provider, useDispatch, useSelector } from "react-redux";
import configureStore from "./store";

import { listenToAuthChanges } from "./actions/auth";
import { listenToConnectionChanges } from "./actions/app";
import { checkUserConnection } from "./actions/connection";

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
	const isOnline = useSelector(({ app }) => app.isOnline);
	const isChecking = useSelector(({ auth }) => auth.isChecking);
	const user = useSelector(({ auth }) => auth.user);

	useEffect(() => {
		const unsubFromAuth = dispatch(listenToAuthChanges());
		const unsubFromConnection = dispatch(listenToConnectionChanges());

		// Unsub
		return function cleanup() {
			unsubFromAuth();
			unsubFromConnection();
		};
	}, [dispatch]);

	useEffect(() => {
		let unsubFromUserConnection;

		if (user?.uid) {
			unsubFromUserConnection = dispatch(checkUserConnection(user.uid));
		}

		// Unsub
		return function cleanup() {
			unsubFromUserConnection && unsubFromUserConnection();
		};
	}, [dispatch, user]);

	if (!isOnline) {
		return (
			<LoadingView message="Application has been disconnected from the internet. Trying to reconnect..." />
		);
	}

	if (isChecking) {
		return <LoadingView />;
	}

	return (
		<Router>
			<div className="content-wrapper">
				<Switch>
					<Route path="/" exact>
						<WelcomeView />
					</Route>
					<PrivateRoute
						component={ChatCreateView}
						path="/chat/create"
					/>
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
