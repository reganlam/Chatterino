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

	// const chats = useSelector((state) => state.chats.items);
	const chats = useSelector(({ chats }) => chats.items);

	useEffect(() => {
		Notification.setup();
		dispatch(fetchChats());
	}, [dispatch]);

	return (
		<BaseLayout>
			<div className="row no-gutters fh">
				<div className="col-3 fh">
					{/*TESTING*/}
					{/*{JSON.stringify(chats)}*/}

					<JoinedChats chats={chats} />
				</div>
				<div className="col-9 fh">
					<TitleView text="Choose your channel">
						<Link
							to="/chat/create"
							className="btn btn-outline-primary align-middle"
						>
							New
						</Link>
					</TitleView>
					<AvailableChats chats={chats} />
				</div>
			</div>
		</BaseLayout>
	);
}
