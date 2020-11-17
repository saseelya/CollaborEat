// import React, { useState, useEffect } from 'react';



// export default function HealthInfo({ Info }) {
//     const [HealthInfo, setHealthInfo] = useState(null);
    
//     useEffect(() => {
//             const getHealthInfo = () => {
//               fetch(`http://localhost:8080/healthInfo/${Info.healthInfoId}`)
//                 .then(response => response.json())
//                 .then(data => {
//                   setHealthInfo(data);
//                   console.log(data);
//                 });
//             };
//             if (Info) {
//                 getHealthInfo();
//             }
//           }, [Info]);


//     if (!HealthInfo) {
//         return (<></>)
//     }
//   return (
//     <>
//     {console.log(HealthInfo.healthInfoName)}
//     {HealthInfo.healthInfoName}
//     </>  
      
//   );
// }