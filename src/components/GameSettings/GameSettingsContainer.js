import GameSettings from './GameSettings.js';
import { connect } from 'react-redux';
import { 
  toggleSettings,
  startGame,
  toggleSpymaster,
  setTimerMaxSeconds,
  toggleUseTimer,
  setGameType,
} from '../../actions';

const mapStateToProps = (state, ownProps) => { 
  return {
    isSpyMaster: state.spymaster,
    gameStarted: state.gameStarted,
    useTimer: state.useTimer,
    timerMaxSeconds: state.timerMaxSeconds,
    isHome: window.location.pathname === "/",
    gameType: state.gameType,
  }
};

const mapDispatchToProps = dispatch => ({
  toggleSettings: () => dispatch(toggleSettings()),
  startGame: () => dispatch(startGame()),
  onSpyMasterClick: () => dispatch(toggleSpymaster()),
  onTimerMaxChange: (e) => dispatch(setTimerMaxSeconds(e.target.value)),
  onTimerCheck: () => dispatch(toggleUseTimer()),
  onGameTypeChange: (e) => dispatch(setGameType(e.target.value)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameSettings);