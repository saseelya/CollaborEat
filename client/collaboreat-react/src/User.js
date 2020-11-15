import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';


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
        <Link to={"/user/edit/" + user.userId} type="button">Edit Info</Link>
      </div>
      <div>
        <Link to={"/user/delete/" + user.userId} type="button">Close Account</Link>  
      </div>
      <div>
      <h2>Submitted Recipes</h2>
      <div className="row">
              {Recipes.map(recipe => (
                <div className="col">
                <div className="card" key={recipe.recipeId}>
                  <img className="card-img-top" url=""/>
                  <div className="card-body">
                    <h4 className="card-title"><a href={'/recipe/' + recipe.recipeId}>{recipe.recipeName}</a></h4> 
                    <p className="card-text">
                      Created By: {recipe.userId}
                    </p>
                    <p className="card-text">
                      Uploaded On: {recipe.recipeDate}
                    </p>
                    <p className="card-text">
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