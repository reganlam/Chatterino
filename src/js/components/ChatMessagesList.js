import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { formatTimestamp } from "../utils/time";

export default function ChatMessagesList({ messages = [] }) {
	const user = useSelector(({ auth }) => auth.user);
	const messageBottom = useRef();

	const isMessageAuthor = (message) => {
		return message?.author.uid === user.uid ? "chat-right" : "chat-left";
	};

	const scrollToBottom = () => {
		messageBottom.current.scrollIntoView();
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<div className="chat-container">
			<ul className="chat-box chatContainerScroll">
				{messages.map((message) => (
					<li key={message.id} className={isMessageAuthor(message)}>
						<div className="chat-avatar">
							<img
								src={message.author.avatar}
								alt="Retail Admin"
							/>
							<div className="chat-name">
								{message.author.username}
							</div>
						</div>
						<div className="chat-text-wrapper">
							<span className="chat-text">{message.content}</span>
							<span className="chat-spacer"></span>
							<div className="chat-hour">
								{formatTimestamp(message.timestamp)}
							</div>
						</div>
					</li>
				))}
			</ul>
			<div ref={messageBottom}></div>
		</div>
	);
}
