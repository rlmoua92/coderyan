import React, { Component } from 'react';
import Home from './Home.js';
import { connect } from 'react-redux';
import { 
	setRoomKey,
	homeStartGame,
  newGame,
 } from '../../actions';

class HomeContainer extends Component {

  componentDidMount(){
    this.props.newGame();
  }

  render() {
    const {
      randKey,
      gameType,
      onRoomKeyChange,
      onStartGame,
    } = this.props;
    return (
      <Home 
        randKey={randKey}
        gameType={gameType}
        onRoomKeyChange={onRoomKeyChange}
        onStartGame={onStartGame}
      />
    );
  }
}

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
)(HomeContainer);