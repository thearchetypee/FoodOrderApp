import React, { useContext } from "react";

import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const onAdd = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };
  const onRemove = (id) => {
    ctx.removeItem(id);
  };
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          item={item}
          onAdd={onAdd.bind(null, item)}
          onRemove={onRemove.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;

  return (
    <Modal>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button
          className={styles["button-alt"]}
          onClick={props.cartDismissHanlder}
        >
          Close
        </button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
