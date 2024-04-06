import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import { useState, useEffect } from 'react';

import './App.css';

import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Users from './Components/Users';
import Chatrooms from './Components/Chatrooms';
import Messages from './Components/Messages';
import Admin from './Components/Admin';
import Account from './Components/Account';

function App() {
  
  // previously had time as first param, but it was creating
  // an error with TypeScript so I removed it.
  const [, setTime] = useState<Date>(new Date());

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
        <Route path="users" element={<Users/>} />
        <Route path="chatrooms" element={<Chatrooms/>} />
        <Route path="chatrooms/:chatroom" element={<Messages/>} />
        <Route path="messages" element={<Messages/>} />
        <Route path="admin" element={<Admin/>} />
        <Route path="account" element={<Account/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
