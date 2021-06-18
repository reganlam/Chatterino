import React, { useEffect } from "react";
import JoinedChats from "../components/JoinedChats";
import AvailableChats from "../components/AvailableChats";
import TitleView from "../components/shared/TitleView";

import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../actions/chats";

export default function HomeView() {
	const dispatch = useDispatch();

	// const chats = useSelector((state) => state.chats.items);
	const chats = useSelector(({ chats }) => chats.items);

	useEffect(() => {
		dispatch(fetchChats());
	}, [dispatch]);

	return (
		<div className="row no-gutters fh">
			<div className="col-3 fh">
				{JSON.stringify(chats)}

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
