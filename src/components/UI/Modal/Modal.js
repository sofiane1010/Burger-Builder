import React, { Component } from "react";

import classes from "./Modal.module.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";
import Exit from "../Exit/Exit";

class Modal extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.show !== this.props.show;
  }
  render() {
    const { show, modalClosed, children } = this.props;
    return (
      <Aux>
        <Backdrop show={show} clicked={modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: show ? "translateY(0)" : "translateY(-100vh)",
            opacity: show ? "1" : "0",
          }}
        >
          <Exit clicked={modalClosed} />
          {show ? children : null}
        </div>
      </Aux>
    );
  }
}

export default Modal;
