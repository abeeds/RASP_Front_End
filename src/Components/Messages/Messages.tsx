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

  const user = localStorage.getItem('user');
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
    <form className='SendMsgForm' onSubmit={sendMessage}>
      <input type="text" id="content" className='msgToSend' 
      value={content} onChange={changeContent} placeholder={`Send a message to ${chatroom}`}/>
      <button type="submit" className='msgSubmit'>Send</button>
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
  const user = localStorage.getItem('user');
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

      <div className='messages'>
        {msgs.map((msg) => (
          <div className='msg'>
            { msg.user === user ? (
              <>
                <div className='msg_desc'>
                  <h5><strong>{msg.user}</strong></h5> 
                  <div className='spacing'/>
                  <h6>{formatTimestamp(msg.timestamp)}</h6>
                  <div className='spacing'/>
                  <h5 className='trash_icon'><i className="fa-regular fa-trash-can" onClick={() => {deleteMessage(msg.key)}}></i></h5>
                </div>
                <p>{msg.content}</p>
              </>
              ) :
              (
              <>
                <div className='msg_desc'>
                  <h5><strong>{msg.user}</strong></h5> 
                  <div className='spacing'></div>
                  <h6>{formatTimestamp(msg.timestamp)}</h6>
                </div>
                <p>{msg.content}</p>
              </>
              )
            }
          </div>
        ))}
        <SendMessageForm setError={setError} fetchMessages={() => fetchMessages()} />
      </div>
    
    </div>
  );
}

export default Messages;