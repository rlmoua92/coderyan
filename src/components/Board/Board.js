import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from '../Card';

class Board extends Component {
  generateBoard() {
    const { height, width, cards } = this.props;
    let board = [];
    for (let i = 0; i < height; i++) {
      let children = [];
      for (let j = 0; j < width; j++) {
        let card = cards[(i * height) + j]
        children.push(
          <Card 
            key={j} 
            value={card.value} 
            team={card.color} 
            onCardClick={this.props.onCardClick} 
            isSpyMaster={this.props.isSpyMaster} 
            winner={this.props.winner}
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