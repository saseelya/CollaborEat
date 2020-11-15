import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

export default function EditRecipe() {
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
        .then(data => {
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

  const handleEditSubmit = (event) => {
    event.preventDefault();
    setRecipeId(recipe.recipeId);
    fetch(`http://localhost:8080/recipe/edit/${recipeId}`, {
      method: 'PUT',
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
      <h2>Edit a Recipe</h2>
      <form onSubmit={handleEditSubmit}>
      <div>
        <label htmlFor="recipeName">Recipe Name:  </label>
        <input id="recipeName" value={recipeName} 
          onChange={(event) => setRecipeName(event.target.value)} type="text" placeholder="Name that Recipe!" />
      </div>
      <div>
        <label htmlFor="recipeDescription">Recipe Description:  </label>
        <input id="recipeDescription" value={recipeDescription} 
          onChange={(event) => setRecipeDescription(event.target.value)} type="text" placeholder="Describe that recipe!" />
      </div>
      <div>
        <label htmlFor="recipeStory">Recipe Story:  </label>
        <input id="recipeStory" value={recipeStory} 
          onChange={(event) => setRecipeStory(event.target.value)} type="text" placeholder="Tell other collaborEaters about this recipe" />
      </div>
      <div>
        <label htmlFor="recipeCookTime">Cook Time:  </label>
        <input id="recipeCookTime" value={recipeCookTime} 
          onChange={(event) => setRecipeCookTime(event.target.value)} type="text" placeholder="How long does it take it make?" />
      </div>
      <div>
        <label htmlFor="recipeIngredients">Recipe Ingredients:  </label>
        <textarea id="recipeIngredients" value={recipeIngredients} 
          onChange={(event) => setRecipeIngredients(event.target.value)} type="text" placeholder="List your ingredients with a new line for each" />
      </div>
      <div>
        <label htmlFor="recipeSteps">Recipe Steps:  </label>
        <textarea id="recipeSteps" value={recipeSteps} 
          onChange={(event) => setRecipeSteps(event.target.value)} type="text" placeholder="List your steps with a new line for each" />
      </div>
      <div>
        <label htmlFor="mealType">Select a Meal Type:  </label>
        <select id="mealType" value={mealTypeId} onChange={(event) => setMealTypeId(event.target.value)}>
          <option value="1">Breakfast</option>
          <option value="2">Dinner</option>
        </select>
      </div>
      <button type="submit">Edit Recipe</button>
      </form>
    </>
  )

}