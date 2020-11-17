import React, { useState, useEffect } from 'react';

export default function MealType({ recipe }) {
  const [mealType, setMealType] = useState(null);

  useEffect(() => {
    const getMealType = () => {
      fetch(`http://localhost:8080/mealType/${recipe.mealTypeId}`)
        .then(response => response.json())
        .then(data => {
          setMealType(data);
        });
    };
    if (recipe && recipe.mealTypeId) {
      getMealType();
    }
  }, [recipe.mealTypeId, recipe]);

  return (
      <>{mealType ? mealType.mealTypeName : ''}</>
  );
}