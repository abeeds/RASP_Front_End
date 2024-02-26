import { useState, ChangeEvent, FormEvent } from 'react';

import axios from 'axios';

import { BACKEND_URL } from '../../constants';


interface DelUserFormProps {
  setError: (error: string) => void;
}

function DelUserForm({ setError }: DelUserFormProps) {
  const [name, setName] = useState('');

  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const delUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .delete(`${BACKEND_URL}/devdeactivate/` + name)
      .then((response) => {
        setError(response.data.message);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <form onSubmit={delUser}>
      <label htmlFor="name">Username</label>
      <input type="text" id="name" value={name} onChange={changeName} />
      <button type="submit">Smite</button>
    </form>
  );
}

function Admin() {
  const [error, setError] = useState('');

  return (
    <div className="wrapper">
      <h1>
        Admin Actions
      </h1>
      {error && (
        <div className="error-message">
        {error}
        </div>
      )}
    <hr></hr>
    <DelUserForm setError={setError} />
    </div>
  );
}

export default Admin;
