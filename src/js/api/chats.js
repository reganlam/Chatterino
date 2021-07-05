import db from "../db/firestore";
import firebase from "firebase/app";

const extractSnapshotData = (snapshot) => {
	const data = snapshot.docs.map((doc) => {
		return { id: doc.id, ...doc.data() };
	});

	return data;
};

export const fetchChats = () => {
	return db.collection("chats").get().then(extractSnapshotData);
};

export const joinChat = async (userId, chatId) => {
	const user = db.collection("profiles").doc(userId);
	const chat = db.collection("chats").doc(chatId);

	// Add user to chat.joinedUsers
	await chat.update({
		joinedUsers: firebase.firestore.FieldValue.arrayUnion(user),
	});

	// Add chat to profile.joinedChats
	await user.update({
		joinedChats: firebase.firestore.FieldValue.arrayUnion(chat),
	});
};

// chatData = {name, description, image, admin, joinedUsers}
export const createChat = (chatData) => {
	return db
		.collection("chats")
		.add(chatData)
		.then((docRef) => docRef.id);
};

export const subscribeToChat = (chatId, onSubscribe) => {
	return db
		.collection("chats")
		.doc(chatId)
		.onSnapshot((snapshot) => {
			const chat = { id: snapshot.id, ...snapshot.data() };
			onSubscribe(chat);
		});
};

export const subscribeToProfile = (userId, onSubscribe) => {
	return db
		.collection("profiles")
		.doc(userId)
		.onSnapshot((snapshot) => {
			onSubscribe(snapshot.data());
		});
};

export const sendChatMessage = (message, chatId) => {
	return db
		.collection("chats")
		.doc(chatId)
		.collection("messages")
		.doc(message.timestamp)
		.set(message);
};

export const subscribeToChatMessage = (chatId, onSubscribe) => {
	return db
		.collection("chats")
		.doc(chatId)
		.collection("messages")
		.onSnapshot((snapshot) => {
			onSubscribe(snapshot.docChanges());
		});
};
