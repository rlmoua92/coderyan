import React from 'react';
import Board from '../Board';
import Timer from '../Timer';
import GameSettings from '../GameSettings';
import NavBar from '../NavBar';
import './Game.scss';
import { Link } from 'react-router-dom';

const Game = (props) => {
  const {
    isLoading,
    useTimer,
    winner,
    isPlayerRed,
    score,
    onEndTurnClick,
    randKey,
  } = props;

  const leftContent = 
    <div className="flex flex-column align-center">
      <div className="room">ROOM: {randKey}</div>
      {winner ? 
        <div className="winner">WINNER: {winner}</div> :
        <div className="player">TURN: {isPlayerRed ? "RED" : "BLUE"}</div>
      }
    </div>
  const centerContent = 
    <div className="game-stats flex v-align-center">
      <div>RED: {score.red}</div>
      {winner ?
        <div className="nav-button-container">
          <Link className="nav-button button" to="/">
            PLAY<br/ >AGAIN
          </Link>
        </div> :
        useTimer ?
          <Timer /> :
          <div className="nav-button-container">
            <button className="nav-button" onClick={onEndTurnClick}>
              END<br/ >TURN
            </button>
          </div>
      }
      <div>BLUE: {score.blue}</div>
    </div>;
  const rightContent = 
    <div className="nav-settings">
      <GameSettings />
    </div>;

  const content = isLoading ? <div className="loading">Loading...</div> :
    <div>
      <NavBar leftContent={leftContent} centerContent={centerContent} rightContent={rightContent} isPlayerRed={isPlayerRed} />
      <Board />
    </div>;
    
  return (
    <React.Fragment>
      { content }
    </React.Fragment>
  );
};

export default Game;