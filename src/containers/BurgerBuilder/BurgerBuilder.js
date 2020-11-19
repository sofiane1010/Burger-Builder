import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios-orders";

import * as action from "../../store/actions";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class BurgerBuilder extends Component {
	state = {
		purchasing: false,
		loading: false,
	};

	componentDidMount() {
		const { ingredients, initIngredients } = this.props;
		if (!ingredients) initIngredients();
	}

	get updatePurchaseState() {
		const { ingredients } = this.props;
		return Object.values(ingredients).reduce((acc, el) => acc + el, 0) > 0;
	}

	purchaseHandler = () => {
		const { isAuth, history } = this.props;
		if (isAuth)
			this.setState((prevState) => {
				return { purchasing: !prevState.purchasing };
			});
		else {
			history.push("/auth?redirect=chekout");
		}
	};

	purchaseContinueHandler = () => {
		this.props.purchaseInit();
		this.props.history.push("/chekout");
	};

	render() {
		const { purchasing } = this.state;
		const {
			error,
			ingredients,
			totalPrice,
			addIngredient,
			removeIngredient,
			clearIngredients,
			isAuth,
		} = this.props;

		const disableLess = { ...ingredients };
		for (let key in disableLess) {
			disableLess[key] = disableLess[key] <= 0;
		}

		let disableMore = { ...ingredients };
		for (let key in disableMore) {
			disableMore[key] =
				Object.values(ingredients || {}).reduce((acc, el) => acc + el, 0) >= 7
					? true
					: disableMore[key] >= 3;
		}

		const orderSummary = (
			<OrderSummary
				totalPrice={totalPrice}
				ingredients={ingredients}
				cancel={this.purchaseHandler}
				purchaseHandler={this.purchaseContinueHandler}
			/>
		);

		let burger = error ? (
			<div style={{ height: "90vh", display: "flex" }}>
				<h1 style={{ margin: "auto" }}>Ingredients can't load !</h1>
			</div>
		) : (
			<div style={{ display: "flex", height: "calc(100vh - 56px)" }}>
				<Spinner />
			</div>
		);
		if (ingredients)
			burger = (
				<Aux>
					<Burger ingredients={ingredients} />
					<BuildControls
						totalPrice={totalPrice}
						ingredientAdded={addIngredient}
						ingredientRemoved={removeIngredient}
						disableLess={disableLess}
						disableMore={disableMore}
						clearBurger={clearIngredients}
						purchaseHandler={this.purchaseHandler}
						purchasable={this.updatePurchaseState}
						isAuth={isAuth}
					/>
				</Aux>
			);
		return (
			<Aux>
				<Modal show={purchasing} modalClosed={this.purchaseHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuth: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addIngredient: (ingredient) => dispatch(action.addIngredient(ingredient)),
		removeIngredient: (ingredient) =>
			dispatch(action.removeIngredient(ingredient)),
		clearIngredients: () => dispatch(action.clearIngredients()),
		initIngredients: () => dispatch(action.initIngredients()),
		purchaseInit: () => dispatch(action.purchaseInit()),
	};
};

BurgerBuilder = connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));

export default BurgerBuilder;
