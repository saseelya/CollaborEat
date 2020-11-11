import React, { useState, useEffect } from 'react';

export default function HealthInfo() {
  const [healthInfos, setHealthInfo] = useState([]);

  const getHealthInfo = () => {
    fetch('http://localhost:8080/healthInfo')
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
          </tr>
        </thead>
        <tbody>
          {healthInfos.map(healthInfo => (
            <tr key={healthInfo.healthInfoId}>
              <td>{healthInfo.healthInfoName}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}