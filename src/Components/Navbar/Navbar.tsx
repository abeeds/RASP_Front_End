import { Link } from 'react-router-dom'

interface Page {
  destination: string;
  label: string;
}

const PAGES: Page[] = [
  { label: 'Home', destination: '/login'},
  { label: 'Users', destination: '/users'},
  { label: 'Chatrooms', destination: '/chatrooms'},
]

function Navbar() {

  const mapper = (page: Page) => (
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
