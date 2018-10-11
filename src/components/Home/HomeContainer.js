import Home from './Home.js';
import { connect } from 'react-redux';
import { 
	setRoomKey,
	homeStartGame,
	toggleSettings,
	toggleUseTimer,
	toggleSpymaster,
	setTimerMaxSeconds
 } from '../../actions';

const mapStateToProps = state => { 
  return {
    randKey: state.roomKey,
    isSpyMaster: state.spymaster,
    gameStarted: state.gameStarted,
    useTimer: state.useTimer,
    timerMaxSeconds: state.timerMaxSeconds,
  }
};

const mapDispatchToProps = dispatch => ({
  onRoomKeyChange: (e) => dispatch(setRoomKey(e.target.value)),
  onStartGame: () => dispatch(homeStartGame()),
  onSpyMasterClick: () => dispatch(toggleSpymaster()),
  onTimerMaxChange: (e) => dispatch(setTimerMaxSeconds(e.target.value)),
  onTimerCheck: () => dispatch(toggleUseTimer()),
  toggleSettings: () => dispatch(toggleSettings()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);