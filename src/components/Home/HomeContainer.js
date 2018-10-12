import Home from './Home.js';
import { connect } from 'react-redux';
import { 
	setRoomKey,
	homeStartGame,
  newGame,
 } from '../../actions';

const mapStateToProps = state => { 
  console.log(state);
  return {
    randKey: state.roomKey,
    gameType: state.gameType,
  }
};

const mapDispatchToProps = dispatch => ({
  onRoomKeyChange: (e) => dispatch(setRoomKey(e.target.value)),
  onStartGame: () => dispatch(homeStartGame()),
  newGame: () => dispatch(newGame()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);