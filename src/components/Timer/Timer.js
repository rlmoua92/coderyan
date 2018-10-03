import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
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

  const iconStartClass = classNames(
    'timer-icon',
    { 'disabled': !onStartClick },
  );
  const iconStopClass = classNames(
    'timer-icon',
    { 'disabled': !onStopClick },
  );
  const iconClearClass = classNames(
    'timer-icon',
    { 'disabled': !onClearClick },
  );

  return (
    <div className="timer-container">
      <div className="timer">
        <div className="timer-title">TIME</div>
        <div className="timer-time">{seconds}</div>
      </div>
      <div className="controlIcons">
        <FontAwesomeIcon icon={faPlay} onClick={onStartClick} className={iconStartClass} />   
        <FontAwesomeIcon icon={faStop} onClick={onStopClick} className={iconStopClass} />
        <FontAwesomeIcon icon={faBan} onClick={onClearClick} className={iconClearClass} />
      </div>
    </div>
  );
}

export default Timer;