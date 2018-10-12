import React from 'react';
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
    onStartClick,
    isSpymaster
  } = props;

  const iconStartClass = classNames(
    'timer-icon',
    { 'disabled': timerOn || isSpymaster },
  );
  const iconStopClass = classNames(
    'timer-icon',
    { 'disabled': !timerOn || isSpymaster },
  );
  const iconClearClass = classNames(
    'timer-icon',
    { 'disabled': !timerOn || isSpymaster },
  );

  return (
    <div className="timer-container">
      <div className="timer">
        <div className="timer-title">TIME</div>
        <div className="timer-time">{seconds ? seconds : "--"}</div>
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