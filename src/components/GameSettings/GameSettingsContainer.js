import React from "react";
import GameSettings from './GameSettings.js';
import { connect } from 'react-redux';
import { 
  toggleSettings,
  toggleSpymaster,
  setGameType,
} from '../../actions';
import { updateRoomData, setMaxSeconds } from '../../common';

const GameSettingsContainer = (props) => {
  const {
    isSpyMaster,
    gameStarted,
    useTimer,
    isHome,
    gameType,
    toggleSettings,
    timerMaxSeconds,
    onSpyMasterClick,
    onGameTypeChange,
    roomKey,
  } = props;
  

  return (
    <GameSettings
      isSpyMaster={isSpyMaster}
      gameStarted={gameStarted}
      useTimer={useTimer}
      timerMaxSeconds={timerMaxSeconds}
      isHome={isHome}
      gameType={gameType}
      toggleSettings={toggleSettings}
      onSpyMasterClick={onSpyMasterClick}
      onTimerMaxChange={(e) => setMaxSeconds(roomKey, e.target.value)}
      onTimerCheck={() => updateRoomData(roomKey, 'useTimer', !useTimer)}
      onGameTypeChange={onGameTypeChange}
      startGame={() => updateRoomData(roomKey, 'gameStarted', true)}
    />
  );
};

const mapStateToProps = (state, ownProps) => { 
  return {
    isSpyMaster: state.spymaster,
    gameStarted: state.gameStarted,
    useTimer: state.useTimer,
    timerMaxSeconds: state.timerMaxSeconds,
    isHome: window.location.pathname === "/",
    gameType: state.gameType,
    roomKey: state.roomKey,
  }
};

const mapDispatchToProps = dispatch => ({
  toggleSettings: () => dispatch(toggleSettings()),
  onSpyMasterClick: () => dispatch(toggleSpymaster()),
  onGameTypeChange: (e) => dispatch(setGameType(e.target.value)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameSettingsContainer);