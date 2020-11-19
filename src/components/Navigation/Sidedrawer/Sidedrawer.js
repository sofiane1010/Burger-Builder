import React from "react";

import Logo from "../../UI/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./Sidedrawer.module.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sidedrawer = ({ showBackdrop, close, isAuth }) => {
	const appliedClasses = [
		classes.SideDrawer,
		showBackdrop ? classes.Opened : classes.Closed,
	].join(" ");
	return (
		<Aux>
			<Backdrop show={showBackdrop} clicked={close} />
			<div className={appliedClasses}>
				<div className={classes.Logo} onClick={close}>
					<Logo />
				</div>
				<NavigationItems clicked={close} isAuth={isAuth} />
			</div>
		</Aux>
	);
};

export default sidedrawer;
