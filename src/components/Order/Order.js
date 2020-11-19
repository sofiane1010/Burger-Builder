import React from "react";

import classes from "./Order.module.css";
import Button from "../UI/Button/Button";

const Order = ({ ingredients, price, deleteOrder }) => {
  const ingredientOutput = Object.entries(ingredients).map(([key, value]) => {
    return (
      <span
        key={key}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          padding: "5px",
          border: "1px solid rgb(202, 151, 104)",
        }}
      >
        {key} ({value})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        price: <strong>{price.toFixed(2)} $</strong>
      </p>
      <Button btnType="Danger" clicked={deleteOrder}>
        DELETE
      </Button>
    </div>
  );
};

export default Order;
