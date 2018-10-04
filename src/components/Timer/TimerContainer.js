import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Timer from './Timer.js';
import './Timer.scss';

class TimerContainer extends Component {
  componentDidUpdate() {
    if (this.props.seconds <= 0) {
      this.props.onTimerEnd();
    }
  }

  render() {
    const {
      timerOn,
      onStartClick,
      onStopClick,
      onClearClick,
      seconds,
      isSpyMaster
    } = this.props;
    return (
      <Timer 
        onStartClick={isSpyMaster || timerOn ? null : onStartClick} 
        onStopClick={isSpyMaster || !timerOn ? null : onStopClick} 
        onClearClick={isSpyMaster || !timerOn ? null : onClearClick} 
        seconds={seconds}
      />
    );
  }
}

export default TimerContainer;