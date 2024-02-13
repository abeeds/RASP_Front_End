import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddChatroomForm({ setError, fetchChatrooms }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const changeName = (event) => { setName(event.target.value); };
  const changeDescription = (event) => { setDescription(event.target.value); };

  const addChatroom = (event) => {
    event.preventDefault();
    //axios.post('http://localhost:8000/users', { name: name })
    axios.post('http://thejollyfatso.pythonanywhere.com/insert_chatroom/' + name + '/' + description, { name: name, description: description })
      .then(() => {
        setError('');
        fetchChatrooms();
      })
      .catch( (error) => { setError(error.response.data.message); });
  }

  return (
    <form>
      <label htmlFor="name">
        Room Name
      </label>
      <input type="text" id="name" value={name} onChange={changeName}/>
      <label htmlFor="description">
        Description
      </label>
      <input type="text" id="description" value={description} onChange={changeDescription}/>
      <button type="submit" onClick={addChatroom}>Submit</button>
    </form>
  );
}

function Chatrooms() {
  const [error, setError] = useState('');
  const [chatrooms, setChatrooms] = useState([]);
  const [msgs, setMsgs] = useState([]);

  const fetchChatrooms = () => {
      //axios.get('http://localhost:8000/users')
      axios.get('http://thejollyfatso.pythonanywhere.com/get_chatrooms')
        .then((response) => { 
          const chatroomsObject = response.data;
          const keys = Object.keys(chatroomsObject);
          const chatroomsArray = keys.map((key) => ([ key, chatroomsObject[key].description ]));
          const chatroomsFetch = chatroomsArray.map(([name, description]) => ({
            name,
            description
          }));
          setChatrooms(chatroomsFetch); 
        })
        .catch(() => { setError('Something went wrong'); });
  };

  const fetchMessages = (chatroom) => {
    axios.get('http://thejollyfatso.pythonanywhere.com/get_msgs/' + chatroom)
      .then((response) => {
        const msgsObject = response.data;
        console.log(response.data);
        const keys = Object.keys(msgsObject);
        const msgsArray = keys.map((key) => ([
          msgsObject[key].Timestamp,
          msgsObject[key].User,
          msgsObject[key].Content
        ]));
        const msgsFetch = msgsArray.map(([time, user, content]) => ({
          time,
          user,
          content
        }));
        console.log(msgsFetch);
        setMsgs(msgsFetch);
      })
      .catch(() => { setError('oopsie woopsie'); });
  };

  useEffect(
    fetchChatrooms,
    [],
  );

  return (
    <div className="wrapper">
      <h1>
        Chatrooms
      </h1>
      {error && (
        <div className="error-message">
        {error}
        </div>
      )}
    <AddChatroomForm setError={setError} fetchChatrooms={fetchChatrooms} />
    {msgs.map((msg) => (
      <div>
        <p>{msg.user} at {msg.time} said:</p>
        <h4>{msg.content}</h4>
      </div>
    ))}
    {chatrooms.map((chatroom) => (
      <div className="chatroom-container">
        <h2>{chatroom.name}<button onClick={() => fetchMessages(chatroom.name)}></button></h2>
        <p>{chatroom.description}</p>
      </div>
    ))}
    </div>
  );
}

export default Chatrooms;
