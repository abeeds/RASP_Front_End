import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

// Type Declarations
interface AddChatroomFormProps {
  setError: (error: string) => void;
  fetchChatrooms: () => void;
}

interface Chatroom {
  chatroom_name: string;
  description: string;
}

interface Message {
  timestamp: string;
  user: string;
  content: string;
}


function AddChatroomForm({ setError, fetchChatrooms }: AddChatroomFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const changeName = (event: ChangeEvent<HTMLInputElement>) => { setName(event.target.value); };
  const changeDescription = (event: ChangeEvent<HTMLInputElement>) => { setDescription(event.target.value); };

  const addChatroom = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post('http://thejollyfatso.pythonanywhere.com/insert_chatroom/' + name + '/' + description)
      .then(() => {
        setError('');
        fetchChatrooms();
      })
      .catch((error) => { setError(error.response.data.message); });
  }

  return (
    <form onSubmit={addChatroom}>
      <label htmlFor="name">
        Room Name
      </label>
      <input type="text" id="name" value={name} onChange={changeName}/>
      <label htmlFor="description">
        Description
      </label>
      <input type="text" id="description" value={description} onChange={changeDescription}/>
      <button type="submit">Submit</button>
    </form>
  );
}

function Chatrooms() {
  const [error, setError] = useState('');
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
  const [msgs, setMsgs] = useState<Message[]>([]);

  useEffect(() => {
    fetchChatrooms();
  }, []); // Empty dependency array to run effect only once on mount

  const fetchChatrooms = () => {
    axios.get('http://thejollyfatso.pythonanywhere.com/get_chatrooms')
      .then((response) => {
        const chatroomsObject = response.data;
        const keys = Object.keys(chatroomsObject);
        const chatroomsArray = keys.map((key) => ([key, chatroomsObject[key].description]));
        const chatroomsFetch: Chatroom[] = chatroomsArray.map(([chatroom_name, description]) => ({
          chatroom_name,
          description,
        }));

        setChatrooms(chatroomsFetch);
      })
      .catch(() => {
        setError('Something went wrong');
      });
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
        const msgsFetch: Message[] = msgsArray.map(([timestamp, user, content]) => ({
          timestamp,
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
        <p>{msg.user} at {msg.timestamp} said:</p>
        <h4>{msg.content}</h4>
      </div>
    ))}
    {chatrooms.map((chatroom) => (
      <div className="chatroom-container">
        <h2>{chatroom.chatroom_name}<button onClick={() => fetchMessages(chatroom.chatroom_name)}></button></h2>
        <p>{chatroom.description}</p>
      </div>
    ))}
    </div>
  );
}

export default Chatrooms;
