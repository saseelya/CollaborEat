import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import GetRating from './RecipeRating';
import AuthContext from './AuthContext';

export default function Card({ recipe }) {
  const [user, setUser] = useState('');
  const auth = useContext(AuthContext);

  useEffect(() => {
    const getUser = () => {
        fetch(`${process.env.REACT_APP_API_URL}/user/${recipe.userId}`)
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
        <div className="card text-white bg-light mb-3 border-dark text-center" key={recipe.recipeId} style={{ width:"18rem", height:"31rem" }}>
        <div class="card-header text-dark">
              <center><h4 className="text-center card-title text-dark" style={{ height:"3rem"}}><Link to={'/recipe/' + recipe.recipeId}>{recipe.recipeName}</Link></h4></center>
            </div>
        <Link to={'/recipe/' + recipe.recipeId}><img className="card-img-top crop-card" src={recipe.imageUrl} alt="food" height="180" width="180"/></Link>
          <div className="card-body text-dark">
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
          </div>
          <div class="card-footer">
          {auth.appUser && (auth.appUser.userId === user.userId || auth.appUser.hasRole("ROLE_ADMIN")) && (
                <h3><Link to={"/recipe/edit/" + recipe.recipeId} class="badge badge-primary text-light">Edit</Link>
                <Link to={"/recipe/delete/" + recipe.recipeId} class="badge badge-danger text-light">Delete</Link></h3>
          )}
          {!(auth.appUser && (auth.appUser.userId === user.userId || auth.appUser.hasRole("ROLE_ADMIN"))) && (
              <h3>&nbsp;</h3>
          )}
          </div>
        </div>
    </div>
    </>
  );
}