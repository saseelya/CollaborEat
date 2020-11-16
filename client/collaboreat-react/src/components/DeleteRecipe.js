import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function DeleteRecipe() {
  const [recipe, setRecipe] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [recipeStory, setRecipeStory] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState('');
  const [recipeCookTime, setRecipeCookTime] = useState(0);
  const [recipeSteps, setRecipeSteps] = useState('');
  const [recipeDate, setRecipeDate] = useState('');
  const [recipeRating, setRecipeRating] = useState(0);
  const [userId, setUserId] = useState(0);
  const [mealTypeId, setMealTypeId] = useState(1);
  const [recipeId, setRecipeId] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    const getRecipe = () => {
        fetch(`http://localhost:8080/recipe/${id}`)
        .then(response => response.json())
        .then((data) => {
            setRecipe(data);
            setRecipeName(data.recipeName);
            setRecipeStory(data.recipeStory);
            setRecipeDescription(data.recipeDescription);
            setRecipeIngredients(data.recipeIngredients);
            setRecipeCookTime(data.recipeCookTime);
            setRecipeSteps(data.recipeSteps);
            setRecipeDate(data.recipeDate);
            setRecipeRating(data.recipeRating);
            setUserId(data.userId);
            setMealTypeId(data.mealTypeId);
            setRecipeId(data.recipeId);
        })
    };
    getRecipe();
}, [id]);

  const handleDeleteSubmit = (event) => {
    event.preventDefault();
    setRecipeId(recipe.recipeId);
    fetch(`http://localhost:8080/recipe/delete/${recipeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipeName,
        recipeStory,
        recipeDescription,
        recipeIngredients,
        recipeCookTime,
        recipeSteps,
        recipeDate,
        recipeRating,
        userId,
        mealTypeId,
        recipeId,
      })
    })
    .then (response => {
      if (response.status === 204) {
        console.log('Success!');

    } else if (response.status === 400) {
        console.log('Errors!');
        response.json().then(data => {
        console.log(data);
        });
    } else {
        console.log('Oops... not sure what happened here :(');
    }
    })
  }

  return (
    <>
      <h2>Delete Recipe</h2>
      <p>Recipe Name: { recipe.recipeName }</p>
      <p>Description:  { recipe.recipeDescription }</p>
      <p>Story:  { recipe.recipeStory }</p>
      <p>Cook Time:  { recipe.recipeCookTime }</p>
      <p>Ingredients:  { recipe.recipeIngredients }</p>
      <p>Steps:  { recipe.recipeSteps }</p>

      <form onSubmit={handleDeleteSubmit}>
           <button type="submit">Delete Recipe</button>
           <Link to={"/"}>Go Back to Home Page</Link>
      </form>
    </>
  )

}