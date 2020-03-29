import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home.js';
import { 
  setRoomKeyInput,
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
  return {
    randKey: state.roomKeyInput,
    gameType: state.gameType,
  }
};

const mapDispatchToProps = dispatch => ({
  onRoomKeyChange: (e) => dispatch(setRoomKeyInput(e.target.value)),
  onStartGame: () => dispatch(homeStartGame()),
  newGame: () => dispatch(newGame()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);