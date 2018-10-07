import Card from './Card.js';
import { connect } from 'react-redux';
import { addRevealedCards } from '../../actions';

const mapStateToProps = (state, ownProps) => { 
  return {
    value: ownProps.value,
    isSpyMaster: state.spymaster,
    team: ownProps.team,
    isHidden: !state.revealedCards.includes(ownProps.cardIndex),
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(addRevealedCards(ownProps.cardIndex)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);