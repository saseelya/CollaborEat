import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import GetPerson from './Person';

export default function GetFeedback({ feedback }) {
  const history = useHistory();

  const handleDeleteSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:8080/feedback/${feedback.feedbackId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then (response => {
      if (response.status === 204) {
        console.log('Success!');
        // const getFeedback = () => {
        //   fetch(`http://localhost:8080/feedback/${feedback.recipeId}`)
        //     .then(response => response.json())
        //     .then(data => {
        //       setFeedback(data);
        //     })
        // };
        // getFeedback();
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
        <td><button type="submit" onClick={(event) => handleDeleteSubmit(event)}></button></td>
        <td><Link to={"/recipe/" + feedback.recipeId}>Delete</Link></td>
    </tr>
    </>
  );
}