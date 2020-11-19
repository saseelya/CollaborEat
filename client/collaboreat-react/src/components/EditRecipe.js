import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Multiselect } from 'multiselect-react-dropdown';
import Errors from './Errors';
import AuthContext from './AuthContext';

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
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState([]);
  const [selected, setSelected] = useState([]);

  const { id } = useParams();
  const history = useHistory();
  const auth = useContext(AuthContext);

  const options=[
    {name: 'Gluten Free', id: 1},
    {name: 'Sugar Free', id: 2},
    {name: 'Vegetarian', id: 3},
    {name: 'Vegan', id: 4}
  ];

  useEffect(() => {
    const getRecipe = () => {
        fetch(`${process.env.REACT_APP_API_URL}/recipe/${id}`) 
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
            setImageUrl(data.imageUrl);
        })
    };
    getRecipe();
}, [id]);

  const handleEditSubmit = (event) => {
    event.preventDefault();
    setRecipeId(recipe.recipeId);
    fetch(`${process.env.REACT_APP_API_URL}/recipe/edit/${recipeId}`, {
      method: 'PUT',
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
        imageUrl,
        recipeId
      })
    })
    .then (response => {
      if (response.status === 201) {
        console.log('Success!');
        response.json().then(data => {
          console.log(data);
          console.log(selected);
          var i;
          
          for (i = 0; i < options.length; i++) {
            fetch(`${process.env.REACT_APP_API_URL}/recipe/healthInfo/${data.recipeId}/${options[i].id}`, {
              method: 'DELETE'
            })
          }
          if (selected.length != 0) {
            for( i = 0; i < selected.length; i++ ){
              console.log(selected[i]);
              fetch(`${process.env.REACT_APP_API_URL}/recipe/healthInfo`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  recipeId: data.recipeId,
                  healthInfo: {healthInfoId: selected[i].id,
                              healthInfoName: selected[i].name}
                })
              })
              .then(response => {
                if (response.status === 400) {
                  response.json().then(data => {
                    setErrors([data]);
                  })
                }
              }) 
            }
          }
        });
        history.push(`/recipe/${recipeId}`)
    } else if (response.status === 400) {
        console.log('Errors!');
        response.json().then(data => {
          console.log(data);
          setErrors([data]);
        });
    } else {
        console.log('Oops... not sure what happened here :(');
    }
    })
  }

  return (
    <>
      <h2>Edit a Recipe</h2>
      <Errors errors={errors} />
      <form onSubmit={handleEditSubmit}>

      <div class="form-row">
        <div class="form-group col-md-3">
        <center><label htmlFor="recipeName">Recipe Name:</label></center>
          <input className="form-control col-12" id="recipeName" value={recipeName} 
            onChange={(event) => setRecipeName(event.target.value)} type="text" placeholder="Name that Recipe!" />
        </div>

        <div class="form-group col-md-3">
        <center><label htmlFor="recipeCookTime">Cook Time:</label></center>
          <input className="form-control col-12" id="recipeCookTime" value={recipeCookTime} 
            onChange={(event) => setRecipeCookTime(event.target.value)} type="number" placeholder="How long does it take it make?" />
        </div>  

        <div class="form-group col-md-3">
          <center><label htmlFor="mealType">Select a Meal Type:</label></center>
          <select className="form-control col-12" id="mealType" value={mealTypeId} onChange={(event) => setMealTypeId(event.target.value)}>
            <option value="1">Breakfast</option>
            <option value="2">Brunch</option>
            <option value="3">Dessert</option>
            <option value="4">Dinner</option>
            <option value="5">Entree</option>
            <option value="6">Lunch</option>
            <option value="7">Side</option>
            <option value="8">Snack</option>
          </select>
        </div>

        <div class="form-group col-md-3">
          <label>Select Health Info:  </label>
          <Multiselect 
            options={options}
            selectedValues={selected}
            onSelect={(selected) => setSelected(selected)} // Function will trigger on select event
            onRemove={(selected) => setSelected(selected)} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
            />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <center><label htmlFor="recipeDescription">Recipe Description:</label></center>
          <textarea className="form-control col-16" id="recipeDescription" rows="8" value={recipeDescription} 
            onChange={(event) => setRecipeDescription(event.target.value)} type="text" placeholder="Describe that recipe!" />
        </div>
        <div class="form-group col-md-6">
          <center><label htmlFor="recipeStory">Recipe Story:  </label></center>
          <textarea className="form-control col-16" rows="8" id="recipeStory" value={recipeStory} 
            onChange={(event) => setRecipeStory(event.target.value)} type="text" placeholder="Tell other CollaborEaters about this recipe!" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <center><label htmlFor="recipeIngredients">Recipe Ingredients:  </label></center>
          <textarea className="form-control col-16" rows="8" id="recipeIngredients" value={recipeIngredients} 
            onChange={(event) => setRecipeIngredients(event.target.value)} type="text" placeholder="List your ingredients. Create a new line for each ingredient. Don't forget proportions!" />
        </div>
        <div class="form-group col-md-6">
          <center><label htmlFor="recipeSteps">Recipe Steps:  </label></center>
          <textarea className="form-control col-16" rows="8" id="recipeSteps" value={recipeSteps} 
            onChange={(event) => setRecipeSteps(event.target.value)} type="text" placeholder="List your steps. Create a new line for each step. We'll take it from there." />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-10">
          <center><label htmlFor="imageUrl">Link to Image:  </label></center>
          <input className="form-control col-16" id="imageUrl" value={imageUrl} 
            onChange={(event) => setImageUrl(event.target.value)} type="text" placeholder="Words can only do so much. Give the reader an idea of what the recipe looks like with an external link!" />
        </div>

        <div class="form-ground col-md-2">
          <button className="btn btn-primary form-control col-16" type="submit">Edit Recipe</button>
          <Link to={"/"}><button className="btn btn-danger form-control col-16">Cancel</button></Link>
        </div>
      </div>
        
      </form>
    </>
  )

}