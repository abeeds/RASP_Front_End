// src/pages/UserDirectoryPage.js
import React from 'react';
import styled from 'styled-components';

const UserDirectoryPage = () => {
  // Dummy data for users
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    // Add more users here
  ];

  return (
    <DirectoryContainer>
      <h1>User Directory</h1>
      <UserList>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </UserList>
    </DirectoryContainer>
  );
};

const DirectoryContainer = styled.div`
  /* Add styles here */
`;

const UserList = styled.ul`
  /* Add styles here */
`;

export default UserDirectoryPage;
