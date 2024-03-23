import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';
import { getRoom, setRoom } from '../../variables';

// Type Declarations
interface SendMessageFormProps {
  setError: (error: string) => void;
  fetchMessages: (chatroom: string) => void;
}

interface Message {
  key: string;
  timestamp: number;
  user: string;
  content: string;
}

function SendMessageForm({ setError, fetchMessages }: SendMessageFormProps) {
  const [content, setContent] = useState('');

  const user: string = localStorage.getItem('user');
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

function formatTimestamp(timestamp: number): string {
  const date: Date = new Date(timestamp * 1000);
  const month: string = String(date.getMonth() + 1).padStart(2,'0');
  const day: string = String(date.getDate()).padStart(2,'0');
  const year: number = date.getFullYear();
  const hours: string = String(date.getHours()).padStart(2,'0');
  const minutes: string = String(date.getMinutes()).padStart(2,'0');
  const seconds: string = String(date.getSeconds()).padStart(2,'0');

  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}

function Messages() {
  const navigate = useNavigate();

  const chatroom: string = getRoom();
  const user: string = localStorage.getItem('user');
  const [error, setError] = useState('');
  const [msgs, setMsgs] = useState<Message[]>([]);

  const fetchMessages = () => {
    axios.get(`${BACKEND_URL}/get_msgs/` + chatroom)
      .then((response) => {
        const msgsObject = response.data;
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
        setMsgs(msgsFetch);
      })
      .catch(() => { setError('oopsie woopsie'); });
  };

  useEffect(
    fetchMessages,
  );

  const deleteMessage = (msgKey: string) => {
    axios.delete(`${BACKEND_URL}/delete_msg/` + msgKey)
      .then(() => {
        setError('');
      })
      .catch((error) => { setError(error.response.data.message); });
  }

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
          <h5>{msg.user} at {formatTimestamp(msg.timestamp)} said: <i className="fa-regular fa-trash-can" onClick={() => {deleteMessage(msg.key)}}></i></h5>
          <p>{msg.content}</p>
        </>
        ) :
        (
        <>
          <h5>{msg.user} at {formatTimestamp(msg.timestamp)} said:</h5>
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
