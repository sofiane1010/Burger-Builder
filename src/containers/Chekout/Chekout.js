import React, { Component } from "react";
import axios from "../../axios-orders";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import classes from "./Chekout.module.css";
import * as action from "../../store/actions";

const patterns = {
	postalCode: /^\d{5}$/,
	name: /^[a-zéèçà]+ [a-zéèçà]+$/i,
	street: /^[\w\s.,éèçà]+$/,
	deliveryMethod: /^[a-zéèçà]+$/i,
};

class Chekout extends Component {
	state = {
		formInfo: {
			name: this.inputConfig(
				"Full Name:",
				"name",
				"Your Full Name",
				"must contain your full name."
			),
			street: this.inputConfig(
				"Street:",
				"street",
				"Your Location",
				"must contain alphanumeric characters (and , .)"
			),
			postalCode: this.inputConfig(
				"Postal Code:",
				"postalCode",
				"Your Postal Code",
				"must contain 5 digits"
			),
			deliveryMethod: {
				inputType: "select",
				inputAttributes: {
					id: "deliveryMethod",
					value: "",
					onChange: (e) => this.updateInputValue("deliveryMethod", e),
					onBlur: (e) => this.updateInputValue("deliveryMethod", e),
				},
				options: [
					{
						value: "fastest",
						content: "Fastest",
					},
					{
						value: "cheapest",
						content: "Cheapest",
					},
				],
				labelAttributes: {
					value: "Delivery Method:",
					htmlFor: "deliveryMethod",
				},
				validation: {
					required: true,
				},
				changed: false,
				isValid: false,
				errorMessage: "**Required field**",
			},
		},
		formIsValid: false,
		loading: false,
	};

	updateInputValue(id, e) {
		const updatedForm = { ...this.state.formInfo };
		const updatedInputConfig = { ...updatedForm[id] };
		const updatedAttributes = { ...updatedInputConfig.inputAttributes };
		updatedAttributes.value = e.target.value;
		updatedInputConfig.inputAttributes = updatedAttributes;
		updatedInputConfig.changed = true;
		updatedInputConfig.isValid = this.checkValidity(
			patterns[id],
			e.target.value
		);
		updatedForm[id] = updatedInputConfig;
		const formIsValid = Object.values(updatedForm)
			.map(({ isValid }) => isValid)
			.every((inputIsValid) => inputIsValid);
		this.setState({
			formInfo: updatedForm,
			formIsValid: formIsValid,
		});
	}

	checkValidity(regex, inputValue) {
		return regex.test(inputValue);
	}

	inputConfig(
		labeValue,
		id,
		placeholder,
		errorMessage,
		type = "text",
		inputType = "input"
	) {
		const inputConfig = {
			inputType: inputType,
			inputAttributes: {
				type: type,
				placeholder: placeholder,
				id: id,
				value: "",
				onChange: (e) => this.updateInputValue(id, e),
			},
			labelAttributes: {
				value: labeValue,
				htmlFor: id,
			},
			validation: {
				minLength: 4,
			},
			changed: false,
			isValid: false,
			errorMessage: errorMessage,
		};
		return inputConfig;
	}

	componentDidMount() {
		const { ingredients, history } = this.props;
		if (!ingredients) history.replace("/");
	}

	orderHandler = (event) => {
		event.preventDefault();
		const { formInfo } = this.state;
		const {
			ingredients,
			totalPrice,
			purchaseBurger,
			clearIngredients,
			token,
			userId,
		} = this.props;
		const formData = {};

		for (let input in formInfo) {
			formData[input] = formInfo[input].inputAttributes.value;
		}

		const order = {
			formData: formData,
			ingredients: ingredients,
			price: totalPrice,
			userId: userId,
		};
		clearIngredients();
		purchaseBurger(order, token);
	};

	render() {
		const { formInfo, formIsValid } = this.state;
		const { loading, purchased } = this.props;
		const formInputs = Object.entries(formInfo).map(([key, value]) => {
			return <Input key={key} {...value} />;
		});
		const redirect = purchased ? <Redirect to="/" /> : null;
		const form = loading ? (
			<Spinner />
		) : (
			<form onSubmit={this.orderHandler}>
				{formInputs}
				<Button btnType="Order" disabled={!formIsValid}>
					ORDER
				</Button>
			</form>
		);
		return (
			<div style={{ display: "flex", height: "calc(100vh - 72px)" }}>
				{redirect}
				<div className={classes.Chekout}>
					<h4>Enter your Contact Data</h4>
					{form}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	ingredients: state.burgerBuilder.ingredients,
	totalPrice: state.burgerBuilder.totalPrice,
	loading: state.chekout.loading,
	purchased: state.chekout.purchased,
	token: state.auth.token,
	userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
	purchaseBurger: (data, token) => dispatch(action.purchaseBurger(data, token)),
	clearIngredients: () => dispatch(action.clearIngredients()),
});

Chekout = connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Chekout, axios));

export default Chekout;
