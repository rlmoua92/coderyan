import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import Board from '../Board';
import Timer from '../Timer';

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
            <Timer onTimerEnd={props.onTimerEnd}/> :
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
        redTotal={props.redTotal}
        blueTotal={props.blueTotal}
        height={props.height}
        width={props.width}
      />
    </div>
  );
}

export default Game;