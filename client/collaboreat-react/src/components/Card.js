import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import GetRating from './RecipeRating';

export default function Card({ recipe }) {
  const [user, setUser] = useState('');

  useEffect(() => {
    const getUser = () => {
        fetch(`http://localhost:8080/user/${recipe.userId}`)
        .then(response => response.json())
        .then(data => {
          setUser(data);
        });
      }
    getUser();
  }, [recipe.userId]);

  return (
    <>
    <div className="col">
        <div className="card text-white bg-info mb-3 border-dark" key={recipe.recipeId} style={{ width:"18rem" }}>
        <Link to={'/recipe/' + recipe.recipeId}><img className="card-img-top" src={recipe.imageUrl} alt="food" height="180" width="180"/></Link>
          <div className="card-body text-dark">
              <h4 className="card-title"><Link to={'/recipe/' + recipe.recipeId}>{recipe.recipeName}</Link></h4> 
              <p className="card-text">
              Created By:&nbsp;
              <Link to={"/user/" + recipe.userId}>{user.firstName} {user.lastName}</Link>
              </p>
              <p className="card-text">
              Uploaded On: {recipe.recipeDate}
              </p>
              <p className="card-text">
              Rating: <GetRating recipe={recipe}/>
              </p> 
              <div class="card-body">
                <Link to={"/recipe/edit/" + recipe.recipeId} className="btn">Edit</Link>
                <Link to={"/recipe/delete/" + recipe.recipeId} className="btn">Delete</Link>
                </div>
          </div>
        </div>
    </div>
    </>
  );
}