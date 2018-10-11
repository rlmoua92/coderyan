import GameSettings from './GameSettings.js';
import { connect } from 'react-redux';
import { 
  toggleSettings,
  startGame,
  toggleSpymaster,
  setTimerMaxSeconds,
  toggleUseTimer,
} from '../../actions';

const mapStateToProps = (state, ownProps) => { 
  return {
    isSpyMaster: state.spymaster,
    gameStarted: state.gameStarted,
    useTimer: state.useTimer,
    timerMaxSeconds: state.timerMaxSeconds,
    isHome: window.location.pathname === "/"
  }
};

const mapDispatchToProps = dispatch => ({
  toggleSettings: () => dispatch(toggleSettings()),
  startGame: () => dispatch(startGame()),
  onSpyMasterClick: () => dispatch(toggleSpymaster()),
  onTimerMaxChange: (e) => dispatch(setTimerMaxSeconds(e.target.value)),
  onTimerCheck: () => dispatch(toggleUseTimer()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameSettings);