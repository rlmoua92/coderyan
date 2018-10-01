import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Board from './Board.js';

const cards = [
  {value: "CARD", color: "red"},{value: "CARD", color: "blue"},{value: "CARD", color: "black"},{value: "CARD", color: "blue"},{value: "CARD", color: "neutral"},
  {value: "CARD", color: "blue"},{value: "CARD", color: "neutral"},{value: "CARD", color: "blue"},{value: "CARD", color: "red"},{value: "CARD", color: "neutral"},
  {value: "CARD", color: "blue"},{value: "CARD", color: "neutral"},{value: "CARD", color: "red"},{value: "CARD", color: "blue"},{value: "CARD", color: "red"},
  {value: "CARD", color: "neutral"},{value: "CARD", color: "red"},{value: "CARD", color: "red"},{value: "CARD", color: "red"},{value: "CARD", color: "neutral"},
  {value: "CARD", color: "red"},{value: "CARD", color: "blue"},{value: "CARD", color: "blue"},{value: "CARD", color: "neutral"},{value: "CARD", color: "red"},
];

class BoardContainer extends Component {
  render() {
    const { height, width } = this.props;
    return (
      <Board 
        height={height} 
        width={width} 
        cards={cards} 
        onCardClick={this.props.onCardClick} 
        isSpyMaster={this.props.isSpyMaster} 
        winner={this.props.winner}
      />
    );
  }
}

BoardContainer.defaultProps = {
  height: 5,
  width: 5
};

export default BoardContainer;