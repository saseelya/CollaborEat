import React, { useState, useEffect } from 'react';

export default function RecipeCards() {
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
      <h2>Recipes</h2>
      <div class="row">
              {Recipes.map(recipe => (
                <div class="col">
                <div class="card" key={recipe.recipeId}>
                  <img class="card-img-top" url=""/>
                  <div class="card-body">
                    <h4 class="card-title"><a href={'/recipe/' + recipe.recipeId}>{recipe.recipeName}</a></h4> 
                    <p class="card-text">
                      Created By: {recipe.userId}
                    </p>
                    <p class="card-text">
                      Uploaded On: {recipe.recipeDate}
                    </p>
                    <p class="card-text">
                      Rating: {recipe.recipeRating}
                    </p> 
                  </div>
                  </div>
                </div>
              ))}
        </div>
    </>
  );
}