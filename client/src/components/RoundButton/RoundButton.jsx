import React from 'react';
import './RoundButton.css';

const RoundButton = ({ onClick, children, className, onContextMenu }) => {
  return (
    <button className={`round-button ${className}`} onClick={onClick} onContextMenu={onContextMenu}>
      {children}
    </button>
  );
};

export default RoundButton;
