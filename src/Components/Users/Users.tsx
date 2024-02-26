import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import axios from 'axios';

import { BACKEND_URL } from '../../constants';


interface DelUserFormProps {
  setError: (error: string) => void;
  fetchUsers: () => void;
}

interface User {
  username: string;
  id: string;
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
      .delete(`${BACKEND_URL}/deactivate/` + name + '/' + pass)
      .then((response) => {
        setError(response.data.message);
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
      <label htmlFor="pass">Password (insecure)</label>
      <input type="text" id="pass" value={pass} onChange={changePass} />
      <button type="submit">Deactivate Account</button>
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
    {users.map((user) => (
      <div className="user-container">
        <p>{user.username}</p>
      </div>
    ))}
    <DelUserForm setError={setError} fetchUsers={fetchUsers} />
    </div>
  );
}

export default Users;
