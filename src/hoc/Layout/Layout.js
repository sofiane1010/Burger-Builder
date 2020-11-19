import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../Auxiliary/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/Sidedrawer/Sidedrawer";

class Layout extends Component {
	state = {
		showSideDrawer: false,
	};

	sideDrawerStateHandler = () => {
		this.setState((prevState) => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	};
	render() {
		const { isAuth } = this.props;
		const { showSideDrawer } = this.state;
		return (
			<Aux>
				<Toolbar openSideDrawer={this.sideDrawerStateHandler} isAuth={isAuth} />
				<SideDrawer
					showBackdrop={showSideDrawer}
					close={this.sideDrawerStateHandler}
					isAuth={isAuth}
				/>
				<main className={classes.Content}>{this.props.children}</main>
			</Aux>
		);
	}
}

const mapStateToProps = (state) => ({
	isAuth: state.auth.token !== null,
});

Layout = connect(mapStateToProps)(Layout);

export default Layout;
