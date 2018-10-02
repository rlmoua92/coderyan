import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Timer from './Timer.js';

class TimerContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timerOn: false,
      seconds: 60,
    };

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidUpdate() {
    if (this.state.seconds <= 0) {
      this.props.onTimerEnd();
      this.setState({ seconds: 60 });
    }
  }

  tick() {
    this.setState(prevState => {
      return {
        seconds: prevState.seconds - 1
      }
    });
  }

  startTimer() {
    this.setState({ timerOn: true });
    this.tickInterval = setInterval(this.tick, 1000);
  }

  stopTimer() {
    this.setState({ timerOn: false });
    clearInterval(this.tickInterval);
  }

  clearTimer() {
    this.setState({ 
      timerOn: false,
      seconds: 0, 
    });
    clearInterval(this.tickInterval);
  }

  render() {
    const {
      timerOn,
      seconds,
    } = this.state;
    return (
      <Timer 
        timerOn={timerOn} 
        onStartClick={this.startTimer} 
        onStopClick={this.stopTimer} 
        onClearClick={this.clearTimer} 
        seconds={seconds}
      />
    );
  }
}

export default TimerContainer;