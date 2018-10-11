import React from 'react';
import Board from '../Board';
import Timer from '../Timer';
import Modal from '../Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import './Game.scss';
import { Link } from 'react-router-dom';

const Game = (props) => {
  const {
    useTimer,
    onTimerCheck,
    isSpyMaster,
    onSpyMasterClick,
    winner,
    isPlayerRed,
    score,
    timerMaxSeconds,
    onTimerMaxChange,
    onEndTurnClick,
    toggleSettings,
    gameStarted,
    startGame,
    randKey,
  } = props;

  const settingsContent = 
  <div className="flex flex-column flex-100">
    <h2>SETTINGS</h2>
    <div className="timer-settings">
      <label>
        <input type="checkbox" checked={useTimer} onChange={onTimerCheck} />
        Use Timer
      </label>
      {useTimer ?
      <div>
        <input type="number" value={timerMaxSeconds} onChange={onTimerMaxChange} /> seconds
      </div> : 
        null
      }
    </div>
    <div>
      <label>
        <input type="checkbox" checked={isSpyMaster} onChange={onSpyMasterClick} />
        Spymaster
      </label>
    </div>
    {
      gameStarted ? 
      <div className="flex v-align-bottom modal-content-button-container">
        <Link className="modal-content-button flex-50 button" to="/">
          NEW GAME
        </Link>
        <button className="modal-content-button flex-50" onClick={toggleSettings}>
          RETURN TO GAME
        </button>
      </div> : 
      <div className="flex v-align-bottom modal-content-button-container">
        <button className="modal-content-button flex-50" onClick={() => {startGame(); toggleSettings();}}>
          START GAME
        </button>
      </div>
    }
  </div>;
  const settingsButton = <FontAwesomeIcon icon={faCog} />;
  return (
    <div>
      <div className="nav-bar flex v-align-center">
        <div>
          <div className="room">ROOM: {randKey}</div>
          {winner ? 
            <div className="winner">WINNER: {winner}</div> :
            <div className="player">TURN: {isPlayerRed ? "RED" : "BLUE"}</div>
          }
        </div>
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
        </div>
        <Modal 
          modalContent={settingsContent}
          buttonContent={settingsButton}
        />
      </div>
      {gameStarted ? 
        <Board
          randKey={randKey}
        /> : null
      }
    </div>
  );
}

export default Game;