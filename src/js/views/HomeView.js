import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import JoinedChats from "../components/JoinedChats";
import AvailableChats from "../components/AvailableChats";
import TitleView from "../components/shared/TitleView";
import BaseLayout from "../layouts/Base";

import Notification from "../utils/notifications";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../actions/chats";

export default function HomeView() {
	const dispatch = useDispatch();

	const joinedChats = useSelector(({ chats }) => chats.joined);
	const availableChats = useSelector(({ chats }) => chats.available);

	useEffect(() => {
		Notification.setup();
		dispatch(fetchChats());
	}, [dispatch]);

	return (
		<BaseLayout>
			<div className="row no-gutters fh">
				<div className="col-3 fh">
					<JoinedChats chats={joinedChats} />
				</div>
				<div className="col-9 fh">
					<TitleView text="Choose your channel">
						<Link
							to="/chat/create"
							className="btn btn-outline-primary"
						>
							New
						</Link>
					</TitleView>
					<AvailableChats chats={availableChats} />
				</div>
			</div>
		</BaseLayout>
	);
}
