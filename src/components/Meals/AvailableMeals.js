import React, {useState, useEffect, useCallback } from "react";

import styles from "./AvailableMeals.module.css"
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvaialbleMeals = props => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchMealsHandler = useCallback(async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://react-example-cb048-default-rtdb.firebaseio.com/meals.json"
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await response.json();

        const loadedMeals = [];
        for (const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }
        setMeals(loadedMeals);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }, []);

    useEffect(() => {
      fetchMealsHandler();
    }, [fetchMealsHandler]);

    let content = <p>Found no meals.</p>;
    if (isLoading) {
      content = <p className={styles.MealLoading}>Loading...</p>;
    }
    if(meals.length > 0) {
      content = <ul>{meals.map((meal) => <MealItem key = {meal.id} meal={meal}/>)}</ul>;
    }
    if (error) {
      content = <p className={styles.MealError}>{error}</p>;
    }
    return (
      <Card className={styles.meals}>
        <section>{content}</section>
      </Card>
    );
}

export default AvaialbleMeals;