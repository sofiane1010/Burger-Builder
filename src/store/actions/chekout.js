import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseInit = () => ({
	type: actionTypes.PURCHASE_INIT,
});

const purchaseStart = () => ({
	type: actionTypes.PURCHASE_BURGER_START,
});

const purchaseSuccess = () => ({
	type: actionTypes.PURCHASE_BURGER_SUCCESS,
});

const purchaseFail = () => ({
	type: actionTypes.PURCHASE_BURGER_FAIL,
});

export const purchaseBurger = (orderData, token) => {
	return (dispatch) => {
		dispatch(purchaseStart());
		axios
			.post("/orders.json?auth=" + token, orderData)
			.then(() => dispatch(purchaseSuccess()))
			.catch(() => dispatch(purchaseFail()));
	};
};
