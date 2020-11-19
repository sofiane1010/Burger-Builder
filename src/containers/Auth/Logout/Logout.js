import React, { Component } from "react";
import { connect } from "react-redux";

import * as action from "../../../store/actions";
import { Redirect } from "react-router-dom";

class Logout extends Component {
	componentDidMount() {
		this.props.logout();
	}
	render() {
		return <Redirect to="/" />;
	}
}

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(action.logout()),
});

Logout = connect(null, mapDispatchToProps)(Logout);

export default Logout;
