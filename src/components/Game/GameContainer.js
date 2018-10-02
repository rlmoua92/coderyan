import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import Game from './Game.js';
import { getRandomInt } from '../../common.js';

class GameContainer extends Component {
  constructor(props) {
    super(props);

    const firstPlayer = getRandomInt(0, 100) % 2;

    this.state = {
      score: {
        red: 0,
        blue: 0
      },
      isPlayerRed: firstPlayer,
      isSpyMaster: false,
      winner: null,
      useTimer: true,
      winConditions: {
        red: firstPlayer ? 9 : 8,
        blue: firstPlayer ? 8 : 9
      },
      height: 5,
      width: 5,
    }

    this.onCardClick = this.onCardClick.bind(this);
    this.turnEnd = this.turnEnd.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.toggleSpyMaster = this.toggleSpyMaster.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.handleTimerChange = this.handleTimerChange.bind(this);
  }

  componentDidUpdate() {
    if (!this.state.winner) {
      this.checkWin();
    }
  }

  onCardClick(e, value) {
    const current_player = this.state.isPlayerRed ? 'red' : 'blue';
    if (value === 'red' || value === 'blue') {
      this.setState(prevState => {
        return {
          score: {
            ...prevState.score,
            [value]: prevState.score[value] + 1,
            }
        }
      });
    }
    if (value === 'black') {
      const winner = this.state.isPlayerRed ? 'BLUE' : 'RED';
      this.gameOver(winner);
    }
    if (value !== current_player.toLowerCase()) {
      this.turnEnd();
    }
  }

  turnEnd() {
    this.setState(prevState => {
      return {
        isPlayerRed: !prevState.isPlayerRed
      }
    });
  }

  toggleSpyMaster(e) {
    this.setState({
      isSpyMaster: e.target.checked
    });
  }

  handleTimerChange(e) {
    this.setState({
      useTimer: e.target.checked
    });
  }

  checkWin() {
    if (this.state.score.red === this.state.winConditions.red) {
      this.setState( { winner: 'red '});
      this.gameOver('RED');
    }
    if (this.state.score.blue === this.state.winConditions.blue) {
      this.setState( { winner: 'blue' });
      this.gameOver('BLUE');
    }
  }

  gameOver(value) {
    this.setState({ winner: value });
    console.log("Game Over. " + value + " TEAM WINS!")
  }

  render() {
    const { 
      score, 
      isPlayerRed, 
      isSpyMaster, 
      winner, 
      useTimer, 
      winConditions, 
      height, 
      width 
    } = this.state;

    return (
      <Game 
        isPlayerRed={isPlayerRed} 
        isSpyMaster={isSpyMaster}
        score={score} 
        onCardClick={this.onCardClick} 
        onEndTurnClick={this.turnEnd} 
        onSpyMasterClick={this.toggleSpyMaster}
        winner={winner}
        useTimer={useTimer}
        handleTimerChange={this.handleTimerChange}
        redTotal={winConditions.red}
        blueTotal={winConditions.blue}
        height={height}
        width={width}
      />
    );
  }
}

export default GameContainer;