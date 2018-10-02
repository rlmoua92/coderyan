import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Modal.scss';

const Modal = (props) => {
	return (
		<div className="modal">
        	{props.showModal ?
        	  <div className="modal-container">
        	  	<div className="modal-content">
        	  		<button className="modal-button" onClick={props.onButtonClick}><FontAwesomeIcon icon={faTimes} /></button>
        	    	{props.modalContent}
        	    </div>
        	  </div> :
        	  null
        	}
        	<div className="modal-button-container">
        		<button className="modal-button" onClick={props.onButtonClick}>{props.buttonContent}</button>
        	</div>
        </div>
	);
};

export default Modal;