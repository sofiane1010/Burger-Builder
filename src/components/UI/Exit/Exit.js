import React from "react";

import classes from "./Exit.module.css";

const exit = ({ clicked }) => (
  <div className={classes.Exit} onClick={clicked}></div>
);

export default exit;
