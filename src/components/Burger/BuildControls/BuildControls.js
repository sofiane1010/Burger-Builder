import React, { Component } from "react";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
	{ label: "Salad", type: "salad" },
	{ label: "Bacon", type: "bacon" },
	{ label: "Cheese", type: "cheese" },
	{ label: "Meat", type: "meat" },
];

class BuildControls extends Component {
	shouldComponentUpdate(nextProps) {
		return nextProps.totalPrice !== this.props.totalPrice;
	}
	render() {
		const {
			ingredientAdded,
			ingredientRemoved,
			disableMore,
			disableLess,
			purchasable,
			clearBurger,
			purchaseHandler,
			totalPrice,
			isAuth,
		} = this.props;
		return (
			<div className={classes.BuildControls}>
				<p>
					Total Price : <strong>{totalPrice.toFixed(2)}</strong> $
				</p>
				{controls.map((ctrl) => {
					return (
						<BuildControl
							ingredient={ctrl.type}
							key={ctrl.label}
							label={ctrl.label}
							added={ingredientAdded}
							removed={ingredientRemoved}
							disableMore={disableMore[ctrl.type]}
							disableLess={disableLess[ctrl.type]}
						/>
					);
				})}
				<div className={classes.ControlButtons}>
					<button
						disabled={!purchasable}
						className={classes.Clear}
						onClick={clearBurger}
					>
						Clear Burger
					</button>
					<button
						onClick={purchaseHandler}
						disabled={!purchasable}
						className={classes.Purchase}
					>
						{isAuth ? "Order Now" : "Sign Up To Order"}
					</button>
				</div>
			</div>
		);
	}
}

export default BuildControls;
