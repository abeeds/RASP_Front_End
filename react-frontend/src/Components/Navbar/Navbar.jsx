import React from 'react';
import { Link } from 'react-router-dom'

const PAGES = [
  { label: 'Home', destination: '/'},
  { label: 'Users', destination: '/users'},
  { label: 'Chatrooms', destination: '/chatrooms'},
]

function Navbar() {

  const mapper = (page) => (
    <li><Link to={page.destination}><button>{page.label}</button></Link></li>
  );

  return (
    <nav>
      <ul className="wrapper">
        {PAGES.map(mapper)}
      </ul>
    </nav>
  )
}

export default Navbar;
