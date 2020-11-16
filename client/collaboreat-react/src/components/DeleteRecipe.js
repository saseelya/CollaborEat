import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

export default function DeleteRecipe() {
  const [recipe, setRecipe] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [recipeStory, setRecipeStory] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState('');
  const [recipeCookTime, setRecipeCookTime] = useState('');
  const [recipeSteps, setRecipeSteps] = useState('');
  const [recipeDate, setRecipeDate] = useState('');
  const [recipeRating, setRecipeRating] = useState('');
  const [userId, setUserId] = useState('');
  const [mealTypeId, setMealTypeId] = useState('');
  const [recipeId, setRecipeId] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const getRecipe = () => {
        fetch(`http://localhost:8080/recipe/${id}`)
        .then(response => response.json())
        .then((data) => {
            setRecipe(data);
        })
        .then(
            setRecipeName(recipe.recipeName),
            setRecipeStory(recipe.recipeStory),
            setRecipeDescription(recipe.recipeDescription),
            setRecipeIngredients(recipe.recipeIngredients),
            setRecipeCookTime(recipe.recipeCookTime),
            setRecipeSteps(recipe.recipeSteps),
            setRecipeDate(recipe.recipeDate),
            setRecipeRating(recipe.recipeRating),
            setUserId(recipe.userId),
            setMealTypeId(recipe.mealTypeId),
            setRecipeId(recipe.recipeId)
        );
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
      if (response.status === 201) {
        console.log('Success!');
        response.json().then(data => console.log(data));
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
    {/* 
        This does the same thing where the variables only display when I save a change
    */}
      <h2>Delete Recipe</h2>
      <p>Recipe Name: { recipeName }</p>
      <p>Description:  { recipeDescription }</p>
      <p>Story:  { recipeStory }</p>
      <p>Cook Time:  { recipeCookTime }</p>
      <p>Ingredients:  { recipeIngredients }</p>
      <p>Steps:  { recipeSteps }</p>

      <form onSubmit={handleDeleteSubmit}>
           <button type="submit">Delete Recipe</button>
      </form>
    </>
  )

}