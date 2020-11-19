import React from "react";

import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

let navigationItem = ({ children, link, clicked }) => {
	return (
		<li className={classes.NavigationItem}>
			<NavLink
				to={link}
				exact
				onClick={clicked}
				activeClassName={classes.active}
			>
				{children}
			</NavLink>
		</li>
	);
};

export default navigationItem;
