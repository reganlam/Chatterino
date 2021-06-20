import db from "../db/firestore";
import firebase from "firebase/app";
import "firebase/auth";

const createUserProfile = (userProfile) => {
	return db.collection("profiles").doc(userProfile.uid).set(userProfile);
};

// TODO: Catch
export const getUserProfile = (uid) => {
	return db
		.collection("profiles")
		.doc(uid)
		.get()
		.then((snapshot) => snapshot.data());
};

export const register = ({ email, username, password, avatar }) => {
	return firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then((snapshot) => {
			createUserProfile({
				uid: snapshot.user.uid,
				joinedChats: [],
				email,
				username,
				password,
				avatar,
			});
		})
		.catch((error) => {
			return Promise.reject(error.message);
		});
};

export const login = ({ email, password }) => {
	return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const logout = () => {
	return firebase.auth().signOut();
};

export const onAuthStateChanges = (userAuth) => {
	return firebase.auth().onAuthStateChanged(userAuth);
};
