// src/pages/SearchResultsPage.js
import React from 'react';
import styled from 'styled-components';

const SearchResultsPage = () => {
  // Dummy data for search results
  const results = [
    { id: 1, title: 'How to reset your password', content: 'To reset your password, go to the settings page...' },
    { id: 2, title: 'Changing notification settings', content: 'You can change your notification settings by...' },
    // Add more search results here
  ];

  return (
    <ResultsContainer>
      <h1>Search Results</h1>
      <ResultsList>
        {results.map((result) => (
          <li key={result.id}>
            <h3>{result.title}</h3>
            <p>{result.content}</p>
          </li>
        ))}
      </ResultsList>
    </ResultsContainer>
  );
};

const ResultsContainer = styled.div`
  padding: 20px;
`;

const ResultsList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 20px;
    background-color: #f0f0f0;
    padding: 15px;
    border-radius: 5px;
  }

  h3 {
    margin-top: 0;
    color: #2c3e50;
  }

  p {
    color: #34495e;
  }
`;

export default SearchResultsPage;
