import React, { useState, useEffect } from 'react';

export default function MealType({ recipe }) {
  const [MealType, setMealType] = useState('');

  useEffect(() => {
    const getMealType = () => {
      fetch(`http://localhost:8080/mealType/${recipe.mealTypeId}`)
        .then(response => response.json())
        .then(data => {
          setMealType(data);
        });
    };
    getMealType();
  }, [recipe.mealTypeId]);

  return (
      <td>{MealType.mealTypeName}</td>
  );
}