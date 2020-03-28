import Board from './Board.js';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => { 
  return {
    height: state.gameHeight,
    width: state.gameWidth,
    cards: state.cards,
    isSpyMaster: state.spymaster,
  }
};

export default connect(
  mapStateToProps
)(Board);