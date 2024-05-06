import './Home.css'
import { useNavigate } from 'react-router-dom';

function isLoggedIn() {
    const user = localStorage.getItem('user');
    return user !== null && user !== undefined;
  }

function Home() {
    const navigate = useNavigate();
    const handleButtonClick = (path:string) => {
        navigate(path);
      };

    return<>
        <h1>Welcome to RASP!</h1>
        {isLoggedIn() ? <button 
            className="homeStart" 
            onClick={() => {handleButtonClick('/chatrooms')}}
        >Get Started!</button>: <button 
            className="homeStart" 
            onClick={() => {handleButtonClick('/login')}}
        >Get Started!</button>}
        
    </>
}

export default Home;