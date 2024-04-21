// src/pages/ApiIntegrationPage.js
import React from 'react';
import styled from 'styled-components';

const ApiIntegrationPage = () => {
  // Dummy data for API integrations
  const apis = [
    { id: 1, name: 'Google Drive', status: 'Connected' },
    { id: 2, name: 'GitHub', status: 'Not Connected' },
    // Add more API integrations here
  ];

  return (
    <ApiContainer>
      <h1>API Integrations</h1>
      <ApiList>
        {apis.map((api) => (
          <li key={api.id}>
            <strong>{api.name}</strong>
            <span>{api.status}</span>
            <button>Manage</button>
          </li>
        ))}
      </ApiList>
    </ApiContainer>
  );
};

const ApiContainer = styled.div`
  padding: 20px;
`;

const ApiList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f0f0f0;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }

  button {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export default ApiIntegrationPage;
