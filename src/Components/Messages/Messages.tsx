import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';



import './Messages.css';
import { MSG_URL} from '../../constants';

// Message modes
const EDIT: string = "edit";
const REPLY: string = "reply";
const NORMAL: string = "normal";

// Type Declarations
interface SendMessageFormProps {
  setError: (error: string) => void;
  fetchMessages: (chatroom: string) => void;
  room_name: string;
}

interface Message {
  key: string;
  timestamp: number;
  user: string;
  content: string;
}

// This is the message bar at the bottom of the page
function SendMessageForm({ setError, fetchMessages, room_name /*, message_mode, set_message_mode*/ }: SendMessageFormProps) {
  const [content, setContent] = useState('');
  const user = localStorage.getItem('user');
  const changeContent = (event: ChangeEvent<HTMLTextAreaElement>) => { setContent(event.target.value); };

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // do nothing if message is empty or just whitespace
    if (!content.trim()) {
      return;
    }

    axios.post(`${MSG_URL}`, { chatroom_name: room_name, username: user, content: content.trim() } )
      .then(() => {
        setError('');
        setContent('');
        fetchMessages(room_name);
        window.scrollTo(0, document.body.scrollHeight);
      })
      .catch((error) => { setError(error.response.data.message); });
  }

  return (
    <div className='msgFormWrap'>
      <form
        className='SendMsgForm'
        onSubmit={sendMessage}
      >
        <textarea
          id="content"
          className='msgToSend'
          value={content}
          onChange={changeContent}
          placeholder={`Send a message to ${room_name}`}
        />
        <button type="submit" className='msgSubmit'>Send</button>
      </form>
    </div>
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


// This is the actual page
function Messages() {
  const msgBarMin: number = 31;
  const navigate = useNavigate();
  const roomParams = useParams();
  const chatroom: string = roomParams?.["chatroom"]?.toString() || '';
  const user = localStorage.getItem('user');
  const [error, setError] = useState('');
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [msgBarHeight, setMsgBarHeight] = useState(msgBarMin);
  const [messageMode, setMessageMode] = useState(NORMAL); // modes defined at top
  const [editId, setEditId] = useState('');
  const [replyId, setReplyId] = useState(''); // unimplemented for now

  const adjustMsgBarHeight = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = `${msgBarMin}px`;
    target.style.height = `${target.scrollHeight}px`;
  };

  const setToNormal = () => {
    setMessageMode(NORMAL);
    setEditId('');
    setReplyId('');
  }

  const setToEdit = (msgID:string, originalMsg:string) => {
    setMessageMode(EDIT);
    setEditId(msgID);
    setReplyId('');

    const messageBar = document.querySelector('.msgToSend') as HTMLTextAreaElement | null;
    if(messageBar){
      messageBar.value = originalMsg;
      setMsgBarHeight(messageBar.clientHeight);
    }
  }

  const setToReply = (msgID:string) => {
    setMessageMode(REPLY);
    setReplyId(msgID);
    setEditId('');
  }

  const fetchMessages = () => {
    axios.get(`${MSG_URL}/${chatroom}`)
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

  const deleteMessage = (msgKey: string) => {
    axios.delete(`${MSG_URL}/${msgKey}`)
      .then(() => {
        setError('');
      })
      .catch((error) => { setError(error.response.data.message); });
  }

  useEffect(fetchMessages,)

  // jump to bottom of page after first render
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  }, []);

  // currently a WIP
  // when user scrolls to the top, load more messages
  const [prevScroll, setprevScroll] = useState(0);
  useEffect(() => {
    const scrollUpAtTop = () => {
      const currScroll = window.scrollY;
      const atTop = currScroll === 0;
      if (prevScroll > currScroll && atTop) {
        // will change to run code that loads more messages
        console.log("Scrolled to top")
      }
      setprevScroll(currScroll);
    }

    window.addEventListener('scroll', scrollUpAtTop)
    return () => {
      window.removeEventListener('scroll', scrollUpAtTop);
    }
  }, [prevScroll]);
  
  useEffect(() => {
    const messageBar = document.querySelector('.msgToSend') as HTMLTextAreaElement | null;
    
    // keep the lowest messages readable
    // this part handles message bar sizing and the spacing at the bottom to
    if(messageBar) {
      setMsgBarHeight(messageBar.clientHeight);
      
      if(messageBar.value === '') {
        messageBar.style.height = `${msgBarMin}px`;
        setMsgBarHeight(msgBarMin);
      }
      
      messageBar.addEventListener('input', adjustMsgBarHeight);

      // clean up to avoid mem leak
      return () => {
        messageBar.removeEventListener('input', adjustMsgBarHeight);
      }
    }
  });

  const messagesSpacing = {
    // the numbers being added accounts for spacing
    // 1% is the msg bar's spacing from the bottom
    // 30px accounts for the padding of the messages and msg bar
    paddingBottom: `calc(1% + ${msgBarHeight}px + 30px)`,
  }

  return (
    <div className="wrapper">
      <h1>
        {chatroom}  <button onClick={() => {navigate('/chatrooms'); }}>Return</button>
      </h1>
        {error && (
          <div className="error-message">
          {error}
          </div>
        )}

      <div 
        className='messagesBG'
        style={messagesSpacing}
      >
        <div 
          className='messages'
        >
          {msgs.map((msg) => (
            <div className='msg' key={msg.key}>
              <div className='msgDesc'>
                <h5><strong>{msg.user}</strong></h5> 
                <div className='spacing'/>
                <h6>{formatTimestamp(msg.timestamp)}</h6>
                
                {/* Show options if message belongs to the user */}
                { msg.user === user ? (
                    <>
                      <div className='spacing'/>
                      <h5 className='options'>
                        <i className="fa-regular fa-trash-can" 
                          onClick={() => {deleteMessage(msg.key)}}
                        />
                      </h5>
                      <div className='spacing'/>
                      <h5 className='options'>
                        <i className="fa-solid fa-pencil"
                          onClick={() => {setToEdit(msg.key, msg.content);
                            console.log(msg.key);
                          }}
                        />
                      </h5>
                    </>
                  ) : (<></>)
                }
              </div>
              {msg.content.split('\n').map((line, index) => (
                <p key={index}>
                  {line}
                  {index !== msg.content.split('\n').length - 1 && <br />}
                </p>
                )
              )}
            </div>
          ))}
        </div>
        <SendMessageForm setError={setError} fetchMessages={() => fetchMessages()} room_name={chatroom} />
      </div>
    </div>
  );
}

export default Messages;