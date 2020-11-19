import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

const fetchStart = () => ({
	type: actionTypes.FETCH_ORDERS_START,
});

const fetchSuccess = (orders) => ({
	type: actionTypes.FETCH_ORDERS_SUCCESS,
	orders: orders,
});

const fetchFail = () => ({
	type: actionTypes.FETCH_ORDERS_FAIL,
});

export const fetchOrders = (token, id) => {
	return (dispatch) => {
		dispatch(fetchStart());
		const params = `auth=${token}&orderBy="userId"&equalTo="${id}"`;
		axios
			.get("/orders.json?" + params)
			.then(({ data }) => {
				let orders = [];
				if (data) {
					orders = Object.entries(data).map(([key, value]) => {
						return { id: key, ...value };
					});
				}
				dispatch(fetchSuccess(orders));
			})
			.catch(() => {
				dispatch(fetchFail());
			});
	};
};

const deleteOrderFromClient = (id) => ({
	type: actionTypes.DELETE_ORDER,
	id,
});

export const deleteOrder = (id, token) => {
	return (dispatch) => {
		axios
			.delete(`/orders/${id}.json?auth=${token}`)
			.then(dispatch(deleteOrderFromClient(id)));
	};
};
