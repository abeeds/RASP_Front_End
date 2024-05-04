import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import { useState, useEffect } from 'react';

import './App.css';

interface FormProps {
  handleSubmit: (answers: Record<string, string>) => void;
}

import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Users from './Components/Users';
import Chatrooms from './Components/Chatrooms';
import Messages from './Components/Messages';
import Admin from './Components/Admin';
import Account from './Components/Account';
import Hform from './Components/Hform';

function App() {
  
  // previously had time as first param, but it was creating
  // an error with TypeScript so I removed it.
  const [, setTime] = useState<Date>(new Date());

  const handleSubmit: FormProps['handleSubmit'] = (answers) => {
    console.log("Form submitted with answers ", answers);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="login" element={<Login/>} />
        {/*<Route path="users" element={<Users/>} />*/} {/*Add back for debug purposes only*/}
        <Route path="chatrooms" element={<Chatrooms/>} />
        <Route path="chatrooms/:chatroom" element={<Messages/>} />
        <Route path="admin" element={<Admin/>} />
        <Route path="account" element={<Account handleSubmit={handleSubmit} />} />
        <Route path="hform" element={<Hform/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
