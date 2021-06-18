import db from "../db/firestore";
import firebase from "firebase/app";
import "firebase/auth";

const createUserProfile = (userProfile) => {
	db.collection("profiles").doc(userProfile.uid).set(userProfile);
};

export const register = async ({ email, username, password, avatar }) => {
	try {
		const { user } = await firebase
			.auth()
			.createUserWithEmailAndPassword(email, password);

		const userProfile = {
			uid: user.uid,
			joinedChats: [],
			email,
			username,
			password,
			avatar,
		};

		await createUserProfile(userProfile);
	} catch (error) {
		return Promise.reject(error.message);
	}
};
