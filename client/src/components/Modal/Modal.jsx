// Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ showModal, closeModal }) => {
  if (!showModal) return null;

  return (
    <div className='modal-overay' onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}>&times;</button>
        <h2>서버 추가</h2>
        <form>
          <input type="text" placeholder="서버 이름" />
          <button type="submit">추가</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
