import React, { useState, useEffect } from 'react';

export default function GetPerson({ id }) {
  const [person, setPerson] = useState('');

  useEffect(() => {
    const getPerson = () => {
      fetch(`http://localhost:8080/user/${id}`)
        .then(response => response.json())
        .then(data => {
          setPerson(data);
        });
    };
    getPerson();
  }, [id]);

  return (
      <div>{person.firstName} {person.lastName}</div>
  );
}