import React, { useState, useEffect } from 'react';
import Card from './Card';

export default function RecipeCardsByDate() {
  const [Recipes, setRecipe] = useState([]);

  const getRecipe = () => {
    fetch(`${process.env.REACT_APP_API_URL}/recipe/date`)
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
      <div className="row">
              {Recipes.map(recipe => (
                <Card key={recipe.recipeId} recipe={recipe} />
              ))}
        </div>
    </>
  );
}