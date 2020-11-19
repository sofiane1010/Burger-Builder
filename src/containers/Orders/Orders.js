import React, { Component } from "react";
import { connect } from "react-redux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import * as action from "../../store/actions";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
	componentDidMount() {
		const { token, userId, fetchOrders } = this.props;
		fetchOrders(token, userId);
	}

	render() {
		const { error, dataLoaded, orders, token, deleteOrder } = this.props;
		let displayedOrders = error ? (
			<div style={{ height: "90vh", display: "flex" }}>
				<h1 style={{ margin: "auto" }}>Can't load the Orders.</h1>
			</div>
		) : (
			<div style={{ height: "calc(100vh - 56px)", display: "flex" }}>
				<Spinner />
			</div>
		);
		if (dataLoaded) {
			if (orders.length === 0)
				displayedOrders = (
					<div style={{ height: "90vh", display: "flex" }}>
						<h1 style={{ margin: "auto" }}>
							There is no Orders in the Database.
						</h1>
					</div>
				);
			else {
				displayedOrders = orders.map((order) => (
					<Order
						ingredients={order.ingredients}
						price={order.price}
						key={order.id}
						deleteOrder={() => deleteOrder(order.id, token)}
					/>
				));
			}
		}

		return displayedOrders;
	}
}

const mapStateToProps = (state) => ({
	orders: state.orders.orders,
	dataLoaded: state.orders.dataLoaded,
	error: state.orders.error,
	token: state.auth.token,
	userId: state.auth.userId,
	isAuth: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch) => ({
	fetchOrders: (token, userId) => dispatch(action.fetchOrders(token, userId)),
	deleteOrder: (id, token) => dispatch(action.deleteOrder(id, token)),
});

Orders = connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios));

export default Orders;
