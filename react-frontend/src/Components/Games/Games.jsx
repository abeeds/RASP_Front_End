import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddGameForm({ setError, fetchGames }) {
  const [name, setName] = useState('');
  const [num, setNum] = useState(0);

  const changeName = (event) => { setName(event.target.value); };
  const changeNum = (event) => { setNum(event.target.value); };

  const addGame = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/games', { name: name, numPlayers: num })
      .then(() => {
        setError('');
        fetchGames();
      })
      .catch( (error) => { setError(error.response.data.message); });
  }

  return (
    <form>
      <label htmlFor="name">
        Name
      </label>
      <input type="text" id="name" value={name} onChange={changeName}/>
      <label htmlFor="num">
        Number of players
      </label>
      <input type="number" id="number" value={num} onChange={changeNum}/>
      <button type="submit" onClick={addGame}>Submit</button>
    </form>
  );
}

function Games() {
  const [error, setError] = useState('');
  const [games, setGames] = useState([]);

  const fetchGames = () => {
      axios.get('http://localhost:8000/games')
        .then((response) => { 
          console.log("Games response: ", response);
          const gamesObject = response.data.Data;
          console.log("gamesObject: ", gamesObject);
          console.log(typeof gamesObject);
          const keys = Object.keys(gamesObject);
          const gamesArray = keys.map((key) => gamesObject[key]);
          setGames(gamesArray);
          console.log("keys:", keys);
          console.log("keys[0]", keys[0]);
          console.log("games:", games);
          console.log("games[0]", games[0]);
          console.log(typeof games[0]);
          console.log("games[0].name", games[0].name);
        })
        .catch(() => { setError('Something went wrong'); });
  };

  useEffect(
    fetchGames,
    [],
  );

  return (
    <div className="wrapper">
      <h1>
        Games p2
      </h1>
      {error && (
        <div className="error-message">
        {error}
        </div>
      )}
    <AddGameForm setError={setError} fetchGames={fetchGames} />
    {games.map((game) => (
      <div className="game-container">
        <h2>{game.name}</h2>
        <p>Players: {game.numPlayers}</p>
      </div>
    ))}
    </div>
  );
}

export default Games;
