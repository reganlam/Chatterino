import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { joinChat } from "../actions/chats";

export default function AvailableChats({ chats }) {
	const dispatch = useDispatch();
	const user = useSelector(({ auth }) => auth.user);

	const askForConfirmation = (chat) => {
		const isConfirm = confirm(`Join ${chat.name}?`);

		if (isConfirm) {
			dispatch(joinChat(user.uid, chat));
		}
	};

	return (
		<div className="container-fluid">
			<div className="row mt-3">
				{chats.length == 0 && (
					<div className="container-fluid">
						<div className="alert alert-warning">
							No chats to join :(
						</div>
					</div>
				)}

				{chats.map((chat) => (
					<div key={chat.id} className="col-lg-3 col-md-6 mb-3">
						<div className="card">
							<div className="card-body">
								<h5 className="card-title">{chat.name}</h5>
								<p className="card-text">{chat.description}</p>
								<button
									onClick={() => askForConfirmation(chat)}
									className="btn btn-outline-primary"
								>
									Join Chat
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
