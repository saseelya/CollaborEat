import React, { useState, useEffect } from 'react';

export default function GetPerson({ id }) {
  const [person, setPerson] = useState(null);

  useEffect(() => {
    const getPerson = () => {
      fetch(`http://localhost:8080/user/${id}`)
        .then(response => response.json())
        .then(data => {
          setPerson(data);
        });
    };
    if (id) {
      getPerson();
    }
  }, [id]);

  if (!person) { return <td></td>; }
  return (
      <td>{person.firstName} {person.lastName}</td>
  );
  
}