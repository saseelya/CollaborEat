import React, { useState, useEffect } from 'react';

export default function Feedback() {
  const [Feedbacks, setFeedback] = useState([]);

  const getFeedbacks = () => {
    fetch('http://localhost:8080/feedback')
      .then(response => response.json())
      .then(data => {
        setFeedback(data);
      });
  };

  useEffect(() => {
    getFeedbacks();
  }, []);

  return (
    <>
      <h2>Feedback</h2>

      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Feedback Id</th>
            <th scope="col">Feedback</th>
            <th scope="col">Feedback Rating</th>
            <th scope="col">recipeId</th>
            <th scope="col">userId</th>
          </tr>
        </thead>
        <tbody>
          {Feedbacks.map(feedback => (
            <tr key={feedback.feedbackId}>
                <td>{feedback.feedbackId}</td> 
                <td>{feedback.feedbackComment}</td>
                <td>{feedback.feedbackRating}</td>
                <td>{feedback.recipeId}</td>
                <td>{feedback.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}