import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { BACKEND_URL } from '../../constants';
import { setRoom } from '../../variables';

// Type Declarations
interface AddChatroomFormProps {
  setError: (error: string) => void;
  fetchChatrooms: () => void;
}

interface Chatroom {
  chatroom_name: string;
  description: string;
}

function AddChatroomForm({ setError, fetchChatrooms }: AddChatroomFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const changeName = (event: ChangeEvent<HTMLInputElement>) => { setName(event.target.value); };
  const changeDescription = (event: ChangeEvent<HTMLInputElement>) => { setDescription(event.target.value); };

  const addChatroom = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post(`${BACKEND_URL}/insert_chatroom/` + name + '/' + description)
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
      <button type="submit">Create Room</button>
    </form>
  );
}

function Chatrooms() {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);

  useEffect(() => {
    fetchChatrooms();
  }, []); // Empty dependency array to run effect only once on mount

  const fetchChatrooms = () => {
    axios.get(`${BACKEND_URL}/get_chatrooms`)
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

  useEffect(
    fetchChatrooms,
    [],
  );

  return (
    <div className="wrapper">
      <h1 className='chatroom-label'>
        Chatrooms
      </h1>
      {error && (
        <div className="error-message">
        {error}
        </div>
      )}
    <div className='chatroom-display'>
      {chatrooms.map(
        (chatroom) => (

          <Link 
            to={`/messages/`} 
            onClick={() => {
              setRoom(chatroom.chatroom_name);
              navigate('/messages');
            }}
            style={{ textDecoration: 'none' }}
          >
            <div className="chatroom-cont">
              <h2>
                {chatroom.chatroom_name}
              </h2>
              <p>{chatroom.description}</p>
            </div>
          </Link>
        ))
      }
    </div>
    <hr></hr>
    <AddChatroomForm setError={setError} fetchChatrooms={fetchChatrooms} />
    </div>
  );
}

export default Chatrooms;
