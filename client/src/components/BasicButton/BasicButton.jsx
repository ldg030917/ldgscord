import React from 'react';
import './BasicButton.css';

const BasicButton = ({ isBlue=true, onClick, type, children, className }) => {
  const buttonClass = isBlue ? "button-blue" : "button-gray";
  return (
    <button className={`basic-button ${buttonClass} ${className}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default BasicButton;