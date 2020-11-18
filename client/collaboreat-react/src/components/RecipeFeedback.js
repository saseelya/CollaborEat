import React, { useContext } from 'react';

import GetPerson from './Person';
import AuthContext from './AuthContext';

export default function GetFeedback({ feedback, pageUpdate }) {
  const auth = useContext(AuthContext);

  const handleDeleteSubmit = (event) => {
    fetch(`http://localhost:8080/feedback/${feedback.feedbackId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + auth.appUser.token
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
        <td><GetPerson id={feedback.userId} /></td>
        <td>{feedback.feedbackComment.split('\n').map((item, i) => <p key={i}>{item}</p>)}</td>
        <td class="text-right">{feedback.feedbackRating} / 5</td>
        <td class="text-right">
        {auth.appUser && (auth.appUser.userId === feedback.userId || auth.appUser.hasRole("ROLE_ADMIN")) && (
        <button className="btn btn-success" type="submit" onClick={(event) => handleDeleteSubmit(event)}>Delete</button>
        )}
        </td>
    </tr>
    </>
  );
}