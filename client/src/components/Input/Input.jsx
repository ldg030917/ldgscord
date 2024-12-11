import React from "react";
import './input.css';

function Input({ label, value, onChange, type = 'text', placeholder }) {
  return (
    <div>
      <label className="input-label">{label}</label>
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