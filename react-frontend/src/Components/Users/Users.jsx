import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddUserForm({ setError, fetchUsers }) {
  const [name, setName] = useState('');

  const changeName = (event) => { setName(event.target.value); };

  const addUser = (event) => {
    event.preventDefault();
    //axios.post('http://localhost:8000/users', { name: name })
    axios.post('http://thejollyfatso.pythonanywhere.com/get_users', { name: name })
      .then(() => {
        setError('');
        fetchUsers();
      })
      .catch( (error) => { setError(error.response.data.message); });
  }

  return (
    <form>
      <label htmlFor="name">
        Name
      </label>
      <input type="text" id="name" value={name} onChange={changeName}/>
      <button type="submit" onClick={addUser}>Submit</button>
    </form>
  );
}

function Users() {
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

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
    [],
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
        <h2>{user.name}</h2>
      </div>
    ))}
    </div>
  );
}

export default Users;
