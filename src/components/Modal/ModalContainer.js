import Modal from './Modal.js';
import { connect } from 'react-redux';
import { 
  toggleSettings,
  modalClick,
} from '../../actions';

const mapStateToProps = (state, ownProps) => { 
  return {
    showModal: state.settings,
    modalContent: ownProps.modalContent,
    buttonContent: ownProps.buttonContent,
    enableClosing: state.gameStarted,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleModal: () => dispatch(toggleSettings()),
  onModalClick: (e) => dispatch(modalClick(e)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);