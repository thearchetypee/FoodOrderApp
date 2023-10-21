import { useRef, useState } from "react";
import classes from "./CheckOut.module.css";

const isEmpty = (input) => {
  return input.length === 0;
}
const isFiveChars = (input) => {
  return input.length === 5;
};

const CheckOut = (props) => {
    const inputNameRef = useRef();
    const inputStreetRef = useRef();
    const inputPostRef = useRef();
    const inputCityRef = useRef();

    const [formInputValidity, setFormInputValidity] = useState(
      {
        name: true,
        street: true,
        postal: true,
        city: true
      }
    );

    const confirmHandler = (event) => {
      event.preventDefault();

      const inputName = inputNameRef.current.value;
      const inputStreet = inputStreetRef.current.value;
      const inputPost = inputPostRef.current.value;
      const inputCity = inputCityRef.current.value;

      const enteredNameIsValid = !isEmpty(inputName);
      const enteredStreetIsValid = !isEmpty(inputStreet);
      const enteredCityIsValid = !isEmpty(inputCity);
      const enteredPostIsValid = isFiveChars(inputPost);

      setFormInputValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        postal: enteredPostIsValid,
        city: enteredCityIsValid,
      });

      const isFormValid = enteredCityIsValid && enteredNameIsValid && enteredPostIsValid && enteredStreetIsValid

      if (!isFormValid) {
        return;
      }
      props.onConfim({
        name: inputName,
        street: inputStreet,
        postal: inputPost,
        city: inputCity,
      });
    };
    return (
      <form className={classes.form} onSubmit={confirmHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" ref={inputNameRef} />
          {!formInputValidity.name && <p>Please enter a valid name!</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor="street">Street</label>
          <input type="text" id="street" ref={inputStreetRef} />
          {!formInputValidity.street && <p>Please enter a valid street name!</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor="postal">Postal Code</label>
          <input type="text" id="postal" ref={inputPostRef} />
          {!formInputValidity.postal && <p>Please enter a valid postal code with 5 digits!</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" ref={inputCityRef} />
          {!formInputValidity.city && <p>Please enter a valid city!</p>}
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    );
};

export default CheckOut;