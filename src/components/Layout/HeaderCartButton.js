import React, { useContext, useEffect, useState } from "react";

import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [cartHighlight, setCartHighlight] = useState(false);
  const ctx = useContext(CartContext);

  const totalItems = ctx.items.reduce((currNumber, item) => {
    return (currNumber += item.amount);
  }, 0);

  const btnClasses = `${styles.button} ${cartHighlight ? styles.bump : ''}`;

  useEffect(() => {
    if (ctx.items.length === 0){
      return;
    }
    setCartHighlight(true);

    const timer = setTimeout(() => {
      setCartHighlight(false);
    }, 300)

    return () => {
        clearTimeout(timer)
    }
  }, [ctx.items])
  return (
    <button className={btnClasses} onClick={props.onClick}>
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
