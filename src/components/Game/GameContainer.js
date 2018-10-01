import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import Game from './Game.js';

class GameContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: {
        red: 0,
        blue: 0
      },
      isPlayerRed: null,
    }

    this.onCardClick = this.onCardClick.bind(this);
  }

  componentDidMount() {
    this.setState({ isPlayerRed: true });
  }

  onCardClick(e, value) {
    console.log(value);
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
  }

  render() {
    const { score, isPlayerRed } = this.state;
    return (
      <Game isPlayerRed={isPlayerRed} score={score} onCardClick={this.onCardClick} />
    );
  }
}

export default GameContainer;