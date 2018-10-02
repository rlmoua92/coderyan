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
    } = this.props;
    return (
      <Timer 
        timerOn={timerOn} 
        onStartClick={onStartClick} 
        onStopClick={onStopClick} 
        onClearClick={onClearClick} 
        seconds={seconds}
      />
    );
  }
}

export default TimerContainer;