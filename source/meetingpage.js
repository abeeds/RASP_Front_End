// src/pages/MeetingPage.js
import React from 'react';
import styled from 'styled-components';

const MeetingPage = () => {
  return (
    <MeetingContainer>
      <h1>Meeting Room</h1>
      <VideoContainer>
        {/* Placeholder for video call interface */}
        <div className="video-placeholder">Video Call Interface</div>
      </VideoContainer>
      <ChatContainer>
        <h2>Chat</h2>
        {/* Placeholder for chat interface */}
        <div className="chat-placeholder">Chat Interface</div>
      </ChatContainer>
    </MeetingContainer>
  );
};

const MeetingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const VideoContainer = styled.div`
  width: 80%;
  height: 400px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  .video-placeholder {
    font-size: 24px;
    color: #666;
  }
`;

const ChatContainer = styled.div`
  width: 80%;
  background-color: #f9f9f9;
  padding: 10px;

  .chat-placeholder {
    font-size: 18px;
    color: #666;
  }
`;

export default MeetingPage;
