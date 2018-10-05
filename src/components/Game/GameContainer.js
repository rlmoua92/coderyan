import React, { Component }  from 'react';
import Game from './Game.js';
import uheprng from 'random-seed';
import { withRotateMessage } from '../../common.js';

const GameWithRotateMessage = withRotateMessage(Game);

class GameContainer extends Component {
  constructor(props) {
    super(props);

    this.randKey = this.props.match.url.replace('/','');
    const gen = uheprng.create(this.randKey);
    const firstPlayer = gen(100) % 2;

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
      timerMaxSeconds: 60,
      gameKey: 0,
      gameStarted: false,
      windowWith: 0,
      windowHeight: 0,
      revealedCards: [],
    }

    this.startGame = this.startGame.bind(this);
    this.turnEnd = this.turnEnd.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.checkWin = this.checkWin.bind(this);

    this.toggleSettings = this.toggleSettings.bind(this);
    this.toggleSpyMaster = this.toggleSpyMaster.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.setMaxTimer = this.setMaxTimer.bind(this);
    
    this.timerTick = this.timerTick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.onTimerEnd = this.onTimerEnd.bind(this);

    this.onCardClick = this.onCardClick.bind(this);

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidUpdate() {
    if (!this.state.winner) {
      this.checkWin();
    }
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
  }

  startGame() {
    this.setState({
      gameStarted: true,
    });
  }

  turnEnd() {
    this.setState(prevState => {
      return {
        isPlayerRed: !prevState.isPlayerRed
      }
    });
  }

  gameOver(value) {
    this.setState({ winner: value });
    console.log("Game Over. " + value + " TEAM WINS!")
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

  toggleSpyMaster(e) {
    this.setState({
      isSpyMaster: e.target.checked
    });
  }

  toggleTimer(e) {
    this.setState({
      useTimer: e.target.checked
    });
  }

  setMaxTimer(e) {
    let intValue = parseInt(e.target.value, 10);
    if (intValue > 0) {
      this.setState({
        timerMaxSeconds: intValue,
      });
    } else {
      this.setState({
        timerMaxSeconds: 1,
      });
    }
    this.setState(prevState => {
      return {
        timerSeconds: prevState.timerMaxSeconds
      }
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
      timerSeconds: this.state.timerMaxSeconds, 
    });
    clearInterval(this.timerTickInterval);
  }

  onCardClick(e, color, index) {
    const current_player = this.state.isPlayerRed ? 'red' : 'blue';
    if (color === 'red' || color === 'blue') {
      this.setState(prevState => {
        return {
          score: {
            ...prevState.score,
            [color]: prevState.score[color] + 1,
            }
        }
      });
    }
    if (color === 'black') {
      const winner = this.state.isPlayerRed ? 'BLUE' : 'RED';
      this.gameOver(winner);
    }
    if (color !== current_player.toLowerCase()) {
      this.state.timerOn ? this.clearTimer() : this.turnEnd();
    }

    this.setState(prevState => {
      let prevCards = prevState.revealedCards.slice();
      prevCards.push(index);
      return {
        revealedCards: prevCards
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
      timerMaxSeconds,
      gameKey,
      gameStarted,
      windowWidth,
      windowHeight,
      revealedCards
    } = this.state;

    return (
      <GameWithRotateMessage 
        key={gameKey}
        isPlayerRed={isPlayerRed} 
        isSpyMaster={isSpyMaster}
        score={score} 
        redTotal={winConditions.red}
        blueTotal={winConditions.blue}
        winner={winner}
        height={height}
        width={width}
        gameStarted={gameStarted}
        startGame={this.startGame}
        onCardClick={this.onCardClick} 
        onEndTurnClick={this.turnEnd} 
        showSettings={showSettings}
        toggleSettings={this.toggleSettings}
        onSpyMasterClick={this.toggleSpyMaster}
        useTimer={useTimer}
        timerOn={timerOn}
        timerSeconds={timerSeconds}
        timerMaxSeconds={timerMaxSeconds}
        onTimerMaxChange={this.setMaxTimer}
        onTimerCheck={this.toggleTimer}
        onTimerEnd={this.onTimerEnd}
        startTimer={this.startTimer}
        stopTimer={this.stopTimer}
        clearTimer={this.clearTimer}
        randKey={this.randKey}
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        revealedCards={revealedCards}
      />
    );
  }
}

export default GameContainer;