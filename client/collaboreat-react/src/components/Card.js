import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import GetRating from './RecipeRating';
import AuthContext from './AuthContext';

export default function Card({ recipe }) {
  const [user, setUser] = useState('');
  const auth = useContext(AuthContext);

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
        <div className="card text-white bg-light mb-3 border-dark text-center" key={recipe.recipeId} style={{ width:"18rem" }}>
        <div class="card-header text-dark">
              <h4 className="card-title text-dark center"><Link to={'/recipe/' + recipe.recipeId}>{recipe.recipeName}</Link></h4> 
            </div>
        <Link to={'/recipe/' + recipe.recipeId}><img className="card-img-top" src={recipe.imageUrl} alt="food" height="180" width="180"/></Link>
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
          {auth.appUser && (auth.appUser.userId === user.userId || auth.appUser.hasRole("ROLE_ADMIN")) && (
            <div class="card-footer">
                <h3><Link to={"/recipe/edit/" + recipe.recipeId} class="badge badge-primary text-light">Edit</Link>
                <Link to={"/recipe/delete/" + recipe.recipeId} class="badge badge-danger text-light">Delete</Link></h3>
            </div>
          )}
        </div>
    </div>
    </>
  );
}