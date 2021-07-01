import React from "react";

export default function TitleView({ text, children }) {
	return (
		<div className="chat-name-container">
			<span className="name">{text}</span>
			{children}
		</div>
	);
}
