// import React, { useState, useEffect } from 'react';

// import HealthInfo from './HealthInfo';

// export default function RecipeHealthInfo({ recipe }) {
//   const [RecipeHealthInfo, setRecipeHealthInfo] = useState([]);
//   const [HealthInfoObj, setHealthInfoObj] = useState(null);
  
//   const getRecipeHealthInfo = () => {
//     fetch(`http://localhost:8080/recipe/healthInfo/${recipe.recipeId}`)
//       .then(response => response.json())
//       .then(data => {
//         setRecipeHealthInfo(data);
//       });
//     }

//   useEffect(() => {
//     getRecipeHealthInfo();
//   }, []);

//   return (
//     <>
//       {RecipeHealthInfo.map(recipeHealthInfo => (
        
//         <HealthInfo key={recipeHealthInfo.recipeId} Info={HealthInfoObj} />
//     ))}
//     </>
//   );
// }