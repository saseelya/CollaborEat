import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';

export default function RecipeCards() {
  const [Recipes, setRecipe] = useState([]);
  const [user, setUser] = useState('');

  const getRecipe = () => {
    fetch('http://localhost:8080/recipe')
      .then(response => response.json())
      .then(data => {
        setRecipe(data);
      });
  };
  
  useEffect(() => {
    getRecipe();
  }, []);

  const getUser = (id) => {
    fetch(`http://localhost:8080/user/${id}`)
    .then(response => response.json())
    .then(data => {
      setUser(data);
    });
  }

  return (
    <>
      <h2>Recipes</h2>
      <div className="row">
              {Recipes.map(recipe => (
                <Card recipe={recipe} />
              ))}
        </div>
    </>
  );
}