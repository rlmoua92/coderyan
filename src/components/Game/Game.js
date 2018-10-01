import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import Board from '../Board';

const Game = (props) => {
  return (
    <div>
      <div className="game-state">
        <div className="score">
          <div>RED: {props.score.red}</div>
          <div>BLUE: {props.score.blue}</div>
        </div>
        <div className="player">
          TURN: {props.isPlayerRed ? "RED" : "BLUE"}
        </div>
        <div className="timer-container">
          <div className="timer">
            1:00
          </div>
          <button className="timer-button">
            START
          </button>
        </div>
        <div className="spymaster-toggle">
          <button>
            SPYMASTER
          </button>
        </div>
      </div>
      <Board onCardClick={props.onCardClick} />
    </div>
  );
}

export default Game;