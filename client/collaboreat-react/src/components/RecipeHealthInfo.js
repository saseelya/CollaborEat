import React, { useState, useEffect } from 'react';

import HealthInfo from './HealthInfoByRecipe';

export default function RecipeHealthInfo({ recipe }) {
  const [recipeHealthInfo, setRecipeHealthInfo] = useState([]);
  
  const getRecipeHealthInfo = () => {
    fetch(`http://localhost:8080/recipe/healthInfo/${recipe.recipeId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setRecipeHealthInfo(data);
      });
    }

  useEffect(() => {
    getRecipeHealthInfo();
  }, []);

  return (
    <>
      {recipeHealthInfo.map(rhi => (
        <ul>
          <HealthInfo key={rhi.recipeId} healthInfo={rhi.healthInfo} />
        </ul>
    ))}
    </>
  );
}