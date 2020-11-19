import * as actionTypes from "../actions/actionTypes";

const initialState = {
	loading: false,
	purchased: false,
};

const reducer = (state = initialState, action) => {
	if (action.type === actionTypes.PURCHASE_INIT)
		return { ...state, purchased: false };
	if (action.type === actionTypes.PURCHASE_BURGER_START)
		return { ...state, loading: true };
	if (action.type === actionTypes.PURCHASE_BURGER_SUCCESS)
		return { loading: false, purchased: true };
	if (action.type === actionTypes.PURCHASE_BURGER_FAIL)
		return { loading: false, purchased: true };
	return state;
};

export default reducer;
