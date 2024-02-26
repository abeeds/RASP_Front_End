import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { BACKEND_URL, ADMIN_KEY } from '../../constants';
import { setUser, setAdmin } from '../../variables';


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
    if ( name === 'admin' && pass === ADMIN_KEY ) {
      setAdmin();
      navigate('/admin');
    }
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

  const register = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
    axios
      .post(`${BACKEND_URL}/register/` + name + '/' + pass)
      .then((response) => {
        setError(response.data.message);
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
      <input type="password" id="pass" value={pass} onChange={changePass} />
      <button type="submit">Login</button>
      <button type="button" onClick={() => register(event) }>Register</button>
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
