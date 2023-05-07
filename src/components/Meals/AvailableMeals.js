import React from "react";

import styles from "./AvailableMeals.module.css"
import { DUMMY_MEALS } from "../../assets/dummy-meals.js"

const AvaialbleMeals = props => {
    const mealList = DUMMY_MEALS.map((meal) => <li>{meal.name}</li>);
    return (
        <div className={styles.meals}>
            <ul>
                {mealList}
            </ul>
        </div>
    )
}

export default AvaialbleMeals;