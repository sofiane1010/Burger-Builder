import React from "react";

import classes from "./Toolbar.module.css";
import Logo from "../../UI/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../Sidedrawer/DrawerToggle/DrawerToggle";

const toolbar = ({ openSideDrawer, isAuth }) => {
	return (
		<header className={classes.Toolbar}>
			<DrawerToggle clicked={openSideDrawer} />
			<Logo height="80%" />
			<div className={classes.DesktopOnly}>
				<NavigationItems isAuth={isAuth} />
			</div>
		</header>
	);
};

export default React.memo(toolbar);
