import Game from './Game.js';
import { withRotateMessage } from '../../common.js';
import { connect } from 'react-redux';
import { 
  togglePlayer,
  toggleSettings,
  setGameStarted,
  toggleSpymaster,
  setTimerMaxSeconds,
  toggleUseTimer,
} from '../../actions';

const GameWithRotateMessage = withRotateMessage(Game);

const mapStateToProps = (state, ownProps) => { 
  return {
    isPlayerRed: state.player,
    isSpyMaster: state.spymaster,
    score: state.score,
    winner: state.winner,
    gameStarted: state.gameStarted,
    useTimer: state.useTimer,
    timerMaxSeconds: state.timerMaxSeconds,
    randKey: state.roomKey,
    windowWidth: state.windowWidth,
    windowHeight: state.windowHeight,
  }
};

const mapDispatchToProps = dispatch => ({
  onEndTurnClick: () => dispatch(togglePlayer()),
  toggleSettings: () => dispatch(toggleSettings()),
  startGame: () => dispatch(setGameStarted(true)),
  onSpyMasterClick: () => dispatch(toggleSpymaster()),
  onTimerMaxChange: (e) => dispatch(setTimerMaxSeconds(e.target.value)),
  onTimerCheck: () => dispatch(toggleUseTimer()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameWithRotateMessage);