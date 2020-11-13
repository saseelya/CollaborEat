import React, { useState, useEffect } from 'react';

export default function MealType() {
  const [MealType, setMealType] = useState([]);

  const getMealType = () => {
    fetch('http://localhost:8080/mealType')
      .then(response => response.json())
      .then(data => {
        setMealType(data);
      });
  };

  useEffect(() => {
    getMealType();
  }, []);

  return (
    <>
      <h2>MealType</h2>

      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">MealType ID</th>
            <th scope="col">MealType</th>
          </tr>
        </thead>
        <tbody>
          {MealType.map(mealType => (
            <tr key={mealType.mealTypeId}>
                <td>{mealType.mealTypeId}</td> 
                <td>{mealType.mealTypeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}