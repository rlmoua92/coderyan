import React from "react";
import Card from './Card.js';
import { connect } from 'react-redux';
import { cardClick } from '../../common';

const CardContainer = (props) => {
  const {
    value,
    team,
    isHidden,
    cardIndex,
    useTimer,
    timerOn,
    player,
    spymaster,
    winner,
    roomKey,
    score,
    winConditions,
    timerMaxSeconds,
  } = props;

  return (
    <Card
      value={value}
      team={team}
      isHidden={isHidden}
      isSpyMaster={spymaster}
      onClick={() => cardClick(roomKey, isHidden, useTimer, timerOn ,spymaster, winner, cardIndex, player, team, score, winConditions, timerMaxSeconds)}
    />
  );
};

const mapStateToProps = (state, ownProps) => { 
  return {
    value: ownProps.value,
    team: ownProps.team,
    isHidden: ownProps.isHidden,
    cardIndex: ownProps.cardIndex,
    useTimer: state.useTimer, 
    timerOn: state.timerOn, 
    player: state.player,
    spymaster: state.spymaster, 
    winner: state.winner,
    roomKey: state.roomKey,
    score: state.score,
    winConditions: state.winConditions,
    timerMaxSeconds: state.timerMaxSeconds,
  }
};

export default connect(
  mapStateToProps
)(CardContainer);