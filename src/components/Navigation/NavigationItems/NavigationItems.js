import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

let navigationItems = ({ clicked, isAuth }) => {
	return (
		<nav>
			<ul className={classes.NavigationItems}>
				<NavigationItem link="/" clicked={clicked}>
					Burger Builder
				</NavigationItem>
				{isAuth ? (
					<NavigationItem link="/orders" clicked={clicked}>
						My Orders
					</NavigationItem>
				) : null}
				{isAuth ? (
					<NavigationItem link="/logout" clicked={clicked}>
						Logout
					</NavigationItem>
				) : (
					<NavigationItem link="/auth" clicked={clicked}>
						Authenticate
					</NavigationItem>
				)}
			</ul>
		</nav>
	);
};

export default navigationItems;
