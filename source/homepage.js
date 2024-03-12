import React from 'react';
import ChannelList from '../components/ChannelList';
import Chat from '../components/Chat';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';

const HomePage = () => {
  return (
    <HomeContainer>
      <Sidebar />
      <ChannelList />
      <Chat />
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
`;

export default HomePage;
