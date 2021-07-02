import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TitleView from "../components/shared/TitleView";
import ChatUsersList from "../components/ChatUsersList";
import ChatMessagesList from "../components/ChatMessagesList";
import BaseLayout from "../layouts/Base";
import { subscribeToChat } from "../actions/chats";

export default function ChatView() {
	const { id } = useParams();

	const dispatch = useDispatch();

	const activeChat = useSelector(({ chats }) => chats.activeChats[id]);

	useEffect(() => {
		dispatch(subscribeToChat(id));

		// unsub
		return function cleanup() {
			subscribeToChat(id);
		};
	}, [dispatch]);

	return (
		<BaseLayout canGoBack={true}>
			<div className="row no-gutters fh">
				<div className="col-3 fh">
					<ChatUsersList joinedUsers={activeChat?.joinedUsers} />
				</div>
				<div className="col-9 fh">
					{<TitleView text={activeChat?.name} />}
					<ChatMessagesList />
				</div>
			</div>
		</BaseLayout>
	);
}
