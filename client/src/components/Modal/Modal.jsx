// Modal.js
import React from 'react';
import './Modal.css';
import { IoClose } from "react-icons/io5";


const Modal = ({ showModal, closeModal, children }) => {
  if (!showModal) return null;
  
  const handleClickOveray = (e) => {
    e.stopPropagation();
    closeModal();
  };

  return (
    <div className='modal-overay' onClick={handleClickOveray}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}><IoClose /></button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
