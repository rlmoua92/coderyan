import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const Timer = (props) => {
  return (
    <div className="timer-container">
      <span className="timer">
        {props.seconds}
      </span>
      {
        props.timerOn ?
        <span>        
          <button className="timerbutton" onClick={props.onStopClick}>
            STOP
          </button>
          <button className="timerbutton" onClick={props.onClearClick}>
            CLEAR
          </button>
        </span> :
        <span>
          <button className="timer-button" onClick={props.onStartClick}>
            START
          </button>
        </span>
      }
    </div>
  );
}

export default Timer;