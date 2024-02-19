import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import axios from 'axios';

import { BACKEND_URL } from '../../constants';


interface AddUserFormProps {
  setError: (error: string) => void;
  fetchUsers: () => void;
}

interface DelUserFormProps {
  setError: (error: string) => void;
  fetchUsers: () => void;
}

interface User {
  username: string;
  id: string;
}


function AddUserForm({ setError, fetchUsers }: AddUserFormProps) {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');

  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const changePass = (event: ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };

  const addUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post(`${BACKEND_URL}/register/` + name + '/' + pass)
      .then(() => {
        setError('');
        fetchUsers();
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <form onSubmit={addUser}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" value={name} onChange={changeName} />
      <label htmlFor="pass">Password (insecure)</label>
      <input type="text" id="pass" value={pass} onChange={changePass} />
      <button type="submit">Register</button>
    </form>
  );
}

function DelUserForm({ setError, fetchUsers }: DelUserFormProps) {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');

  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const changePass = (event: ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };

  const delUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .delete(`${BACKEND_URL}/deactivate/` + name)
      .then(() => {
        setError('');
        fetchUsers();
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <form onSubmit={delUser}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" value={name} onChange={changeName} />
      <label htmlFor="pass">Password which will not be checked/verified</label>
      <input type="text" id="pass" value={pass} onChange={changePass} />
      <button type="submit">!!CAUTION!! delete forever and ever</button>
    </form>
  );
}

function Users() {
  const [error, setError] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = () => {
      axios.get(`${BACKEND_URL}/get_users`)
        .then((response) => { 
          const usersObject = response.data;
          const keys = Object.keys(usersObject);
          const usersArray = keys.map((key) => ([key, usersObject[key]]));
          const usersFetch = usersArray.map(([username, id]) => ({
            username,
            id
          }));
          setUsers(usersFetch); //previously set to usersArray
          console.log("Users keys:", keys);
          console.log("Users: ", users);
        })
        .catch(() => { setError('Something went wrong'); });
  };

  useEffect(
    fetchUsers,
    []
  );

  return (
    <div className="wrapper">
      <h1>
        Users Registry
      </h1>
      {error && (
        <div className="error-message">
        {error}
        </div>
      )}
    <AddUserForm setError={setError} fetchUsers={fetchUsers} />
    {users.map((user) => (
      <div className="user-container">
        <h2>{user.username}</h2>
      </div>
    ))}
    <DelUserForm setError={setError} fetchUsers={fetchUsers} />
    </div>
  );
}

export default Users;
