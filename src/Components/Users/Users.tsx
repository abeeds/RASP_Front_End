import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import axios from 'axios';


interface AddUserFormProps {
  setError: (error: string) => void;
  fetchUsers: () => void;
}


interface User {
  username: string;
}


function AddUserForm({ setError, fetchUsers }: AddUserFormProps) {
  const [name, setName] = useState('');

  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post('http://thejollyfatso.pythonanywhere.com/get_users', { name: name })
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
          const usersArray = keys.map((key) => usersObject[key]);

          // const myusersObject = response.data.Data;
          // const mykeys = Object.keys(myusersObject);
          // const myusersArray = mykeys.map((mykey) => myusersObject[mykey]);
          // setUsers(keys); //previously set to usersArray
          setUsers(usersArray); //previously set to usersArray
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
