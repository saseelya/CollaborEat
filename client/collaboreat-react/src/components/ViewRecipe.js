import React, { useState, useEffect, useContext } from 'react';
import {useParams} from 'react-router-dom';
import MealType from './RecipeMealType';
import GetPerson from './Person';
import GetFeedback from './RecipeFeedback';

import AuthContext from './AuthContext';
import GetRating from './RecipeRating';

function ViewRecipe() {
  const [recipe, setRecipe] = useState('');
  const [Feedbacks, setFeedback] = useState([]);
  const {id} = useParams();

  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(1);
  const [recipeRating, setRecipeRating] = useState(0);
  const [recipeId, setRecipeId] = useState(0);
  const feedbackId = 0;
  const auth = useContext(AuthContext);
  const userId = 2; //may need separate fetch call here

  
  useEffect(() => {
    const getRecipe = () => {
      fetch(`http://localhost:8080/recipe/${id}`)
        .then(response => response.json())
        .then(data => {
          console.log("heyooo");
          setRecipe(data);
        });
    };
    const getFeedback = () => {
      fetch(`http://localhost:8080/feedback/${id}`)
        .then(response => response.json())
        .then(data => {
          console.log("heyoo");
          setFeedback(data);
        })
    }
    const getRecipeRating = () => {
      fetch(`http://localhost:8080/feedback/rating/${id}`)
      .then(response => response.json())
      .then(data => {
          console.log("heyo");
          setRecipeRating(data);
      })
  };
    getRecipeRating();
    getRecipe();
    getFeedback();
    setRecipeId(id);
  }, [id]);

  const pageUpdate = () => {
    const getRecipe = () => {
      fetch(`http://localhost:8080/recipe/${id}`)
        .then(response => response.json())
        .then(data => {
          console.log("heyooo!");
          setRecipe(data);
        })
    }

    const getFeedback = () => {
      fetch(`http://localhost:8080/feedback/${id}`)
        .then(response => response.json())
        .then(data => {
          console.log("heyoo!");
          setFeedback(data);
        })
    }

    const getRecipeRating = () => {
      fetch(`http://localhost:8080/feedback/rating/${id}`)
      .then(response => response.json())
      .then(data => {
          console.log("heyo!");
          setRecipeRating(data);
      })
  };
    getRecipeRating();
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
        userId
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

  return (
    <>
      <h2>{recipe.recipeName}</h2>

      <table className="table table-dark table-striped table-hover">
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
                <td><GetRating id={recipe.recipeId} /></td>
                <GetPerson id={recipe.userId} />
                <MealType recipe={recipe} />
            </tr>
        </tbody>
      </table>

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
