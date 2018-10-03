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
            {props.enableClosing ?
              <button className="modal-button" onClick={props.toggleModal}><FontAwesomeIcon icon={faTimes} /></button> :
            null}
            {props.modalContent}
          </div>
        </div> :
        null
      }
      <div className="modal-button-container">
        <button className="modal-button" onClick={props.toggleModal}>{props.buttonContent}</button>
      </div>
    </div>
  );
};

export default Modal;