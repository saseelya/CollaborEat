import React, { useState, useEffect, useContext } from 'react';
import {useParams, Link} from 'react-router-dom';

import MealType from './RecipeMealType';
import GetPerson from './Person';
import GetFeedback from './RecipeFeedback';
import RecipeHealthInfo from './RecipeHealthInfo';

import AuthContext from './AuthContext';
import GetRating from './RecipeRating';

function ViewRecipe() {
  const [recipe, setRecipe] = useState(null);
  const [Feedbacks, setFeedback] = useState([]);
  const {id} = useParams();

  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(1);
  const [recipeId, setRecipeId] = useState(0);
  const feedbackId = 0;
  const auth = useContext(AuthContext);

  
  useEffect(() => {
    const getRecipe = () => {
      fetch(`http://localhost:8080/recipe/${id}`)
        .then(response => response.json())
        .then(data => {
          setRecipe(data);
        });
    };
    const getFeedback = () => {
      fetch(`http://localhost:8080/feedback/${id}`)
        .then(response => response.json())
        .then(data => {
          setFeedback(data);
        })
    }
    getRecipe();
    getFeedback();
    setRecipeId(id);
  }, [id]);

  const pageUpdate = () => {
    const getRecipe = () => {
      fetch(`http://localhost:8080/recipe/${id}`)
        .then(response => response.json())
        .then(data => {
          setRecipe(data);
        })
    }

    const getFeedback = () => {
      fetch(`http://localhost:8080/feedback/${id}`)
        .then(response => response.json())
        .then(data => {
          setFeedback(data);
        })
    }
    getRecipe();
    getFeedback();
  }

  const handleAddSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:8080/feedback/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        feedbackId,
        feedbackComment,
        feedbackRating: parseInt(feedbackRating),
        recipeId,
        userId: auth.appUser.userId
      })
    })
    .then (response => {
      if (response.status === 201) {
        console.log('Success!');
        pageUpdate();
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

  if (!recipe) {
    return null;
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>{recipe.recipeName}</h2>
            <p>Date Added: {recipe.recipeDate}</p>
            <p>Added By: <Link to={"/user/" + recipe.userId}><GetPerson id={recipe.userId} /></Link></p>
            <p>Cook Time: {recipe.recipeCookTime}</p>
            <p>Rating: <GetRating recipe={recipe} /></p>
          </div>
        <img className="col" src={recipe.imageUrl} alt="food" height="280" width="280"/>
      </div>
      </div>
      <div className="container">
        <h4>The Story</h4>
        <p>{recipe.recipeStory}</p>
      </div>
      <div className="container">
        <h4>The Description</h4>
        <p>{recipe.recipeDescription}</p>
      </div>
      <div className="container">
        <h4>The Ingredients</h4>
        <p>{recipe.recipeIngredients}</p>
      </div>
      <div className="container">
        <h4>The Steps</h4>
        <p>{recipe.recipeSteps}</p>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">Meal Type: <Link to={"/recipe/mealType/" + recipe.mealTypeId}><MealType recipe={recipe} /></Link></div>
          <div className="col">Health Info: <RecipeHealthInfo recipe={recipe} /></div>
        </div>
      </div>

      {/* <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
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
            <th scope="col">Health Info</th>
          </tr>
        </thead>
        <tbody>
            <tr key={recipe.recipeId}>
                <td>{recipe.recipeName}</td> 
                <td>{recipe.recipeStory}</td>
                <td>{recipe.recipeDescription}</td>
                <td>{recipe.recipeIngredients}</td>
                <td>{recipe.recipeCookTime}</td>
                <td>{recipe.recipeSteps}</td>
                <td>{recipe.recipeDate}</td>
                <td><GetRating recipe={recipe} /></td>
                <GetPerson id={recipe.userId} />
                <MealType recipe={recipe} />
                <td><RecipeHealthInfo recipe={recipe} /></td>
            </tr>
        </tbody>
      </table> */}
      {auth.appUser && (
      <form onSubmit={handleAddSubmit}>
        <div>
          <label htmlFor="feedbackComment">Comment: </label>
          <input id="feedbackComment" value={feedbackComment} 
            onChange={(event) => setFeedbackComment(event.target.value)} type="text" placeholder="Enter your comment!" />
          <label htmlFor="feedbackRating">Select a rating:  </label>
        </div>
        <div>
          <select id="feedbackRating" value={feedbackRating} 
            onChange={(event) => setFeedbackRating(event.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
          <button type="submit">Add Comment</button>
      </form>
      )};
      <h2>Feedback</h2>

      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">User</th>
            <th scope="col">Feedback</th>
            <th scope="col">Feedback Rating</th>
          </tr>
        </thead>
        <tbody>
        {Feedbacks.map(feedback =>
            <GetFeedback key={feedback.feedbackId} feedback={feedback} pageUpdate={pageUpdate} />
          )}
        </tbody>
      </table>
    </>
  );
}

export default ViewRecipe;
