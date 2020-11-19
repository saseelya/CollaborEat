import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Card from './Card';

export default function RecipeCardsByType({ mealTypeId }) {
  const [Recipes, setRecipe] = useState([]);
  const {id} = useParams();

  const getRecipe = (identifier) => {
    fetch(`${process.env.REACT_APP_API_URL}/recipe/mealType/all/${identifier}`)
      .then(response => response.json())
      .then(data => {
        setRecipe(data);
      });
  };
  
  useEffect(() => {
    if (id) {
      getRecipe(id);
    } else {
      getRecipe(mealTypeId);
    }
  }, [id, mealTypeId]);

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