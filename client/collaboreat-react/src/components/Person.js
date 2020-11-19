import React, { useState, useEffect } from 'react';

export default function GetPerson({ id }) {
  const [person, setPerson] = useState(null);

  useEffect(() => {
    const getPerson = () => {
      fetch(`${process.env.REACT_APP_API_URL}/user/${id}`)
        .then(response => response.json())
        .then(data => {
          setPerson(data);
        });
    };
    if (id) {
      getPerson();
    }
  }, [id]);

  if (!person) { return null; }
  return (
      <>{person.firstName} {person.lastName}</>
  );
  
}