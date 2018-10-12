import Timer from './Timer.js';
import './Timer.scss';
import { connect } from 'react-redux';
import { 
	startTimer,
	stopTimer,
	clearTimer,
} from '../../actions';

const mapStateToProps = (state, ownProps) => { 
  return {
    seconds: state.timerSeconds,
    timerOn: state.timerOn,
    isSpymaster: state.spymaster,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onStartClick: () => dispatch(startTimer()),
  onStopClick: () => dispatch(stopTimer()),
  onClearClick: () => dispatch(clearTimer()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer);