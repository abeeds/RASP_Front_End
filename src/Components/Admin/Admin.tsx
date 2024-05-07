import { useState, ChangeEvent, FormEvent } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import { getAdmin } from '../../variables';
import { CHATROOMS_URL, BAN, WIPE_COLLECTION } from '../../constants';


type ChatroomsData = {
  [chatroomName: string]: {
    description: string;
  };
};

interface DelUserFormProps {
  setError: (error: string) => void;
}

interface UpdateRoomFormProps {
  setError: (error: string) => void;
}

interface WipeFormProps {
  setError: (error: string) => void;
}

// Has an error: defined but not used
// leaving it here incase it is needed later
// interface Chatroom {
//   chatroom_name: string;
//   description: string;
// }



function DelUserForm({ setError }: DelUserFormProps) {
  const [name, setName] = useState('');

  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const delUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .delete(`${BAN}` + name)
      .then((response) => {
        setError(response.data.message);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <form onSubmit={delUser}>
      <label htmlFor="name">Username</label>
      <input type="text" id="name" value={name} onChange={changeName} />
      <button type="submit">Ban</button>
    </form>
  );
}

function UpdateRoomForm({ setError }: UpdateRoomFormProps) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [chatroomsObject, setChatroomsObject] = useState<ChatroomsData>({});

  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    axios.get(`${CHATROOMS_URL}`)
      .then((response) => {
        setChatroomsObject(response.data);
      })
      .catch(() => {
        setError('Something went wrong');
      });
    setName(event.target.value);
    setDesc(chatroomsObject[event.target.value].description);
  };

  const changeDesc = (event: ChangeEvent<HTMLInputElement>) => {
    setDesc(event.target.value);
  };

  const updateDesc = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .put(`${CHATROOMS_URL}`, { chatroom_name: name, description: desc })
      .then((response) => {
        setError(response.data.message);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <form onSubmit={updateDesc}>
      <label htmlFor="name">Chatroom</label>
      <input type="text" id="name" value={name} onChange={changeName} />
      <label htmlFor="name">New Description</label>
      <input type="text" id="desc" value={desc} onChange={changeDesc} />
      <button type="submit">Update</button>
    </form>
  );
}

function WipeForm({ setError }: WipeFormProps) {
  const [isHidden, setIsHidden] = useState(true);
  const [collection, setCollection] = useState('');
  const [code, setCode] = useState('');

  const toggleForm = (): void => {
    setIsHidden(!isHidden);
  };

  const changeCollection = (event: ChangeEvent<HTMLInputElement>) => {
    setCollection(event.target.value);
  };

  const changeCode = (event: ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const confirmWipe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.delete(`${WIPE_COLLECTION}` + collection + '/' + code)
      .then((response) => {
        setError(response.data.message);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <div>
      <button onClick={toggleForm}>Wipe</button>
      { !isHidden && (
        <form onSubmit={confirmWipe}>
          <label htmlFor="collection">Collection</label>
          <input type="text" id="collection" value={collection} onChange={changeCollection} />
          <label htmlFor="code">Code</label>
          <input type="text" id="code" value={code} onChange={changeCode} />
          <button type="submit">Nuke!</button>
        </form>
      )}
    </div>
  );
}

function Admin() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if ( getAdmin() ) {
    return (
      <div className="wrapper">
        <h1>
          Admin Actions
        </h1>
        {error && (
          <div className="error-message">
          {error}
          </div>
        )}
      <hr></hr>
      <DelUserForm setError={setError} />
      <hr></hr>
      <UpdateRoomForm setError={setError} />
      <hr></hr>
      <WipeForm setError={setError} />
      </div>
    );
  } else {
    navigate('/chatrooms');
    return (
      
      <div className="wrapper">
        <h1>
          Admin Actions
        </h1>
        {error && (
          <div className="error-message">
          {error}
          </div>
        )}
      <hr></hr>
      <h3>You do not have permission to view this page.</h3>
      </div>
    );
  }
}

export default Admin;
