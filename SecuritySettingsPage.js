// src/pages/SecuritySettingsPage.js
import React from 'react';
import styled from 'styled-components';

const SecuritySettingsPage = () => {
  return (
    <SettingsContainer>
      <h1>Security Settings</h1>
      <SettingsForm>
        <FormGroup>
          <label htmlFor="twoFactor">Enable Two-Factor Authentication:</label>
          <input type="checkbox" id="twoFactor" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="sessionTimeout">Session Timeout (minutes):</label>
          <input type="number" id="sessionTimeout" defaultValue={60} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="passwordPolicy">Password Policy:</label>
          <select id="passwordPolicy">
            <option value="low">Low</option>
            <option value="medium" selected>Medium</option>
            <option value="high">High</option>
          </select>
        </FormGroup>
        <Button>Save Changes</Button>
      </SettingsForm>
    </SettingsContainer>
  );
};

const SettingsContainer = styled.div`
  padding: 20px;
`;

const SettingsForm = styled.form`
  margin-top: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    margin-right: 10px;
  }

  input[type="checkbox"] {
    margin-right: 5px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export default SecuritySettingsPage;
