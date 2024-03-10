import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';
import { getUser, getRoom, setRoom } from '../../variables';

// Type Declarations
interface SendMessageFormProps {
  setError: (error: string) => void;
  fetchMessages: (chatroom: string) => void;
}

interface Message {
  key: string;
  timestamp: string;
  user: string;
  content: string;
}

function SendMessageForm({ setError, fetchMessages }: SendMessageFormProps) {
  const [content, setContent] = useState('');

  const user: string = getUser();
  const chatroom: string = getRoom();
  const changeContent = (event: ChangeEvent<HTMLInputElement>) => { setContent(event.target.value); };

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post(`${BACKEND_URL}/write_msg`, { chatroom_name: chatroom, username: user, content: content } )
      .then(() => {
        setError('');
        setContent('');
        fetchMessages(chatroom);
      })
      .catch((error) => { setError(error.response.data.message); });
  }

  return (
    <form onSubmit={sendMessage}>
      <label htmlFor="content">
        Message
      </label>
      <input type="text" id="content" value={content} onChange={changeContent}/>
      <button type="submit">Send</button>
    </form>
  );
}

function Messages() {
  const navigate = useNavigate();

  const chatroom: string = getRoom();
  const user: string = getUser();
  const [error, setError] = useState('');
  const [msgs, setMsgs] = useState<Message[]>([]);

  const fetchMessages = () => {
    axios.get(`${BACKEND_URL}/get_msgs/` + chatroom)
      .then((response) => {
        const msgsObject = response.data;
        console.log(response.data);
        const keys = Object.keys(msgsObject);
        const msgsArray = keys.map((key) => ([
          key,
          msgsObject[key].Timestamp,
          msgsObject[key].User,
          msgsObject[key].Content
        ]));
        const msgsFetch: Message[] = msgsArray.map(([key, timestamp, user, content]) => ({
          key,
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
    fetchMessages,
  );

  return (
    <div className="wrapper">
      <h1>
        {chatroom}  <button onClick={() => { setRoom(chatroom); navigate('/chatrooms'); }}>Return</button>
      </h1>
      {error && (
        <div className="error-message">
        {error}
        </div>
      )}
    {msgs.map((msg) => (
      <div>
        { msg.user === user ? (
        <>
          <h5>{msg.user} <button></button> at {msg.timestamp} said:</h5>
          <p>{msg.key} : {msg.content}</p>
        </>
        ) :
        (
        <>
          <h5>{msg.user} at {msg.timestamp} said:</h5>
          <p>{msg.content}</p>
        </>
        )
      }
      </div>
    ))}
    <hr></hr>
    <SendMessageForm setError={setError} fetchMessages={() => fetchMessages()} />
    </div>
  );
}

export default Messages;
