import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserRecipes from './components/UserRecipes';
import EditUser from './EditUser';

export default function User() {
  const [user, setUser] = useState('');
  const [Recipes, setRecipe] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    const getUser = () => {
      fetch(`http://localhost:8080/user/${id}`)
        .then(response => response.json())
        .then(data => {
          setUser(data);
        });
    };
    const getRecipe = () => {
      fetch(`http://localhost:8080/recipe/user/${id}`)
        .then(response => response.json())
        .then(data => {
          setRecipe(data);
        });
    };
    getUser();
    getRecipe();
  }, [id]);

  return (
    <>
      <h1>{user.firstName} {user.lastName}</h1>
      <div>
        <p>Email: {user.email}</p>
      </div>
      <div>
        <Link to={"user/edit/" + user.userId} type="button">Edit Info</Link>  
      </div>
      <div>
      <h2>Submitted Recipes</h2>
      <div class="row">
              {Recipes.map(recipe => (
                <div class="col">
                <div class="card" key={recipe.recipeId}>
                  <img class="card-img-top" url=""/>
                  <div class="card-body">
                    <h4 class="card-title"><a href={'/recipe/' + recipe.recipeId}>{recipe.recipeName}</a></h4> 
                    <p class="card-text">
                      Created By: {recipe.userId}
                    </p>
                    <p class="card-text">
                      Uploaded On: {recipe.recipeDate}
                    </p>
                    <p class="card-text">
                      Rating: {recipe.recipeRating}
                    </p> 
                  </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
      
    </>
  );
}