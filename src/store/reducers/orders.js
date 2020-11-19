import * as actionTypes from "../actions/actionTypes";

const initialState = {
	orders: [],
	dataLoaded: false,
	error: false,
};

const reducer = (state = initialState, action) => {
	if (action.type === actionTypes.FETCH_ORDERS_START)
		return { ...state, dataLoaded: false, error: false };
	if (action.type === actionTypes.FETCH_ORDERS_SUCCESS)
		return { ...state, orders: action.orders, dataLoaded: true };
	if (action.type === actionTypes.FETCH_ORDERS_FAIL)
		return { ...state, error: true };
	if (action.type === actionTypes.DELETE_ORDER)
		return {
			...state,
			orders: state.orders.filter(({ id }) => id !== action.id),
		};
	return state;
};

export default reducer;
