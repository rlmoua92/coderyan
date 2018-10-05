import React, { Component }  from 'react';
import Card from './Card.js';

class CardContainer extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (this.props.isHidden && !this.props.winner && !this.props.isSpyMaster && ((this.props.useTimer && this.props.timerOn) || !this.props.useTimer)) {
      this.props.onCardClick(e, this.props.team, this.props.cardIndex);
    }
  }

  render() {
    const { value, team, isSpyMaster, isHidden } = this.props;
    return (
      <Card 
        value={value} 
        isHidden={isHidden} 
        team={team} 
        isSpyMaster={isSpyMaster}
        onClick={this.onClick}
      />
    );
  }
}

CardContainer.defaultProps = {
  value: "Card"
};

export default CardContainer;