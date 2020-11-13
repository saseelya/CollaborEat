import React, { useState, useEffect } from 'react';
import ViewRecipe from './components/ViewRecipe';

export default function Recipe() {
  const [Recipes, setRecipe] = useState([]);

  const getRecipe = () => {
    fetch('http://localhost:8080/recipe')
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
      <h2>Recipe</h2>

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
          {Recipes.map(recipe => (
            <tr key={recipe.recipeId}>
                <td>{recipe.recipeId}</td>
                {/* <td><a href={'/recipe/' + recipe.recipeId + '/' + recipe.recipeName}>{recipe.recipeName}</a></td>  */}
                <td><a href={'/recipe/' + recipe.recipeId + '/' + recipe.recipeName} onClick={<ViewRecipe recipeId={recipe.recipeId} recipeName={recipe.recipeName} />}>{recipe.recipeName}</a></td> 
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
      </table>
    </>
  );
}