import React, { useState, useEffect } from 'react';

export default function RecipeHealthInfo({recipeId}) {
  const [healthInfos, setHealthInfo] = useState([]);

  

  return (
    <>
     <tbody>
          {Recipes.map(recipe => (
            <tr key={recipe.recipeId}>
                <td>{recipe.recipeId}</td>
                <td><Link to={'/recipe/' + recipe.recipeId}>{recipe.recipeName}</Link></td> 
                <td>{recipe.recipeStory}</td>
                <td>{recipe.recipeDescription}</td>
                <td>{recipe.recipeIngredients}</td>
                <td>{recipe.recipeCookTime}</td>
                <td>{recipe.recipeSteps}</td>
                <td>{recipe.recipeDate}</td>
                <td>{recipe.recipeRating}</td>
                <td>{recipe.userId}</td>
                <td>{recipe.mealTypeId}</td>
            </tr>
          ))}
        </tbody>
    </>
  );
}