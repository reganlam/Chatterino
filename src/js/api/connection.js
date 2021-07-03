import firebase from "firebase/app";
import db from "../db/firestore";
import "firebase/database";

// isOnline : boolean
const getOnlineStatus = (isOnline) => {
	return {
		status: isOnline ? "online" : "offline",
		lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
	};
};

export const setUserOnlineStatus = (userId, isOnline) => {
	return db
		.collection("profiles")
		.doc(userId)
		.update(getOnlineStatus(isOnline));
};

// Return isOnline : boolean
export const onConnectionChanged = (onConnection) => {
	return firebase
		.database()
		.ref(".info/connected")
		.on("value", (snapshot) => {
			const isConnected = snapshot?.val() ? snapshot.val() : false;
			return onConnection(isConnected);
		});
};
