import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { BACKEND_URL } from '../../constants';


function Account() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  return (
    <div className="wrapper">
      <button onClick={() => {
        localStorage.removeItem('user');
        navigate("/login");
      }}>Logout</button>
    </div>
  );
}

export default Account;
