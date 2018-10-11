import NavBar from './NavBar.js';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => { 
  return {
    leftContent: ownProps.leftContent,
    centerContent: ownProps.centerContent,
    rightContent: ownProps.rightContent,
  }
};

export default connect(
  mapStateToProps,
)(NavBar);