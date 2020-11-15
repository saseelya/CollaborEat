import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import MealType from './RecipeMealType';
import GetPerson from './Person';
import GetFeedback from './RecipeFeedback';
import GetRating from './RecipeRating';

function ViewRecipe() {
  const [recipe, setRecipe] = useState('');
  const [Feedbacks, setFeedback] = useState([]);
  const {id} = useParams();

  
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
  }, [id]);

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
                <GetRating id={recipe.recipeId} />
                <GetPerson id={recipe.userId} />
                <MealType recipe={recipe} />
            </tr>
        </tbody>
      </table>

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
            <GetFeedback feedback={feedback} />
          )}
        </tbody>
      </table>
    </>
  );
}

export default ViewRecipe;
