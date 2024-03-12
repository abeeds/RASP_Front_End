// src/pages/HelpPage.js
import React from 'react';
import styled from 'styled-components';

const HelpPage = () => {
  return (
    <HelpContainer>
      <h1>Help & Support</h1>
      <p>Find answers to common questions or get in touch with our support team.</p>
      <h2>FAQs</h2>
      <ul>
        <li>How do I reset my password?</li>
        <li>How can I change my notification settings?</li>
        {/* Add more FAQs here */}
      </ul>
      <h2>Contact Support</h2>
    </HelpContainer>
  );
};

const HelpContainer = styled.div`
  /* Add styles here */
`;

export default HelpPage;
