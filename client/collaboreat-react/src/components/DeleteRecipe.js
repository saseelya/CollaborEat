import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import AuthContext from './AuthContext';

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
  const history = useHistory();

  const { id } = useParams();
  const auth = useContext(AuthContext)

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
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + auth.appUser.token
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
        history.push(`/`)

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
    <center>
      <h2 className="silver-black-gradient">Delete Recipe</h2>
      <hr></hr>
      <p>Recipe Name:</p>
      <p>{ recipe.recipeName }</p>
      <p>Description:  { recipe.recipeDescription }</p>
      <p>{ recipe.recipeDescription }</p>
      <p>Story:</p>
      <p>{ recipe.recipeStory }</p>
      <p>Cook Time:</p>
      <p>{ recipe.recipeCookTime }</p>
      <p>Ingredients:</p>
      <p>{ recipe.recipeIngredients }</p>
      <p>Steps:</p>
      <p> { recipe.recipeSteps }</p>

<hr></hr>
      <p>Are you sure? Deleting a recipe is permanent.</p>
      <form onSubmit={handleDeleteSubmit}>
           <button type="submit" className="btn btn-danger mr-sm-4">Delete Recipe</button>
           <Link to={"/"}><button className="btn btn-danger">Cancel</button></Link>
      </form>
      </center>
    </>
  )

}