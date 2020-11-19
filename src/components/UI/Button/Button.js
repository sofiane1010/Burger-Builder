import React, { Component } from "react";

import classes from "./Button.module.css";

class Button extends Component {
  render() {
    return (
      <button
        onClick={this.props.clicked}
        disabled={this.props.disabled}
        className={[classes.Button, classes[this.props.btnType]].join(" ")}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
