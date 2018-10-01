import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import Board from '../Board';

const Game = (props) => {
  return (
    <div>
      <div className="nav-bar">
        <div className="game-stats">
          <div className="score">
            <div>RED: {props.score.red}</div>
            <div>BLUE: {props.score.blue}</div>
          </div>
          {props.winner ? 
            <div className="winner">WINNER: {props.winner}</div> :
            <div className="player">TURN: {props.isPlayerRed ? "RED" : "BLUE"}</div>
          }
          {props.useTimer ?
            <div className="timer-container">
              <span className="timer">
                1:00
              </span>
              <button className="timer-button">
                START
              </button>
            </div> :
            <div className="switch-players">
              <button className="switch-players" onClick={props.onEndTurnClick}>
                END TURN
              </button>
            </div>
          }
        </div>
        <div className="settings">
          SETTINGS
          <div><label><input type="checkbox" checked={props.useTimer} onChange={props.handleTimerChange} />Use Timer</label></div>
          <div><label><input type="checkbox" checked={props.isSpyMaster} onChange={props.onSpyMasterClick} />Spymaster</label></div>
        </div>
      </div>
      <Board 
        onCardClick={props.onCardClick} 
        isSpyMaster={props.isSpyMaster}
        winner={props.winner}
      />
    </div>
  );
}

export default Game;