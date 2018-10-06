import Home from './Home.js';
import { connect } from 'react-redux';
import { setRoomKey } from '../../actions';

const mapStateToProps = state => { 
  return {
    randKey: state.roomKey
  }
};

const mapDispatchToProps = dispatch => ({
  onRoomKeyChange: (e) => dispatch(setRoomKey(e.target.value))
});

export default connect(
   mapStateToProps,
  mapDispatchToProps
)(Home);