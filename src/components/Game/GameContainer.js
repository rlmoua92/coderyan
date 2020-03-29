import React, { Component } from "react";
import Game from "./Game.js";
import { withRotateMessage, checkIfRoomExists, initializeGame, linkToDatabase } from "../../common.js";
import { connect } from "react-redux";
import { togglePlayer, setRoomLoading, setSettings, updateStore } from "../../actions";

const GameWithRotateMessage = withRotateMessage(Game);

class GameContainer extends Component {
  constructor(props) {
    super(props);
    props.setRoomLoading(true);
    props.setSettings(true);
  }

  async componentDidMount() {
    const {
      randKey,
      updateStore,
      setRoomLoading
    } = this.props;

    const roomExists = await checkIfRoomExists(randKey);
    if (!roomExists) {
      initializeGame(randKey);
    }
    linkToDatabase(randKey, updateStore);
    setRoomLoading(false);
  }

  render() {
    const {
      isLoading,
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
      cards
    } = this.props;

    return (
      <GameWithRotateMessage
        isLoading={isLoading}
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
    isLoading: state.roomLoading,
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
    cards: state.cards
  };
};

const mapDispatchToProps = dispatch => ({
  onEndTurnClick: () => dispatch(togglePlayer()),
  setRoomLoading: isLoading => dispatch(setRoomLoading(isLoading)),
  setSettings: (showSettings) => dispatch(setSettings(showSettings)),
  updateStore: (data) => dispatch(updateStore(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
