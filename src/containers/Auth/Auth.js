import React, { Component } from "react";
import classes from "./Auth.module.css";
import { connect } from "react-redux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as action from "../../store/actions";
import axios from "../../axios-orders";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

const patterns = {
	email: /^([\w-.éèçà]+)@([\w-]+)\.([a-zéèçà]{2,8})(\.[a-zéèçà]{2,8})*$/,
	password: /^[\w.,-@éè&çà]{8,20}$/,
};

class Auth extends Component {
	state = {
		controls: {
			email: this.inputConfig(
				"E-Mail:",
				"email",
				"example@example.com",
				"must contain alphanumeric characters (and @ - _ .)",
				"email"
			),
			password: this.inputConfig(
				"Password",
				"password",
				"password",
				"must contain alphanumeric characters and (& é è ç à , . - _ @) and contain [8, 20] characters",
				"password"
			),
		},
		formIsValid: false,
		isSignUp: true,
	};

	updateInputValue(id, e) {
		const updatedForm = { ...this.state.controls };
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
			controls: updatedForm,
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

	switchAuthMode = () => {
		this.setState((prevState) => ({ isSignUp: !prevState.isSignUp }));
	};

	submitHandler = (e) => {
		const { controls, isSignUp } = this.state;
		const { authenticate } = this.props;
		e.preventDefault();
		authenticate(
			controls.email.inputAttributes.value,
			controls.password.inputAttributes.value,
			isSignUp
		);
		this.setState({ formIsValid: false });
	};

	render() {
		const { controls, formIsValid, isSignUp } = this.state;
		const { loading, error, isAuth, purchaseInit } = this.props;
		const formIputs = Object.entries(controls).map(([key, value]) => (
			<Input key={key} {...value} />
		));
		const form = loading ? (
			<Spinner />
		) : (
			<form>
				{formIputs}
				<Button
					clicked={(e) => this.submitHandler(e)}
					btnType="Order"
					disabled={!formIsValid}
				>
					Sign {isSignUp ? "up" : "in"}
				</Button>
			</form>
		);
		const errorMessage = error ? <p>{error.message}</p> : null;

		let redirection = null;

		if (isAuth) {
			const query = new URLSearchParams(this.props.location.search);
			const path = query.get("redirect");
			if (path === "chekout") {
				purchaseInit();
				redirection = <Redirect to="/chekout" />;
			} else redirection = <Redirect to="/" />;
		}
		return (
			<div style={{ display: "flex", height: "calc(100vh - 72px)" }}>
				{redirection}
				<div className={classes.Auth}>
					{errorMessage}
					<h4>Sign {isSignUp ? "up" : "in"}</h4>
					{form}
					<Button btnType={"Danger"} clicked={this.switchAuthMode}>
						SWITCH TO SIGN {isSignUp ? "IN" : "UP"}
					</Button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	loading: state.auth.loading,
	error: state.auth.error,
	isAuth: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch) => ({
	authenticate: (email, password, isSignUp) =>
		dispatch(action.authenticate(email, password, isSignUp)),
	purchaseInit: () => dispatch(action.purchaseInit()),
});

Auth = connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Auth, axios));

export default Auth;
