import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import Board from '../Board';
import Timer from '../Timer';
import Modal from '../Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import './Game.scss';

const Game = (props) => {
  const {
    useTimer,
    onTimerCheck,
    isSpyMaster,
    onSpyMasterClick,
    winner,
    isPlayerRed,
    score,
    onTimerEnd,
    timerSeconds,
    startTimer,
    stopTimer,
    clearTimer,
    onEndTurnClick,
    showSettings,
    toggleSettings,
    redTotal,
    blueTotal,
    height,
    width,
    timerOn,
    onCardClick,
    resetGame,
    gameStarted,
    startGame,
    randKey,
  } = props;

  const settingsContent = 
  <div className="flex flex-column flex-100">
    <h2>SETTINGS</h2>
    <div>
      <label>
        <input type="checkbox" checked={useTimer} onChange={onTimerCheck} />
        Use Timer
      </label>
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
        <button className="modal-content-button flex-50" onClick={resetGame}>
          NEW GAME
        </button>
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
              <button className="nav-button" onClick={resetGame}>
                PLAY<br/ >AGAIN
              </button>
            </div> :
            useTimer ?
              <Timer 
                timerOn={timerOn}
                onTimerEnd={onTimerEnd} 
                seconds={timerSeconds}
                onStartClick={startTimer}
                onStopClick={stopTimer}
                onClearClick={clearTimer}
                isSpyMaster={isSpyMaster}
              /> :
              <div className="nav-button-container">
                <button className="nav-button" onClick={onEndTurnClick}>
                  END<br/ >TURN
                </button>
              </div>
          }
          <div>BLUE: {score.blue}</div>
        </div>
        <Modal 
          showModal={showSettings} 
          modalContent={settingsContent}
          buttonContent={settingsButton}
          toggleModal={toggleSettings}
          enableClosing={gameStarted}
        />
      </div>
      {gameStarted ? 
        <Board 
          onCardClick={onCardClick} 
          isSpyMaster={isSpyMaster}
          winner={winner}
          redTotal={redTotal}
          blueTotal={blueTotal}
          height={height}
          width={width}
          timerOn={timerOn}
          useTimer={useTimer}
          randKey={randKey}
        /> : null
      }
    </div>
  );
}

export default Game;