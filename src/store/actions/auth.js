import axios from "axios";

import * as actionTypes from "./actionTypes";

const authStart = () => ({
	type: actionTypes.AUTH_START,
});

const authSuccess = ({ idToken, localId }) => ({
	type: actionTypes.AUTH_SUCCESS,
	token: idToken,
	userId: localId,
});

const authFail = (error) => ({
	type: actionTypes.AUTH_FAIL,
	error,
});

const checkAuthTimeout = (expiresIn) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expiresIn * 1000);
	};
};

export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");
	localStorage.removeItem("userId");
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const authenticationAttempAfterRefresh = () => {
	return (dispatch) => {
		const idToken = localStorage.getItem("token");
		if (!idToken) return;
		const expirationDate = +localStorage.getItem("expirationDate");
		if (expirationDate > new Date().getTime()) {
			const localId = localStorage.getItem("userId");
			dispatch(authSuccess({ idToken, localId }));
			dispatch(
				checkAuthTimeout((expirationDate - new Date().getTime()) / 1000)
			);
		}
	};
};

export const authenticate = (email, password, isSignUp) => {
	return (dispatch) => {
		dispatch(authStart());
		const data = {
			email,
			password,
			returnSecureToken: true,
		};
		let url =
			"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBaCBRrMAB7n1paC0fnqP0uFC13p2HJzKY";
		if (isSignUp)
			url =
				"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBaCBRrMAB7n1paC0fnqP0uFC13p2HJzKY";
		axios
			.post(url, data)
			.then((response) => {
				const expirationDate =
					new Date().getTime() + response.data.expiresIn * 1000;
				localStorage.setItem("token", response.data.idToken);
				localStorage.setItem("expirationDate", expirationDate);
				localStorage.setItem("userId", response.data.localId);
				dispatch(authSuccess(response.data));
				dispatch(checkAuthTimeout(response.data.expiresIn));
			})
			.catch((error) => {
				dispatch(authFail(error.response.data.error));
			});
	};
};
