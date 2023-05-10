import React from "react";

import styles from "./AvailableMeals.module.css"
import { DUMMY_MEALS } from "../../assets/dummy-meals.js"
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvaialbleMeals = props => {
    const mealList = DUMMY_MEALS.map((meal) => <MealItem meal={meal}/>);
    return (
      <Card className={styles.meals}>
        <ul>{mealList}</ul>
      </Card>
    );
}

export default AvaialbleMeals;