import React, { useRef } from "react";
import styles from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const amountRef = useRef();

  const submitHanlder = (event) => {
    event.preventDefault();
    const amount = amountRef.current.value;
    props.addMealHandler(amount);
  };

  return (
    <form className={styles.form} onSubmit={submitHanlder}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
