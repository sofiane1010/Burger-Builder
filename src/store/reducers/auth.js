import * as actionTypes from "../actions/actionTypes";

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
};

const authStart = (state, action) => ({
	...state,
	loading: true,
	error: null,
});

const authSuccess = (state, action) => ({
	token: action.token,
	userId: action.userId,
	error: null,
	loading: false,
});

const authFail = (state, action) => ({
	...state,
	error: action.error,
	loading: false,
});

const authLogout = (state, action) => ({
	...state,
	token: null,
	userId: null,
});

const reducer = (state = initialState, action) => {
	if (action.type === actionTypes.AUTH_START) return authStart(state, null);
	if (action.type === actionTypes.AUTH_SUCCESS)
		return authSuccess(null, action);
	if (action.type === actionTypes.AUTH_FAIL) return authFail(state, action);
	if (action.type === actionTypes.AUTH_LOGOUT) return authLogout(state, null);
	return state;
};

export default reducer;
