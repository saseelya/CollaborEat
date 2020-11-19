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
      fetch(`${process.env.REACT_APP_API_URL}/user/${id}`)
        .then(response => response.json())
        .then(data => {
          setUser(data);
        });
    };
    const getRecipe = () => {
      fetch(`${process.env.REACT_APP_API_URL}/recipe/user/${id}`)
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
      <div>
      <h2 className="text-center text-dark silver-black-gradient">Recipes Submitted by {user.firstName} {user.lastName}
      {auth.appUser && (auth.appUser.userId === user.userId || auth.appUser.hasRole("ROLE_ADMIN")) && (
            <div className="text-right">
              {auth.appUser && (auth.appUser.userId === user.userId) && (
             <Link to="/recipe/add" className="mr-sm-4 btn btn-primary">Add a Recipe</Link>
        )}
              <Link to={"/user/edit/" + user.userId} className="mr-sm-4 btn btn-warning">Edit Info</Link>
              <Link to={"/user/delete/" + user.userId} className="btn btn-danger">Close Account</Link>  
            </div>
        )}
      </h2>
        {Recipes.length === 0 ? (
          <p><center>{user.firstName} has not created any Recipes on CollaborEat yet.</center></p>
        ) : (
        <div className="row">
        {Recipes.map(recipe => (
          <Card key={recipe.recipeId} recipe={recipe} />
        ))}
        </div>)}
      </div>
    </>
  );
}