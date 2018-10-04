import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import Game from './Game.js';
import { getRandomInt } from '../../common.js';

function randomString(len) {
  let result = [];
  let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < len; i ++) {
    let randInd = getRandomInt(0, alpha.length);
    let randLetter = alpha[randInd];
    result.push(randLetter);
  }
  return result.join("");
}

class GameContainer extends Component {
  constructor(props) {
    super(props);

    const firstPlayer = getRandomInt(0, 100) % 2;

    const roomKey = randomString(5);

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
      showSettings: true,
      timerOn: false,
      timerSeconds: 60,
      gameKey: 0,
      gameStarted: false,
      randKey: roomKey,
    }

    this.onCardClick = this.onCardClick.bind(this);
    this.turnEnd = this.turnEnd.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.toggleSpyMaster = this.toggleSpyMaster.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.handleTimerChange = this.handleTimerChange.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.timerTick = this.timerTick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.onTimerEnd = this.onTimerEnd.bind(this);
    this.reset = this.reset.bind(this);
    this.startGame = this.startGame.bind(this);
    this.onRoomKeyChange = this.onRoomKeyChange.bind(this);
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
      this.state.timerOn ? this.clearTimer() : this.turnEnd();
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

  timerTick() {
    this.setState(prevState => {
      return {
        timerSeconds: prevState.timerSeconds - 1
      }
    });
  }

  startTimer() {
    this.setState({ timerOn: true });
    this.timerTickInterval = setInterval(this.timerTick, 1000);
  }

  stopTimer() {
    this.setState({ timerOn: false });
    clearInterval(this.timerTickInterval);
  }

  clearTimer() {
    this.setState({ 
      timerOn: false,
      timerSeconds: 0, 
    });
    clearInterval(this.timerTickInterval);
  }

  onTimerEnd() {
    this.turnEnd();
    this.setState({ 
      timerOn: false,
      timerSeconds: 60, 
    });
    clearInterval(this.timerTickInterval);
  }

  toggleSettings() {
    if (this.state.useTimer && this.state.timerOn) {
      this.stopTimer();
    }
    this.setState(prevState => {
      return {
        showSettings: !prevState.showSettings
      }
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

  startGame() {
    this.setState({
      gameStarted: true,
    });
  }

  gameOver(value) {
    this.setState({ winner: value });
    console.log("Game Over. " + value + " TEAM WINS!")
  }

  onRoomKeyChange(e) {
    this.setState({
      randKey: e.target.value
    });
  }

  reset() {
    const firstPlayer = getRandomInt(0, 100) % 2;

    this.setState({
      score: {
        red: 0,
        blue: 0
      },
      isPlayerRed: firstPlayer,
      winner: null,
      winConditions: {
        red: firstPlayer ? 9 : 8,
        blue: firstPlayer ? 8 : 9
      },
      timerOn: false,
      timerSeconds: 60,
    });

    this.setState(prevState => {
      return {
        gameKey: prevState.gameKey + 1
      }
    });
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
      width,
      showSettings,
      timerOn,
      timerSeconds,
      gameKey,
      gameStarted,
      randKey,
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
        timerOn={timerOn}
        handleTimerChange={this.handleTimerChange}
        onTimerEnd={this.onTimerEnd}
        timerSeconds={timerSeconds}
        startTimer={this.startTimer}
        stopTimer={this.stopTimer}
        clearTimer={this.clearTimer}
        redTotal={winConditions.red}
        blueTotal={winConditions.blue}
        height={height}
        width={width}
        showSettings={showSettings}
        toggleSettings={this.toggleSettings}
        onResetClick={this.reset}
        key={gameKey}
        gameStarted={gameStarted}
        startGame={this.startGame}
        randKey={randKey}
        onRoomKeyChange={this.onRoomKeyChange}
      />
    );
  }
}

export default GameContainer;