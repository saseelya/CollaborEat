import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
        <div className="card" key={recipe.recipeId}>
        <img className="card-img-top" url=""/>
        <div className="card-body">
            <h4 className="card-title"><a href={'/recipe/' + recipe.recipeId}>{recipe.recipeName}</a></h4> 
            <p className="card-text">
            Created By: 
            <Link to={"/user/" + recipe.userId}>{user.firstName} {user.lastName}</Link>
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
    </>
  );
}