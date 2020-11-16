import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import GetPerson from './Person';

export default function GetFeedback({ feedback, pageUpdate }) {
  const history = useHistory();

  const handleDeleteSubmit = (event) => {
    fetch(`http://localhost:8080/feedback/${feedback.feedbackId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then (response => {
      if (response.status === 204) {
        console.log('Success!');
        pageUpdate();
    } else if (response.status === 400) {
        console.log('Errors!');
        response.json().then(data => {
        console.log(data);
        });
    } else {
        console.log('Oops... not sure what happened here :(');
    }
    })
  }

  return (
    <>
    <tr key={feedback.feedbackId}>
        <GetPerson id={feedback.userId} />
        <td>{feedback.feedbackComment}</td>
        <td>{feedback.feedbackRating} / 5</td>
        <td><button type="submit" onClick={(event) => handleDeleteSubmit(event)}>Delete</button></td>
    </tr>
    </>
  );
}