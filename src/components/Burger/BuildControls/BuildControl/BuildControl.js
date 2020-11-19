import React, { Component } from "react";

import classes from "./BuildControl.module.css";

class BuildControl extends Component {
	shouldComponentUpdate(nextProps) {
		return (
			nextProps.disableLess !== this.props.disableLess ||
			nextProps.disableMore !== this.props.disableMore
		);
	}
	render() {
		const {
			label,
			ingredient,
			disableLess,
			disableMore,
			added,
			removed,
		} = this.props;
		return (
			<div className={classes.BuildControl}>
				<div className={classes.Label}>{label}</div>
				<button
					className={classes.Less}
					onClick={() => {
						removed(ingredient);
					}}
					disabled={disableLess}
				>
					Less
				</button>
				<button
					className={classes.More}
					onClick={() => {
						added(ingredient);
					}}
					disabled={disableMore}
				>
					More
				</button>
			</div>
		);
	}
}

export default BuildControl;
