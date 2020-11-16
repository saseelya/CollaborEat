import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

export default function EditRecipe() {
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
  const [mealTypeId, setMealTypeId] = useState(0);
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
        // .then(
        //     setRecipeName(data.recipeName),
        //     setRecipeStory(data.recipeStory),
        //     setRecipeDescription(data.recipeDescription),
        //     setRecipeIngredients(data.recipeIngredients),
        //     setRecipeCookTime(data.recipeCookTime),
        //     setRecipeSteps(data.recipeSteps),
        //     setRecipeDate(data.recipeDate),
        //     setRecipeRating(data.recipeRating),
        //     setUserId(data.userId),
        //     setMealTypeId(data.mealTypeId),
        //     setRecipeId(data.recipeId)
        // );
        // .then(({ recipeName, recipeStory, recipeDescription, recipeIngredients, recipeCookTime, recipeSteps, recipeDate, recipeRating, userId, mealTypeId, recipeId}) => {
        //   setRecipeName(recipeName),
        //   setRecipeStory(recipeStory),
        //     setRecipeDescription(recipeDescription),
        //     setRecipeIngredients(recipeIngredients),
        //     setRecipeCookTime(recipeCookTime),
        //     setRecipeSteps(recipeSteps),
        //     setRecipeDate(recipeDate),
        //     setRecipeRating(recipeRating),
        //     setUserId(userId),
        //     setMealTypeId(mealTypeId),
        //     setRecipeId(recipeId)
        // })

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
        // response.json().then(data => console.log(data));
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
      <input type="hidden" value={ recipe.recipeId }/>
      <div>
        <label htmlFor="recipeName">Recipe Name:  </label>
        <input id="recipeName" value={recipeName} 
          onChange={(event) => setRecipeName(event.target.value)} type="text" />
      </div>
      <div>
        <label htmlFor="recipeDescription">Recipe Description:  </label>
        <input id="recipeDescription" value={recipeDescription} 
          onChange={(event) => setRecipeDescription(event.target.value)} type="text"/>
      </div>
      <div>
        <label htmlFor="recipeStory">Recipe Story:  </label>
        <input id="recipeStory" value={recipeStory} 
          onChange={(event) => setRecipeStory(event.target.value)} type="text" />
      </div>
      <div>
        <label htmlFor="recipeCookTime">Cook Time:  </label>
        <input id="recipeCookTime" value={recipeCookTime} 
          onChange={(event) => setRecipeCookTime(event.target.value)} type="text" />
      </div>
      <div>
        <label htmlFor="recipeIngredients">Recipe Ingredients:  </label>
        <textarea id="recipeIngredients" value={recipeIngredients} 
          onChange={(event) => setRecipeIngredients(event.target.value)} type="text"/>
      </div>
      <div>
        <label htmlFor="recipeSteps">Recipe Steps:  </label>
        <textarea id="recipeSteps" value={recipeSteps} 
          onChange={(event) => setRecipeSteps(event.target.value)}/>
      </div>
      <div>
        <label htmlFor="mealType">Select a Meal Type:  </label>
        <select id="mealType" value={mealTypeId} onChange={(event) => setMealTypeId(event.target.value)}>
        <option value="1">Breakfast</option>
          <option value="2">Brunch</option>
          <option value="3">Desert</option>
          <option value="4">Dinner</option>
          <option value="5">Entree</option>
          <option value="6">Lunch</option>
          <option value="7">Side</option>
          <option value="8">Snack</option>
        </select>
      </div>
      <button type="submit">Edit Recipe</button>
      </form>
    </>
  )

}