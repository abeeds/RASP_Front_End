// src/pages/UserListPage.js
import React from 'react';
import styled from 'styled-components';

const UserListPage = () => {
  // Dummy data for user list
  const users = [
    { id: 1, name: 'John Doe', role: 'Developer' },
    { id: 2, name: 'Jane Smith', role: 'Designer' },
    // Add more users here
  ];

  return (
    <UserListContainer>
      <h1>User List</h1>
      <UserTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </UserTable>
    </UserListContainer>
  );
};

const UserListContainer = styled.div`
  padding: 20px;
`;

const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
  }
`;

export default UserListPage;
