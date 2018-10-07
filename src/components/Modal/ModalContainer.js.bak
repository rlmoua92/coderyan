import React, { Component } from 'react';
import Modal from './Modal.js';

class ModalContainer extends Component {
  constructor(props){
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.onClick, false);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClick, false);
  }

  onClick(e) {
    if(this.props.showModal && e.target.className === "modal-container" && this.props.enableClosing) {
      this.props.toggleModal();
    }
  }

  render() {
    const {
      showModal,
      modalContent,
      buttonContent,
      toggleModal,
      enableClosing,
    } = this.props;

    return (
      <Modal 
        showModal={showModal} 
        modalContent={modalContent}
        buttonContent={buttonContent} 
        toggleModal={toggleModal} 
        enableClosing={enableClosing} />
    );
  }
}

export default ModalContainer;