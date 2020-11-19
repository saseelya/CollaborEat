import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';

export default function RecipeCards() {
  const [Recipes, setRecipe] = useState([]);

  const getRecipe = () => {
    fetch(`${process.env.REACT_APP_API_URL}/recipe`)
      .then(response => response.json())
      .then(data => {
        setRecipe(data);
      });
  };
  
  useEffect(() => {
    getRecipe();
  }, []);

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