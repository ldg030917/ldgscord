import React from "react";
import './input.css';

function Input({ value, onChange, type = 'text', placeholder }) {
  return (
    <div className="input-container">
      <input
        className="input-space"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default Input;