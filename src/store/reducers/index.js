import burgerBuilder from "./burgerBuilder";
import chekout from "./chekout";
import orders from "./orders";
import auth from "./auth";
import { combineReducers } from "redux";

const rootReducer = combineReducers({ burgerBuilder, chekout, orders, auth });

export default rootReducer;
