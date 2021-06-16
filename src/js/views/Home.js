import React from "react";
import Navbar from "../components/Navbar";
import JoinedChats from "../components/JoinedChats";
import AvailableChats from "../components/AvailableChats";
import TitleView from "../components/shared/TitleView";

export default function Home() {
	return (
		<div className="content-wrapper">
			{/*NAVBAR*/}
			<Navbar />
			<div className="row no-gutters fh">
				<div className="col-3 fh">
					{/*JOINEDCHATS*/}
					<JoinedChats />
				</div>
				<div className="col-9 fh">
					{/*TITLEVIEW*/}
					<TitleView />

					{/*AVAILABLECHATS*/}
					<AvailableChats />
				</div>
			</div>
		</div>
	);
}
