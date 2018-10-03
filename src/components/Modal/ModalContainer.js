import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
    return (
      <Modal 
        showModal={this.props.showModal} 
        modalContent={this.props.modalContent}
        buttonContent={this.props.buttonContent} 
        toggleModal={this.props.toggleModal} 
        enableClosing={this.props.enableClosing} />
    );
  }
}

export default ModalContainer;