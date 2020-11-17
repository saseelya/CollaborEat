import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from './components/Card';

import AuthContext from './components/AuthContext';


export default function User() {
  const [user, setUser] = useState('');
  const [Recipes, setRecipe] = useState([]);
  const {id} = useParams();

  const auth = useContext(AuthContext);


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
      {auth.appUser && (auth.appUser.userId === user.userId || auth.appUser.hasRole("ROLE_ADMIN")) && (
          <div className="col">
            <Link to={"/user/edit/" + user.userId} className="btn btn-warning">Edit Info</Link>
            <Link to={"/user/delete/" + user.userId} className="btn btn-danger">Close Account</Link>  
          </div>
      )}
      <div>
      <h2>Submitted Recipes</h2>
      <div className="row">
              {Recipes.map(recipe => (
                <Card key={recipe.recipeId} recipe={recipe} />
              ))}
        </div>
      </div>
    </>
  );
}