import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { ADMIN_KEY } from '../../constants';
import { setAdmin } from '../../variables';
import { LOGIN, REGISTER } from '../../constants';

import './Login.css';

const maxUserLen: number = 16;
const maxPassLen: number = 32;

interface LoginFormProps {
  setError: (error: string) => void;
}

function isLoggedIn() {
  const user = localStorage.getItem('user');
  return user !== null && user !== undefined;
}


function LoginForm({setError}: LoginFormProps) {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [passReg, setPassReg] = useState('');
  const [passConfirm, setPassConfirm] = useState('');
  const [loginOrReg, setLoginOrReg] = useState(false);

  // handles fields of the forms
  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    const nameWithoutSpace = event.target.value.replace(/\s/g, '');
    setName(nameWithoutSpace);
  };
  const changePass = (event: ChangeEvent<HTMLInputElement>) => {
    const passWithoutSpaces = event.target.value.replace(/\s/g, '');
    setPass(passWithoutSpaces);
  };
  const changePassReg = (event: ChangeEvent<HTMLInputElement>) => {
    const passWithoutSpaces = event.target.value.replace(/\s/g, '');
    setPassReg(passWithoutSpaces);
  };
  const changePassConfirm = (event: ChangeEvent<HTMLInputElement>) => {
    const passWithoutSpaces = event.target.value.replace(/\s/g, '');
    setPassConfirm(passWithoutSpaces);
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
      .get(`${LOGIN}` + name + '/' + pass)
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
    if(passReg == passConfirm) {
      axios
        .post(`${REGISTER}` + name + '/' + passReg)
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
      
      {/* First case is for Register form, 2nd is for login */}
      {loginOrReg ? (
          <>
          <h1>Register</h1>
          <button 
            className='changeMode' 
            type="button" 
            onClick={setToLogIn}
          >Login Instead</button>
          <form 
            className='regForm'
            onSubmit={register}
          >
            <label htmlFor="name">Username</label>
            <input 
              type="text"
              id="name"
              className='logInRegInput'
              value={name}
              onChange={changeName}
              maxLength={maxUserLen}
            />

            <label htmlFor="pass">Password</label>
            <input 
              type="password" 
              id="pass" 
              className='logInRegInput'
              value={passReg} 
              onChange={changePassReg} 
              maxLength={maxPassLen}
            />
            
            <label htmlFor="pass">Confirm Password</label>
            <input 
              type="password" 
              id="passConfirm" 
              className='logInRegInput'
              value={passConfirm} 
              onChange={changePassConfirm} 
              maxLength={maxPassLen}
            />

            <button type="submit">Submit</button> 
          
          </form>
          </>
        ) : 
        (
          <>
          <h1>Login</h1>
          <button 
            className='changeMode'
            type="button" 
            onClick={setToReg}
          >Register Instead</button>
          <form 
            className='logInForm'
            onSubmit={logIn}
          >
            <label htmlFor="name">Username</label>
            <input 
              type="text"
              id="name"
              className='logInRegInput'
              value={name}
              onChange={changeName}
              maxLength={maxUserLen}
            />
            
            <label htmlFor="pass">Password</label>
            <input 
              type="password" 
              id="pass" 
              className='logInRegInput'
              value={pass} 
              onChange={changePass} 
              maxLength={maxPassLen}
            />
            <button type="submit">Submit</button> 
          </form>
          </>
        )
      }
      
    </>
  );
}

function Login() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  if(isLoggedIn()) {
    navigate('/chatrooms');
    return <></>
  }

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
