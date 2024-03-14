// import { Link } from 'react-router-dom'
import { getUser } from '../../variables';

interface Page {
  destination: string;
  label: string;
}

const PAGES: Page[] = [
  { label: 'Users', destination: '/users'},
  { label: 'Admin', destination: '/admin'},
  //{ label: 'Chatrooms', destination: '/chatrooms'},
]

const home_url: string = "/";

function Navbar() {

  const mapper = (page: Page) => (
    <a className="nav-item nav-link" href={page.destination}>{page.label}</a>
  );

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-md navbar-dark navigBG fixed-top">
        {/* Appears on mobile and thinner windows */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="container">
          {/* Home Page */}
          <a className="navbar-brand mr-4" href={home_url}><strong>RASP</strong></a>
          
          {/* Nav Toggler */}
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Main Nav Pages */}
          <div className="collapse navbar-collapse" id="navbarToggle">
            <div className="navbar-nav mr-auto">
              {PAGES.map(mapper)}
            </div>
            
            {/* Right side of navbar*/}
            <div className="navbar-nav">
              { getUser() === '' ? (
                  <>
                    <a className="nav-item nav-link" href="/login">Log In</a>
                  </>
                ) :
                (
                  <>
                    <a className="nav-item nav-link" href="/chatrooms">{getUser()}</a>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar;
