import * as actionTypes from "../actions/actionTypes";

const INGREDIENT_PRICES = { cheese: 0.8, meat: 1.3, bacon: 1, salad: 0.5 };

const initialState = {
	ingredients: null,
	totalPrice: 3.99,
	error: false,
};

const handleIngredients = (state, action) => {
	if (action.type === actionTypes.ADD_INGREDIENT)
		return { ...state, [action.ingredient]: state[action.ingredient] + 1 };
	if (action.type === actionTypes.REMOVE_INGREDIENT)
		return { ...state, [action.ingredient]: state[action.ingredient] - 1 };
	if (action.type === actionTypes.CLEAR_INGREDIENTS)
		return { bacon: 0, cheese: 0, meat: 0, salad: 0 };
	if (action.type === actionTypes.SET_INGREDIENTS) return action.ingredients;
	return state;
};

const handlePrice = (state, action) => {
	if (action.type === actionTypes.ADD_INGREDIENT)
		return state + INGREDIENT_PRICES[action.ingredient];
	if (action.type === actionTypes.REMOVE_INGREDIENT)
		return state - INGREDIENT_PRICES[action.ingredient];
	if (action.type === actionTypes.CLEAR_INGREDIENTS) return 3.99;
	if (action.type === actionTypes.SET_INGREDIENTS) return 3.99;
	return state;
};

const handleError = (state, action) => {
	if (action.type === actionTypes.CATCH_ERRORS) return true;
	if (action.type === actionTypes.SET_INGREDIENTS) return false;
	return state;
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
		case actionTypes.REMOVE_INGREDIENT:
		case actionTypes.CLEAR_INGREDIENTS:
		case actionTypes.SET_INGREDIENTS:
		case actionTypes.CATCH_ERRORS:
			return {
				ingredients: handleIngredients(state.ingredients, action),
				totalPrice: handlePrice(state.totalPrice, action),
				error: handleError(state.error, action),
			};
		default:
			return state;
	}
};

export default reducer;
