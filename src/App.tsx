import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import './App.css';

import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Users from './Components/Users';
import Chatrooms from './Components/Chatrooms';
import Messages from './Components/Messages';
import Admin from './Components/Admin';
import Account from './Components/Account';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="login" element={<Login/>} />
        <Route path="users" element={<Users/>} />
        <Route path="chatrooms" element={<Chatrooms/>} />
        <Route path="messages" element={<Messages/>} />
        <Route path="admin" element={<Admin/>} />
        <Route path="account" element={<Account/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
