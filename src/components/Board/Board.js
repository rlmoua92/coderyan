import React, { Component } from 'react';
import Card from '../Card';
import './Board.scss';

class Board extends Component {
  generateBoard() {
    const { 
      height, 
      width, 
      cards,
      isSpyMaster,
    } = this.props;

    let board = [];
    
    for (let i = 0; i < height; i++) {
      let children = [];
      for (let j = 0; j < width; j++) {
        let card = cards[(i * height) + j]
        children.push(
          <Card 
            key={j} 
            value={card.value} 
            team={card.team} 
            cardIndex={card.cardIndex}
            isHidden={card.isHidden}
            isSpyMaster={isSpyMaster}
          />);
      }
      board.push(<div className="board-row" key={i}>{children}</div>);
    }
    return board;
  }

  render() {
    const {
      isSpyMaster
    } = this.props;

    return (
      <div className={`board ${ isSpyMaster ? 'board--spymaster' : '' }`}>
        {this.generateBoard()}
      </div>
    );
  }
}

export default Board;