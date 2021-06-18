import React from "react";
import HomeView from "./views/HomeView";
import WelcomeView from "./views/WelcomeView";
import RegisterView from "./views/RegisterView";
import SettingsView from "./views/SettingsView";
import ChatView from "./views/ChatView";
import Navbar from "./components/Navbar";

import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import configureStore from "./store";

const store = configureStore();

export default function App() {
	return (
		<Provider store={store}>
			<Router>
				{/*Navbar Component*/}
				<Navbar />
				<div className="content-wrapper">
					<Switch>
						<Route path="/" exact>
							<WelcomeView />
						</Route>
						<Route path="/chat/:id">
							<ChatView />
						</Route>
						<Route path="/settings">
							<SettingsView />
						</Route>
						<Route path="/register">
							<RegisterView />
						</Route>
						<Route path="/home">
							<HomeView />
						</Route>
					</Switch>
				</div>
			</Router>
		</Provider>
	);
}
