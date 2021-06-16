import React, { useEffect } from "react";
import JoinedChats from "../components/JoinedChats";
import AvailableChats from "../components/AvailableChats";
import TitleView from "../components/shared/TitleView";

import { fetchChats } from "../api/chats";

export default function HomeView() {
	useEffect(() => {
		// debugger;
		fetchChats();
	}, []);

	return (
		<div className="row no-gutters fh">
			<div className="col-3 fh">
				{/*JoinedChats Component*/}
				<JoinedChats />
			</div>
			<div className="col-9 fh">
				{/*TitleView Component*/}
				<TitleView />

				{/*AvailableChats Component*/}
				<AvailableChats />
			</div>
		</div>
	);
}
