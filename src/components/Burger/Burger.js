import React from "react";

import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BugerIngredient";

const Burger = ({ ingredients }) => {
	let transformedIngredients = Object.entries(ingredients)
		.map(([key, value]) =>
			[...Array(value)].map((_, i) => (
				<BurgerIngredient key={key + i} type={key} />
			))
		)
		.reduce((arr, el) => arr.concat(el), []);
	if (transformedIngredients.length === 0)
		transformedIngredients = <p>Here You Build You Burger !</p>;
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default React.memo(Burger);
