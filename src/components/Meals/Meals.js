import React from "react";
import MealsSummary from "./MealsSummary";
import AvaialbleMeals from "./AvailableMeals";

const Meals = props => {
    return (
        <div>
            <MealsSummary/>
            <AvaialbleMeals/>
        </div>
    )
}

export default Meals;