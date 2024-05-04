// src/pages/HomePage.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <HomeContainer>
      <h1>Welcome to RASP</h1>
      <ButtonContainer>
        <Link to="/users"><Button>Go to User List</Button></Link>
        <Link to="/edit-message"><Button>Go to Message Edit</Button></Link>
      </ButtonContainer>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: #0056b3;
  }
`;

export default HomePage;
