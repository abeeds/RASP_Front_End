import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { BACKEND_URL } from '../../constants';
import { setUser } from '../../variables';


interface LoginFormProps {
  setError: (error: string) => void;
}


function LoginForm({setError}: LoginFormProps) {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [pass, setPass] = useState('');

  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const changePass = (event: ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };

  const logIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .get(`${BACKEND_URL}/login/` + name + '/' + pass)
      .then((response) => {
        if ( response.data.message == 'true' ) {
          setUser(name);
          setError('Success! You can now send messages.');
          navigate('/chatrooms');
        } else {
          setError('Login failed. Try again.');
        }
      })
      .catch(() => {
        setError("Something went wrong.");
      });
  };

  return (
    <form onSubmit={logIn}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" value={name} onChange={changeName} />
      <label htmlFor="pass">Password (insecure)</label>
      <input type="text" id="pass" value={pass} onChange={changePass} />
      <button type="submit">Login</button>
    </form>
  );
}

function Login() {
  const [error, setError] = useState('');

  return (
    <div className="wrapper">
      <h1>
        Login
      </h1>
      {error && (
        <div className="error-message">
        {error}
        </div>
      )}
    <LoginForm setError={setError} />
    </div>
  );
}

export default Login;