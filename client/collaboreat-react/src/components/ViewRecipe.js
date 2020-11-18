import React, { useState, useEffect, useContext } from 'react';
import {useParams, Link} from 'react-router-dom';
import { EmailShareButton, TwitterShareButton, FacebookShareButton, PinterestShareButton, PinterestIcon, EmailIcon, TwitterIcon, FacebookIcon, } from 'react-share';

import MealType from './RecipeMealType';
import GetPerson from './Person';
import GetFeedback from './RecipeFeedback';
import RecipeHealthInfo from './RecipeHealthInfo';
import Errors from './Errors';

import AuthContext from './AuthContext';
import GetRating from './RecipeRating';

function ViewRecipe() {
  const [recipe, setRecipe] = useState(null);
  const [Feedbacks, setFeedback] = useState([]);
  const {id} = useParams();
  const [errors, setErrors] = useState([]);
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
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + auth.appUser.token
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
          setErrors([data]);
        });
    } else {
        console.log('Oops... not sure what happened here :(');
        setErrors(['Oops... not sure what happened here :(']);
      }
    })
  }

  if (!recipe) {
    return null;
  }

  return (
    <>
    <center>
      <table class="table table-lg">
          <div className="container">
            <div className="row">
              <div className="col">
                <tr><h1>{recipe.recipeName}</h1></tr>
               <hr></hr>
                <tr>
                <FacebookShareButton 
                    url={`google.com`}
                    quote={"Check out this recipe from CollaborEat! Here's what's cookin': "}
                    hashtag="#collaboreat">
                    <FacebookIcon size={36} />
                  </FacebookShareButton>  
                  <TwitterShareButton 
                    url={`google.com`}
                    quote={"Check out this recipe from CollaborEat! Here's what's cookin': "}
                    hashtag="#collaboreat">
                    <TwitterIcon size={36} />
                  </TwitterShareButton>     
                  <PinterestShareButton 
                    url={`google.com`}
                    quote={"Check out this recipe from CollaborEat! Here's what's cookin': "}
                    hashtag="#collaboreat">
                    <PinterestIcon size={36} />
                  </PinterestShareButton>            
                  <EmailShareButton 
                    url={`google.com`}
                    quote={"Check out this recipe from CollaborEat! Here's what's cookin': "}
                    hashtag="#collaboreat">
                    <EmailIcon size={36} />
                  </EmailShareButton> 
                  <p></p>    
                </tr>
                <tr>
                <p>Date Added: {recipe.recipeDate}</p>
                </tr>
                <tr>
                <p>Added By: <Link to={"/user/" + recipe.userId}><GetPerson id={recipe.userId} /></Link></p>
                </tr>
                <tr>
                <p>Cook Time: {recipe.recipeCookTime} Minutes</p>
                </tr>
                <tr>
                <p>Rating: {<GetRating recipe={recipe}/>}</p>
                </tr>
              </div>
            <div class="crop-view">
              <img src={recipe.imageUrl} alt="food" class="border border-secondary" style={{ width:"18rem", height:"18rem" }}/>
            </div>
          </div>
          </div>
          </table>
          <hr></hr>
          </center>
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
        <ul className="rounded-unordered-list">
          {recipe.recipeIngredients.split('\n').map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
      <div className="container">
        <h4>The Steps</h4>
        <ol className="rounded-ordered-list">
          {recipe.recipeSteps.split('\n').map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">Meal Type: <Link to={"/recipe/mealType/" + recipe.mealTypeId}><MealType recipe={recipe} /></Link></div>
          <div className="col">Health Info: <RecipeHealthInfo recipe={recipe} /></div>
        </div>
      </div>

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
      <Errors errors={errors} />

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
