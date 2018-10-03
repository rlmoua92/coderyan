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
    handleTimerChange,
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
    onSettingsClick,
    redTotal,
    blueTotal,
    height,
    width,
    timerOn,
    onCardClick,
  } = props;

  const settingsContent = <div><h2>SETTINGS</h2>
    <div><label><input type="checkbox" checked={useTimer} onChange={handleTimerChange} />Use Timer</label></div>
    <div><label><input type="checkbox" checked={isSpyMaster} onChange={onSpyMasterClick} />Spymaster</label></div></div>;
  const settingsButton = <FontAwesomeIcon icon={faCog} />;
  return (
    <div>
      <div className="nav-bar flex v-align">
        <div>
          {winner ? 
            <div className="winner">WINNER: {winner}</div> :
            <div className="player">TURN: {isPlayerRed ? "RED" : "BLUE"}</div>
          }
        </div>
        <div className="game-stats flex v-align">
          <div>RED: {score.red}</div>
          {useTimer ?
            <Timer 
              onTimerEnd={onTimerEnd} 
              timerOn={timerOn} 
              seconds={timerSeconds}
              onStartClick={startTimer}
              onStopClick={stopTimer}
              onClearClick={clearTimer}
            /> :
            <div className="switch-players">
              <button className="switch-players" onClick={onEndTurnClick}>
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
          toggleModal={onSettingsClick}
        />
      </div>
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
      />
    </div>
  );
}

export default Game;