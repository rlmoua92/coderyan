import React from "react";
import Timer from './Timer.js';
import './Timer.scss';
import { connect } from 'react-redux';
import { 
	startTimer,
	stopTimer,
	clearTimer,
} from '../../common';

const TimerContainer = (props) => {
  const {
    timerMaxSeconds,
    seconds,
    timerOn,
    isSpymaster,
    roomKey,
    player,
  } = props;
  

  return (
    <Timer
      seconds={seconds}
      timerOn={timerOn}
      isSpymaster={isSpymaster}
      onStopClick={() => {if (!isSpymaster) stopTimer(roomKey, timerOn, isSpymaster, timerMaxSeconds, player)}}
      onClearClick={() => {if (!isSpymaster) clearTimer(roomKey, timerOn, isSpymaster, timerMaxSeconds, player)}}
      onStartClick={() => {if (!isSpymaster) startTimer(roomKey, timerOn, isSpymaster, timerMaxSeconds, player)}}
    />
  );
};

const mapStateToProps = (state, ownProps) => { 
  return {
    seconds: state.timerSeconds,
    timerOn: state.timerOn,
    isSpymaster: state.spymaster,
    roomKey: state.roomKey,
    timerMaxSeconds: state.timerMaxSeconds,
    player: state.player,
  }
};


export default connect(
  mapStateToProps
)(TimerContainer);