import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutUser } from "../actions/auth";

export default function Navbar() {
	const dispatch = useDispatch();
	const history = useHistory();

	const user = useSelector(({ auth }) => auth.user);

	return (
		<div className="chat-navbar">
			<nav className="chat-navbar-inner">
				<div className="chat-navbar-inner-left">
					<button
						onClick={() => history.goBack()}
						className="btn btn-outline-primary"
					>
						Back
					</button>
					<button
						onClick={() => history.push("/settings")}
						className="btn btn-outline-success ml-2"
					>
						Settings
					</button>
					<button
						onClick={() => history.push("/")}
						className="btn btn-outline-success ml-2"
					>
						Login
					</button>
					<button
						onClick={() => history.push("/home")}
						className="btn btn-outline-danger ml-2"
					>
						TEST
					</button>
				</div>
				<div className="chat-navbar-inner-right">
					{user && (
						<>
							<img
								className="avatar mr-2"
								src={user.avatar}
							></img>
							<span className="logged-in-user">
								Hi, {user.username}
							</span>
							<button
								onClick={() => dispatch(logoutUser())}
								className="btn btn-outline-danger ml-3"
							>
								Logout
							</button>
						</>
					)}
				</div>
			</nav>
		</div>
	);
}
