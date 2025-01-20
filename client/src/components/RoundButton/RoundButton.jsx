import React, { forwardRef } from 'react';
import './RoundButton.css';

const RoundButton = forwardRef(({ onClick, children, className, onContextMenu }, ref) => {
  return (
    <button ref={ref} className={`round-button ${className}`} onClick={onClick} onContextMenu={onContextMenu}>
      {children}
    </button>
  );
});

export default RoundButton;
