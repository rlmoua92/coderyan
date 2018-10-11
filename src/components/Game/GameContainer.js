import Game from './Game.js';
import { withRotateMessage } from '../../common.js';
import { connect } from 'react-redux';
import { 
  togglePlayer,
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
    randKey: state.roomKey,
    windowWidth: state.windowWidth,
    windowHeight: state.windowHeight,
  }
};

const mapDispatchToProps = dispatch => ({
  onEndTurnClick: () => dispatch(togglePlayer()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameWithRotateMessage);