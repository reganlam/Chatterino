/* 
	NOTE: https://github.com/firebase/firebase-js-sdk/issues/1881
	- Unable to catch errors with async/await
*/

import * as api from "../api/auth";

import {
	AUTH_ON_ERROR,
	AUTH_ON_INIT,
	AUTH_ON_SUCCESS,
	AUTH_LOGOUT_SUCCESS,
	AUTH_LOGIN_SUCCESS,
	AUTH_LOGIN_ERROR,
	AUTH_REGISTER_INIT,
	AUTH_REGISTER_ERROR,
	AUTH_REGISTER_SUCCESS,
	AUTH_LOGIN_INIT,
} from "./types";

export const registerUser = (formData) => (dispatch) => {
	dispatch({ type: AUTH_REGISTER_INIT });
	return api
		.register(formData)
		.then((_) => dispatch({ type: AUTH_REGISTER_SUCCESS }))
		.catch((error) => {
			dispatch({ type: AUTH_REGISTER_ERROR, error });
		});
};

export const loginUser = (formData) => (dispatch) => {
	dispatch({ type: AUTH_LOGIN_INIT });
	return api
		.login(formData)
		.then((_) => dispatch({ type: AUTH_LOGIN_SUCCESS }))
		.catch((error) => {
			dispatch({ type: AUTH_LOGIN_ERROR, error });
		});
};

export const logoutUser = () => async (dispatch) => {
	try {
		await api.logout();
		dispatch({ type: AUTH_LOGOUT_SUCCESS });
	} catch (error) {
		return Promise.reject(error.message);
	}
};

export const listenToAuthChanges = () => async (dispatch) => {
	dispatch({ type: AUTH_ON_INIT });
	try {
		await api.onAuthStateChanges(async (userAuth) => {
			if (userAuth) {
				const userProfile = await api.getUserProfile(userAuth.uid);

				dispatch({ type: AUTH_ON_SUCCESS, user: userProfile });
				console.log("Authenticated");
			} else {
				dispatch({ type: AUTH_ON_ERROR });
				console.log("Not Authenticated");
			}
		});
	} catch (error) {
		return Promise.reject(error.message);
	}
};
