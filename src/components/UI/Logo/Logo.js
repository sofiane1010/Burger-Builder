import React from "react";
import { Link } from "react-router-dom";

import burgerLogo from "../../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";

const logo = ({ height }) => (
  <div className={classes.Logo} style={{ height: height }}>
    <Link to="/">
      <img src={burgerLogo} alt="My Burger" />
    </Link>
  </div>
);

export default logo;
