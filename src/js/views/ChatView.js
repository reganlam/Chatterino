import React from "react";
import { useParams } from "react-router-dom";
import TitleView from "../components/shared/TitleView";
import ChatUsersList from "../components/ChatUsersList";
import ChatMessagesList from "../components/ChatMessagesList";
import BaseLayout from "../layouts/Base";

export default function ChatView() {
	const { id } = useParams();

	return (
		<BaseLayout>
			<div className="row no-gutters fh">
				<div className="col-3 fh">
					<ChatUsersList />
				</div>
				<div className="col-9 fh">
					<TitleView text={`${id}`} />
					<ChatMessagesList />
				</div>
			</div>
		</BaseLayout>
	);
}
