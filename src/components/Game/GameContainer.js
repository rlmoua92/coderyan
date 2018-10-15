import React, { Component } from 'react';
import Game from './Game.js';
import { withRotateMessage } from '../../common.js';
import { connect } from 'react-redux';
import { 
  initializeGame,
  togglePlayer,
} from '../../actions';

const GameWithRotateMessage = withRotateMessage(Game);

class GameContainer extends Component {
  constructor(props) {
    super(props);
    if (!props.cards[0]) {
      props.intializeGame();
    }
  }

  render() {
    const {
      isPlayerRed,
      isSpyMaster,
      score,
      winner,
      gameStarted,
      useTimer,
      randKey,
      windowWidth,
      windowHeight,
      onEndTurnClick,
      cards,
    } = this.props;

    return (
      <GameWithRotateMessage
        isPlayerRed={isPlayerRed}
        isSpyMaster={isSpyMaster}
        score={score}
        winner={winner}
        gameStarted={gameStarted}
        useTimer={useTimer}
        randKey={randKey}
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        onEndTurnClick={onEndTurnClick}
        cards={cards}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => { 
  return {
    isPlayerRed: state.player,
    isSpyMaster: state.spymaster,
    score: state.score,
    winner: state.winner,
    gameStarted: state.gameStarted,
    useTimer: state.useTimer,
    randKey: state.roomKey,
    gameType: state.gameType,
    windowWidth: state.windowWidth,
    windowHeight: state.windowHeight,
    cards: state.cards,
  }
};

const mapDispatchToProps = dispatch => ({
  onEndTurnClick: () => dispatch(togglePlayer()),
  intializeGame: () => dispatch(initializeGame()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameContainer);