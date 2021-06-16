import React from "react";
import HomeView from "./views/HomeView";
import Navbar from "./components/Navbar";

import { HashRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
	return (
		<Router>
			{/*Navbar Component*/}
			<Navbar />
			<div className="content-wrapper">
				<Switch>
					<Route path="/settings">
						<h1>I am settings View</h1>
					</Route>
					<Route path="/login">
						<h1>I am login View</h1>
					</Route>
					<Route path="/register">
						<h1>I am register View</h1>
					</Route>
					<Route path="/">
						<HomeView />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}
