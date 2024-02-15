import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import axios from 'axios';


interface AddUserFormProps {
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
      .post('http://thejollyfatso.pythonanywhere.com/register/' + name + '/' + pass)
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
      <label htmlFor="pass">Password</label>
      <input type="text" id="pass" value={pass} onChange={changePass} />
      <button type="submit">Submit</button>
    </form>
  );
}

function Users() {
  const [error, setError] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = () => {
      //axios.get('http://localhost:8000/users')
      axios.get('http://thejollyfatso.pythonanywhere.com/get_users')
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
  );

  return (
    <div className="wrapper">
      <h1>
        Users p2
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
    </div>
  );
}

export default Users;
