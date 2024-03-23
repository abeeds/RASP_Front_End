import { useState, ChangeEvent, FormEvent } from 'react';

import axios from 'axios';

import { BACKEND_URL } from '../../constants';


function Account() {
  const [error, setError] = useState('');

  return (
    <button onClick={localStorage.removeItem('user')}>Logout</button>
  );
}

export default Account;
