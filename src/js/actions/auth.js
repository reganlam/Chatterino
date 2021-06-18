import * as api from "../api/auth";
import { AUTH_REGISTER_SUCCESS } from "./types";

export const registerUser = (formData) => async (dispatch) => {
	try {
		const user = await api.register(formData);
		dispatch({ type: AUTH_REGISTER_SUCCESS });
	} catch (error) {
		return Promise.reject(error.message);
	}
};
