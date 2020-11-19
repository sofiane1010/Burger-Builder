import React from "react";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

const orderSummary = ({ ingredients, cancel, purchaseHandler, totalPrice }) => {
  const ingredientSummary = Object.entries(ingredients).map(([key, value]) => (
    <li key={key}>
      {key.toUpperCase()} : {value}
    </li>
  ));

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>The Ingredients of Your Burger</p>
      <ul>{ingredientSummary}</ul>
      <p style={{ fontWeight: "bold" }}>
        Total price : {totalPrice.toFixed(2)} $
      </p>
      <p>Continue to purchase ?</p>
      <Button clicked={purchaseHandler} btnType="Success">
        CONTINUE
      </Button>
      <Button clicked={cancel} btnType="Danger">
        CANCEL
      </Button>
    </Aux>
  );
};

export default orderSummary;
