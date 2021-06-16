import React from "react";

export default function TitleView({ text }) {
	return (
		<div className="chat-name-container">
			<span className="name">{text}</span>
		</div>
	);
}
