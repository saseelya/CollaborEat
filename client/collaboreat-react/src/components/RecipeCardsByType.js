import React, { useState, useEffect } from 'react';
import Card from './Card';

export default function RecipeCardsByType({ id }) {
  const [Recipes, setRecipe] = useState([]);

  const getRecipe = () => {
    fetch(`http://localhost:8080/recipe/mealType/${id}`)
      .then(response => response.json())
      .then(data => {
        setRecipe(data);
      });
  };
  
  useEffect(() => {
    getRecipe();
  });

  return (
    <>
      <h2>Recipes</h2>
      <div className="row">
              {Recipes.map(recipe => (
                <Card key={recipe.recipeId} recipe={recipe} />
              ))}
        </div>
    </>
  );
}