import db from "../db/firestore";

const extractSnapshotData = (snapshot) => {
	const data = snapshot.docs.map((doc) => {
		return { id: doc.id, ...doc.data() };
	});

	return data;
};

export const fetchChats = () => {
	return db.collection("chats").get().then(extractSnapshotData);
};

// chatData = {name, description, image, admin, joinedUsers}
export const createChat = (chatData) => {
	return db
		.collection("chats")
		.add(chatData)
		.then((docRef) => docRef.id);
};
