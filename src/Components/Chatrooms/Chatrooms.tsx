import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


// import { setRoom } from '../../variables';

import './Chatrooms.css';
import { CHATROOMS_URL } from '../../constants';

// Type Declarations
interface AddChatroomFormProps {
  setError: (error: string) => void;
  fetchChatrooms: () => void;
}

interface Chatroom {
  chatroom_name: string;
  description: string;
  owner: string;
}


function isLoggedIn() {
  const user = localStorage.getItem('user');
  return user !== null && user !== undefined;
}

function AddChatroomForm({ setError, fetchChatrooms }: AddChatroomFormProps) {
  if(!isLoggedIn()) {
    return <></>
  }
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const changeName = (event: ChangeEvent<HTMLInputElement>) => { setName(event.target.value); };
  const changeDescription = (event: ChangeEvent<HTMLInputElement>) => { setDescription(event.target.value); };

  const addChatroom = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post(`${CHATROOMS_URL}`, {
      chatroom_name: name, description: description, owner: localStorage.getItem('user')
    })
      .then(() => {
        setError('');
        fetchChatrooms();
      })
      .catch((error) => { setError(error.response.data.message); });
  }

  return (
    <form className="addChatroomFormDiv" onSubmit={addChatroom}>
      <label className='acfLabels' htmlFor="name">
        Room Name
      </label>
      <input className='acfInputs' type="text" id="name" value={name} onChange={changeName}/>
      <label className='acfLabels' htmlFor="description">
        Description
      </label>
      <input className='acfInputs' type="text" id="description" value={description} onChange={changeDescription}/>
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
    axios.get(`${CHATROOMS_URL}`)
      .then((response) => {
        const chatroomsObject = response.data;
        const keys = Object.keys(chatroomsObject);
        const chatroomsArray = keys.map((key) => ([key, chatroomsObject[key].description, chatroomsObject[key].owner]));
        const chatroomsFetch: Chatroom[] = chatroomsArray.map(([chatroom_name, description, owner]) => ({
          chatroom_name,
          description,
          owner,
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

  const deleteChatroom = (chatroom_name: string) => {
    axios.delete(`${CHATROOMS_URL}/${chatroom_name}`)
      .then(() => {
        setError('');
        fetchChatrooms();
      })
      .catch((error) => { setError(error.response.data.message); });
  }

  const handleDeleteIconClick = (e: React.MouseEvent<HTMLElement>, chatroomName: string): void => {
    e.stopPropagation(); 
    deleteChatroom(chatroomName);
  };

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
            <div 
              key={chatroom.chatroom_name}
              onClick={()=>{navigate(`/chatrooms/${encodeURIComponent(chatroom.chatroom_name)}`)}} 
              className="chatroom-cont"
            >
              {chatroom.owner == localStorage.getItem('user') ? (
                <>
                  <h2>
                    {chatroom.chatroom_name} 
                    <i className="fa-solid fa-crown"/>
                    <i 
                      className="fa-regular fa-trash-can" 
                      id = 'delChatroom'
                      onClick={(e) => {handleDeleteIconClick(e, chatroom.chatroom_name)
                      }}
                    />
                  </h2>
                  
                </>
              ):(
                <>
                  <h2> {chatroom.chatroom_name} </h2>
                </>
              )}
              <p>{chatroom.description}</p>
            </div>
        ))
      }
    </div>
    <hr></hr>
    <AddChatroomForm setError={setError} fetchChatrooms={fetchChatrooms} />
    </div>
  );
}

export default Chatrooms;
