// src/pages/MessageEditPage.js
import React, { useState } from 'react';
import styled from 'styled-components';

const MessageEditPage = () => {
  const [message, setMessage] = useState('This is a sample message that you can edit.');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Message saved: ' + message);
  };

  return (
    <EditContainer>
      <h1>Edit Message</h1>
      <form onSubmit={handleSubmit}>
        <textarea value={message} onChange={handleChange} />
        <Button type="submit">Save Message</Button>
      </form>
    </EditContainer>
  );
};

const EditContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  textarea {
    width: 80%;
    height: 100px;
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export default MessageEditPage;
