import React, { Component } from 'react';
import Card from '../Card';
import './Board.scss';

class Board extends Component {
  generateBoard() {
    const { 
      height, 
      width, 
      cards,
    } = this.props;

    let board = [];
    
    for (let i = 0; i < height; i++) {
      let children = [];
      for (let j = 0; j < width; j++) {
        let card = cards[(i * height) + j]
        let cardIndex = (i * width) + j;
        children.push(
          <Card 
            key={j} 
            value={card.value} 
            team={card.color} 
            cardIndex={cardIndex}
          />);
      }
      board.push(<div className="board-row" key={i}>{children}</div>);
    }
    return board;
  }

  render() {
    return (
      <div className="board">
        {this.generateBoard()}
      </div>
    );
  }
}

export default Board;