import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';

export default function HealthInfo() {
  const [HealthInfos, setHealthInfo] = useState([]);
  const {id} = useParams();
  const [healthInfoId, setHealthInfoId] = useState(0);
  const [healthInfoName, setHealthInfoName] = useState(0);

  useEffect(() => {
    const getHealthInfo = () => {
      fetch(`http://localhost:8080/healthInfo/${id}`)
        .then(response => response.json())
        .then(data => {
          setHealthInfo(data);
        });
    };
    getHealthInfo();
  }, [id]);

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
          {HealthInfos.map(healthInfo => (
            <tr key={healthInfo.healthInfoId}>
              <td>{healthInfo.healthInfoName}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}