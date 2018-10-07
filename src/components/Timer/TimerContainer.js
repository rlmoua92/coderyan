import Timer from './Timer.js';
import './Timer.scss';
import { connect } from 'react-redux';
import { toggleTimerOn } from '../../actions';

const mapStateToProps = (state, ownProps) => { 
  return {
    seconds: state.timerSeconds,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onStartClick: () => dispatch(toggleTimerOn()),
  onStopClick: () => dispatch(toggleTimerOn()),
  onClearClick: () => dispatch(toggleTimerOn()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer);