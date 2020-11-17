import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';

export default function RecipeCardsByFood() {
  const [Recipes, setRecipe] = useState([]);
  const {food} = useParams();

  useEffect(() => {
    const getRecipe = () => {
        fetch(`http://localhost:8080/recipe/food/${food}`)
          .then(response => response.json())
          .then(data => {
            setRecipe(data);
          });
      };
    getRecipe();
  }, [food]);

  return (
    <>
      <h2>Recipes containing {food}</h2>
      <div className="row">
              {Recipes.map(recipe => (
                <Card key={recipe.recipeId} recipe={recipe} />
              ))}
        </div>
    </>
  );
}