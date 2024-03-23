import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { BACKEND_URL, ADMIN_KEY } from '../../constants';
import { setAdmin } from '../../variables';


interface LoginFormProps {
  setError: (error: string) => void;
}


function LoginForm({setError}: LoginFormProps) {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [passConfirm, setPassConfirm] = useState('');
  const [loginOrReg, setLoginOrReg] = useState(false);

  // handles fields of the forms
  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const changePass = (event: ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };
  const changePassConfirm = (event: ChangeEvent<HTMLInputElement>) => {
    setPassConfirm(event.target.value);
  }; // specifically used in the register form

  // handles whether login or register form is shown in return statement
  const setToReg = () => {
    setLoginOrReg(true);
  }
  const setToLogIn = () => {
    setLoginOrReg(false);
  }

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
          localStorage.setItem('user', name);
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
    if(pass == passConfirm) {
      axios
        .post(`${BACKEND_URL}/register/` + name + '/' + pass)
        .then((response) => {
          setError(response.data.message);
        })
        .catch(() => {
          setError("Something went wrong.");
        });
      }
    else {
      setError("Passwords do not match. Please try again.")
    }
  };
  
  return (
    <>
      
      {loginOrReg ? (
          <>
          <h1>Register</h1>
          <form onSubmit={register}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={changeName} />
            <label htmlFor="pass">Password (insecure)</label>
            <input type="password" id="pass" value={pass} onChange={changePass} />
            <label htmlFor="pass">Confirm Password (insecure)</label>
            <input type="password" id="passConfirm" value={passConfirm} onChange={changePassConfirm} />
            <button type="button" onClick={setToLogIn}>Login</button><button type="submit">Submit</button> 
          </form>
          </>
        ) : 
        (
          <>
          <h1>Login</h1>
          <form onSubmit={logIn}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={changeName} />
            <label htmlFor="pass">Password (insecure)</label>
            <input type="password" id="pass" value={pass} onChange={changePass} />
            <button type="button" onClick={setToReg}>Register</button><button type="submit">Submit</button> 
          </form>
          </>
        )
      }
      
    </>
  );
}

function Login() {
  const [error, setError] = useState('');

  return (
    <div className="wrapper">
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
