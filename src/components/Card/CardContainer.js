import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import Card from './Card.js';

class CardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHidden: true,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (this.state.isHidden && !this.props.winner && !this.props.isSpyMaster && ((this.props.useTimer && this.props.timerOn) || !this.props.useTimer)) {
      this.props.onCardClick(e, this.props.team);
      this.setState({ isHidden: false });
    }
  }

  render() {
    const { isHidden } = this.state;
    const { value, team, isSpyMaster } = this.props;
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