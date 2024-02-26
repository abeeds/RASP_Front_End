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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="" element={<Login/>} />
        <Route path="users" element={<Users/>} />
        <Route path="chatrooms" element={<Chatrooms/>} />
        <Route path="messages" element={<Messages/>} />
        <Route path="admin" element={<Admin/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
