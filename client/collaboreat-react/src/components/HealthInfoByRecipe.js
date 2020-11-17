import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';

export default function HealthInfo({ healthInfo }) {
  // const [HealthInfos, setHealthInfo] = useState([]);
  // const {id} = useParams();
  // const [healthInfoId, setHealthInfoId] = useState(0);
  // const [healthInfoName, setHealthInfoName] = useState(0);

  // useEffect(() => {
  //   const getHealthInfo = () => {
  //     fetch(`http://localhost:8080/healthInfo/${healthInfo.healthInfoId}`)
  //       .then(response => response.json())
  //       .then(data => {
  //         setHealthInfo(data);
  //       });
  //   };
  //   getHealthInfo();
  // }, [healthInfo]);

  return (
    <>
      <li>{healthInfo.healthInfoName}</li>
    </>
  );
}