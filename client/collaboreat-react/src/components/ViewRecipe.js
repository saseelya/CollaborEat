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
      fetch(`${process.env.REACT_APP_API_URL}/recipe/${id}`)
        .then(response => response.json())
        .then(data => {
          setRecipe(data);
        });
    };
    const getFeedback = () => {
      fetch(`${process.env.REACT_APP_API_URL}/feedback/${id}`)
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
      fetch(`${process.env.REACT_APP_API_URL}/recipe/${id}`)
        .then(response => response.json())
        .then(data => {
          setRecipe(data);
        })
    }

    const getFeedback = () => {
      fetch(`${process.env.REACT_APP_API_URL}/feedback/${id}`)
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

    fetch(`${process.env.REACT_APP_API_URL}/feedback/add`, {
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
                    url={`http://collaboreat.s3.us-east-2.amazonaws.com/index.html#/recipe/${recipe.recipeId}`}
                    quote={"Check out this recipe from CollaborEat! Here's what's cookin': "}
                    hashtag="#collaboreat">
                    <FacebookIcon size={36} />
                  </FacebookShareButton>  
                  <TwitterShareButton 
                    url={`http://collaboreat.s3.us-east-2.amazonaws.com/index.html#/recipe/${recipe.recipeId}`}
                    quote={"Check out this recipe from CollaborEat! Here's what's cookin': "}
                    hashtag="#collaboreat">
                    <TwitterIcon size={36} />
                  </TwitterShareButton>     
                  <PinterestShareButton 
                    url={`http://collaboreat.s3.us-east-2.amazonaws.com/index.html#/recipe/${recipe.recipeId}`}
                    quote={"Check out this recipe from CollaborEat! Here's what's cookin': "}
                    hashtag="#collaboreat">
                    <PinterestIcon size={36} />
                  </PinterestShareButton>            
                  <EmailShareButton 
                    url={`http://collaboreat.s3.us-east-2.amazonaws.com/index.html#/recipe/${recipe.recipeId}`}
                    quote={"Check out this recipe from CollaborEat! Here's what's cookin': "}
                    hashtag="#collaboreat">{/* Smell what's cookin! what's in the kitchey?? a human FINGER */}
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
        <ul className="rounded-unordered-list steps">
          {recipe.recipeIngredients.split('\n').map((item, i) => <li className="steps-item" key={i}>{item}</li>)}
        </ul>
      </div>
      <div className="container">
        <h4>The Steps</h4>
        <ol className="rounded-ordered-list steps">
          {recipe.recipeSteps.split('\n').map((item, i) => <li className="steps-item" key={i}>{item}</li>)}
        </ol>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">Meal Type: <Link to={"/recipe/mealType/all/" + recipe.mealTypeId}><MealType recipe={recipe} /></Link></div>
  <div className="col">Health Info: {<RecipeHealthInfo recipe={recipe}/>}</div>
        </div>
      </div>
      <p></p>
      <p></p>
      {auth.appUser && (
      <form className="text-center" onSubmit={handleAddSubmit}>
        <div>
          <label htmlFor="feedbackComment">Comment: </label>
          <textarea className="form-control col-32" rows="4" id="feedbackComment" value={feedbackComment} 
            onChange={(event) => setFeedbackComment(event.target.value)} type="text" placeholder="Enter your comment!" />
          <label htmlFor="feedbackRating"><center>Select a rating:</center></label>
          <select class="custom-select" id="feedbackRating" value={feedbackRating} 
            onChange={(event) => setFeedbackRating(event.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <div className="text-right">
        <button className="btn btn-primary" type="submit">Add Comment</button>
        </div>
        </div>
      </form>
      )};
      <center>
      <h2 className="silver-black-gradient">Feedback</h2>
      </center>
      <Errors errors={errors} />

      <table className="table table-light table-striped table-hover">
        <thead class="thead-dark">
          <tr>
            <th scope="col" className="text-left">User</th>
            <th scope="col" className="text-left">Feedback</th>
            <th scope="col" className="text-right">Feedback Rating</th>
            <th scope="col">&nbsp;</th>
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
