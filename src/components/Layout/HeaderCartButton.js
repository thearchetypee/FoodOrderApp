import React, { useContext } from "react";

import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);

  const totalItems = ctx.items.reduce((currNumber, item) => {
    return (currNumber += item.amount);
  }, 0);
  return (
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span>
        <div className={styles.badge}>{totalItems}</div>
      </span>
    </button>
  );
};

export default HeaderCartButton;
