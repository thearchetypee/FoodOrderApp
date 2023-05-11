import React, {useContext} from "react";
import styles from "./MealItem.module.css"
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const ctx = useContext(CartContext);
  const price = `$${props.meal.price.toFixed(2)}`;

  const addMealHandler = (amount) => {
    ctx.addItem({
      ...props.meal,
      amount: +amount
    });
  }

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={styles.description}>{props.meal.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.meal.id} addMealHandler={addMealHandler}/>
      </div>
    </li>
  );
};

export default MealItem;