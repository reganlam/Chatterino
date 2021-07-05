import React, { useState } from "react";
import { createTimestamp } from "../utils/time";

export default function MessageBox({ onSubmit }) {
	const [value, setValue] = useState("");

	const onKeyPress = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();

			const message = {
				content: value.trim(),
				timestamp: createTimestamp(),
			};
			onSubmit(message);
			setValue("");
		}
	};

	return (
		<div className="chat-input form-group mt-3 mb-0">
			<textarea
				onChange={(e) => setValue(e.target.value)}
				value={value}
				onKeyPress={onKeyPress}
				className="form-control"
				row="3"
				placeholder="Type your message here..."
			></textarea>
		</div>
	);
}
