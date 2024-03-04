// src/pages/ProfilePage.js
import React from 'react';
import UserProfile from '../components/UserProfile';
import Settings from '../components/Settings';
import styled from 'styled-components';

const ProfilePage = () => {
  return (
    <PageContainer>
      <UserProfile />
      <Settings />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Add more styles here */
`;

export default ProfilePage;
