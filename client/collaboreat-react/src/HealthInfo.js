import React, { useState, useEffect } from 'react';

export default function HealthInfo() {
  const [healthInfos, setHealthInfo] = useState([]);

  const getHealthInfo = () => {
    fetch(`${process.env.REACT_APP_API_URL}/healthInfo`)
      .then(response => response.json())
      .then(data => {
        setHealthInfo(data);
      });
  };

  useEffect(() => {
    getHealthInfo();
  }, []);

  return (
    <>
      <h2>Health Info</h2>

      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Health Info Id</th>
            <th scope="col">Health Info Name</th>
          </tr>
        </thead>
        <tbody>
          {healthInfos.map(healthInfo => (
            <tr key={healthInfo.healthInfoId}>
              <td>{healthInfo.healthInfoId}</td>
              <td>{healthInfo.healthInfoName}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}