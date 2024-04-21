// src/pages/FeedbackPage.js
import React, { useState } from 'react';
import styled from 'styled-components';

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Feedback submitted: ' + feedback);
    setFeedback(''); // Clear feedback after submission
  };

  return (
    <FeedbackContainer>
      <h1>Feedback</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedback}
          onChange={handleFeedbackChange}
          placeholder="Enter your feedback here..."
          required
        ></textarea>
        <button type="submit">Submit Feedback</button>
      </form>
    </FeedbackContainer>
  );
};

const FeedbackContainer = styled.div`
  padding: 20px;

  form {
    display: flex;
    flex-direction: column;
  }

  textarea {
    height: 100px;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #218838;
    }
  }
`;

export default FeedbackPage;
