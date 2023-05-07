import React from "react";

import styles from "./HeaderCartButton.module.css"
import CartIcon from "../Cart/CartIcon"

const HeaderCartButton = props => {
    return (
      <button className={styles.button}>
        <span className={styles.icon}>
          <CartIcon/>
        </span>
        <span>
          Your Cart
        </span>
        <span>
          <div className={styles.badge}>0</div>
        </span>
      </button>
    );
}

export default HeaderCartButton;