import Card from './Card.js';
import { connect } from 'react-redux';
import { cardClick } from '../../actions';

const mapStateToProps = (state, ownProps) => { 
  return {
    value: ownProps.value,
    isSpyMaster: state.spymaster,
    team: ownProps.team,
    isHidden: ownProps.isHidden,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(cardClick(ownProps.cardIndex, ownProps.team, ownProps.isHidden)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);