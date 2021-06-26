import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/auth";
import BackButton from "./Shared/BackButton";

export default function Navbar({ canGoBack }) {
	const dispatch = useDispatch();

	const user = useSelector(({ auth }) => auth.user);

	return (
		<div className="chat-navbar">
			<nav className="chat-navbar-inner">
				<div className="chat-navbar-inner-left">
					{canGoBack && <BackButton />}
					<Link
						to="/settings"
						className="btn btn-outline-secondary ml-2"
					>
						Settings
					</Link>
					<Link to="/home" className="btn btn-outline-danger ml-2">
						TEST
					</Link>
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
