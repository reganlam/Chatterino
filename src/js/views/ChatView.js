import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TitleView from "../components/shared/TitleView";
import ChatUsersList from "../components/ChatUsersList";
import ChatMessagesList from "../components/ChatMessagesList";
import MessageBox from "../components/MessageBox";
import BaseLayout from "../layouts/Base";
import LoadingView from "../components/Shared/LoadingView";
import {
	subscribeToChat,
	subscribeToProfile,
	subscribeToChatMessage,
	sendChatMessage,
	registerChatMessageSub,
} from "../actions/chats";

export default function ChatView() {
	const { id } = useParams();
	const dispatch = useDispatch();

	// useRef persists across renders which allows us to unsub from joined users
	const unsubProfile = useRef({});

	// Redux Store
	const activeChat = useSelector(({ chats }) => chats.activeChats[id]);
	const messages = useSelector(({ chats }) => chats.messages[id]);
	const messagesSub = useSelector(({ chats }) => chats.subscription[id]);

	const joinedUsers = activeChat?.joinedUsers;

	useEffect(() => {
		const unsubFromChat = dispatch(subscribeToChat(id));

		// Check if subscribed to prevent duplicate messages
		if (!messagesSub) {
			const unsubFromChatMessage = dispatch(subscribeToChatMessage(id));
			dispatch(registerChatMessageSub(id, unsubFromChatMessage));
		}

		return function cleanup() {
			unsubFromChat();
			unsubFromJoinedUsers();

			// NOTE: We do not unsubFromChatMessage because we do not reset chat message state. Only unsub on logout.
		};
	}, []);

	useEffect(() => {
		joinedUsers && subscribeToJoinedUsers(joinedUsers);
	}, [joinedUsers]);

	if (!activeChat) {
		return <LoadingView />;
	}

	const subscribeToJoinedUsers = (users) => {
		users.forEach((user) => {
			if (!unsubProfile.current[user.uid]) {
				unsubProfile.current[user.uid] = dispatch(
					subscribeToProfile(user.uid, id)
				);
			}
		});
	};

	// TODO: Transpile Error: es6 syntax not a function
	function unsubFromJoinedUsers() {
		Object.keys(unsubProfile.current).forEach((k) =>
			unsubProfile.current[k]()
		);
	}

	const sendMessage = (message) => {
		// alert(JSON.stringify(message));
		dispatch(sendChatMessage(message, id));
	};

	return (
		<BaseLayout canGoBack={true}>
			<div className="row no-gutters fh">
				<div className="col-3 fh">
					<ChatUsersList joinedUsers={joinedUsers} />
				</div>
				<div className="col-9 fh">
					{<TitleView text={activeChat?.name} />}
					<ChatMessagesList messages={messages} />
					<MessageBox onSubmit={sendMessage} />
				</div>
			</div>
		</BaseLayout>
	);
}
