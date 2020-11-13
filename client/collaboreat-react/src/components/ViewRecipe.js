import React, { useState, useEffect } from 'react';

function ViewRecipe({ recipeId, recipeName}) {
  const [recipe, setRecipe] = useState('');

  const getRecipe = () => {
    fetch(`http://localhost:8080/recipe/${recipeId}/${recipeName}`)
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
      <h2>2{recipeName}</h2>

      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Recipe Id</th>
            <th scope="col">Recipe </th>
            <th scope="col">Recipe Story</th>
            <th scope="col">Recipe Description</th>
            <th scope="col">Recipe Ingredients</th>
            <th scope="col">Recipe Cook Time</th>
            <th scope="col">Recipe Steps</th>
            <th scope="col">Date Added</th>
            <th scope="col">Rating</th>
            <th scope="col">User</th>
            <th scope="col">Meal Type</th>
          </tr>
        </thead>
        <tbody>
            <tr key={recipe.recipeId}>
                <td>{recipe.recipeId}</td>
                <td>{recipe.recipeName}</td> 
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
        </tbody>
      </table>
    </>
  );
}

export default ViewRecipe;