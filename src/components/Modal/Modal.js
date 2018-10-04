import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Modal.scss';

const Modal = (props) => {
  const {
    showModal,
    enableClosing,
    toggleModal,
    modalContent,
    buttonContent,
  } = props;
  
  return (
    <div className="modal">
      {showModal ?
        <div className="modal-container">
          <div className="modal-content">
            {enableClosing ?
              <button className="modal-button" onClick={toggleModal}><FontAwesomeIcon icon={faTimes} /></button> :
            null}
            {modalContent}
          </div>
        </div> :
        null
      }
      <div className="modal-button-container">
        <button className="modal-button" onClick={toggleModal}>{buttonContent}</button>
      </div>
    </div>
  );
};

export default Modal;