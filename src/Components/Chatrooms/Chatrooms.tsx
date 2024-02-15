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

interface SendMessageFormProps {
  setError: (error: string) => void;
  fetchMessages: (chatroom: string) => void;
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

function SendMessageForm({ setError, fetchMessages }: SendMessageFormProps) {
  const [user, setUser] = useState('');
  const [chatroom, setChatroom] = useState('');
  const [content, setContent] = useState('');

  const changeUser = (event: ChangeEvent<HTMLInputElement>) => { setUser(event.target.value); };
  const changeChatroom = (event: ChangeEvent<HTMLInputElement>) => { setChatroom(event.target.value); };
  const changeContent = (event: ChangeEvent<HTMLInputElement>) => { setContent(event.target.value); };

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post('http://thejollyfatso.pythonanywhere.com/write_msg/' + chatroom + '/' + user + '/' + content)
      .then(() => {
        setError('');
        setContent('');
        fetchMessages(chatroom);
      })
      .catch((error) => { setError(error.response.data.message); });
  }

  return (
    <form onSubmit={sendMessage}>
      <label htmlFor="chatroom">
        Chatroom
      </label>
      <input type="text" id="chatroom" value={chatroom} onChange={changeChatroom}/>
      <label htmlFor="user">
        Username
      </label>
      <input type="text" id="user" value={user} onChange={changeUser}/>
      <label htmlFor="content">
        Message
      </label>
      <input type="text" id="content" value={content} onChange={changeContent}/>
      <button type="submit">Send</button>
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

  const fetchMessages = (chatroom: string) => {
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
    {msgs.map((msg) => (
      <div>
        <h5>{msg.user} at {msg.timestamp} said:</h5>
        <p>{msg.content}</p>
      </div>
    ))}
    <SendMessageForm setError={setError} fetchMessages={(chatroom) => fetchMessages(chatroom)} />
    {chatrooms.map((chatroom) => (
      <div className="chatroom-container">
        <h2>{chatroom.chatroom_name}<button onClick={() => fetchMessages(chatroom.chatroom_name)}></button></h2>
        <p>{chatroom.description}</p>
      </div>
    ))}
    <hr></hr>
    <AddChatroomForm setError={setError} fetchChatrooms={fetchChatrooms} />
    </div>
  );
}

export default Chatrooms;
