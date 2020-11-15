import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';

export default function AddRecipe() {
  const [recipeName, setRecipeName] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeStory, setRecipeStory] = useState('');
  const [recipeCookTime, setRecipeCookTime] = useState('');
  const [mealTypeId, setMealTypeId] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState('');

  const handleAddSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:8080/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipeName,
        recipeDescription,
        recipeStory,
        recipeCookTime,
        recipeIngredients,
        mealTypeId
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
      <h2>Add a Recipe</h2>
      <form onSubmit={handleAddSubmit}>
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
        <label htmlFor="mealType">Select a Meal Type:  </label>
        <select id="mealType" value={mealTypeId} onChange={(event) => setMealTypeId(event.target.value)}>
          <option value="1">Breakfast</option>
          <option value="2">Dinner</option>
        </select>
      </div>
      <button type="submit">Add Recipe</button>
      </form>
    </>
  )
}