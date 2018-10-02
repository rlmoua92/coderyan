import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faBan } from '@fortawesome/free-solid-svg-icons';
import './Timer.scss';


const Timer = (props) => {
  const {
    seconds,
    timerOn,
    onStopClick,
    onClearClick,
    onStartClick
  } = props;
  return (
    <div className="timer-container">
      <div className="timer">
        <div className="timer-title">TIME</div>
        <div className="timer-time">{seconds}</div>
      </div>
      {
        timerOn ?
        <div>
          <FontAwesomeIcon icon={faPlay} className="timer-icon disabled" />   
          <FontAwesomeIcon icon={faStop} onClick={onStopClick} className="timer-icon" />
          <FontAwesomeIcon icon={faBan} onClick={onClearClick} className="timer-icon" />
        </div> :
        <div>    
        <FontAwesomeIcon icon={faPlay} onClick={onStartClick} className="timer-icon" />    
        <FontAwesomeIcon icon={faStop} className="timer-icon disabled" />
        <FontAwesomeIcon icon={faBan} className="timer-icon disabled" />
      </div>
      }
    </div>
  );
}

export default Timer;