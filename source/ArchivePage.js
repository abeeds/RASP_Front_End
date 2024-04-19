// src/pages/ArchivePage.js
import React from 'react';
import styled from 'styled-components';

const ArchivePage = () => {
  // Dummy data for archived items
  const archives = [
    { id: 1, type: 'Message', content: 'End of year report', date: '2023-01-05' },
    { id: 2, type: 'File', content: 'Budget.xlsx', date: '2023-02-12' },
    // Add more archived items here
  ];

  return (
    <ArchiveContainer>
      <h1>Archived Items</h1>
      <ArchiveList>
        {archives.map((archive) => (
          <li key={archive.id}>
            <strong>{archive.type}:</strong> {archive.content} - <em>{archive.date}</em>
          </li>
        ))}
      </ArchiveList>
    </ArchiveContainer>
  );
};

const ArchiveContainer = styled.div`
  padding: 20px;
`;

const ArchiveList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    background-color: #f0f0f0;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    transition: background-color 0.2s;

    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

export default ArchivePage;
