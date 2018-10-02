import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal.js';

class ModalContainer extends Component {
	render() {
		return (
			<Modal 
				showModal={this.props.showModal} 
				modalContent={this.props.modalContent}
				buttonContent={this.props.buttonContent} 
				onButtonClick={this.props.onButtonClick} />
		);
	}
}

export default ModalContainer;