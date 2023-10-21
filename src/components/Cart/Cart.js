import React, { useState, useContext } from "react";

import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";

const Cart = (props) => {
  const [order, setOrder] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const ctx = useContext(CartContext);
  const onAdd = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };
  const onRemove = (id) => {
    ctx.removeItem(id);
  };

  const onOrder = (event) => {
    setOrder(true);
  };

  const cancelOrder = (event) => {
    setOrder(false);
  };

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  async function sendOrder(userData) {
    setIsSubmitting(true);
    const response = await fetch(
      // ADD db url,
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orders: ctx.items,
          totalAmount: totalAmount
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resp = await response;
    if (resp.ok) {
      console.log(resp.json());
      ctx.clearCart();
      setOrder(false);
      setIsSubmitting(false);
      setDidSubmit(true);
    };
  };

  const confirmHandler = (userData) => {
    sendOrder(userData)
  };

 const cartItems = (
   <ul className={styles["cart-items"]}>
     {ctx.items.map((item) => (
       <CartItem
         key={item.id}
         item={item}
         onAdd={onAdd.bind(null, item)}
         onRemove={onRemove.bind(null, item.id)}
       />
     ))}
   </ul>
 );

 const modalActions = (
   <div className={styles.actions}>
     <button
       className={styles["button--alt"]}
       onClick={props.cartDismissHanlder}
     >
       Close
     </button>
     {hasItems && (
       <button className={styles.button} onClick={onOrder}>
         Order
       </button>
     )}
   </div>
 );

 const cartModalContent = (
   <React.Fragment>
     {cartItems}
     <div className={styles.total}>
       <span>Total Amount</span>
       <span>{totalAmount}</span>
     </div>
     {order && (
       <CheckOut onConfirm={confirmHandler} onCancel={cancelOrder} />
     )}
     {!order && modalActions}
   </React.Fragment>
 );

 const isSubmittingModalContent = <p>Sending order data...</p>;

 const didSubmitModalContent = (
   <React.Fragment>
     <p>Successfully sent the order!</p>
     <div className={styles.actions}>
       <button className={styles.button} onClick={props.onClose}>
         Close
       </button>
     </div>
   </React.Fragment>
 );

 return (
   <Modal onClose={props.onClose}>
     {!isSubmitting && !didSubmit && cartModalContent}
     {isSubmitting && isSubmittingModalContent}
     {!isSubmitting && didSubmit && didSubmitModalContent}
   </Modal>
 );
};

export default Cart;
