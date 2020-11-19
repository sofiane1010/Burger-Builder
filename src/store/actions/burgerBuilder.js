import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (ingredient) => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredient: ingredient,
});
export const removeIngredient = (ingredient) => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredient: ingredient,
});
export const clearIngredients = () => ({ type: actionTypes.CLEAR_INGREDIENTS });

const setIngredients = (ing) => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients: ing,
});

const catchError = () => ({
  type: actionTypes.CATCH_ERRORS,
});

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then(({ data }) => dispatch(setIngredients(data)))
      .catch(() => dispatch(catchError()));
  };
};
