import React from "react";

import classes from "./Backdrop.module.css";

const backdrop = ({ show, clicked }) => {
  return show ? (
    <div className={classes.Backdrop} onClick={clicked}></div>
  ) : null;
};
export default backdrop;
