import React from "react";
import './RoundLink.module.css';

function RoundLink({ label, onClick }) {
  return (
    <button className="round-button" onClick={onClick}>
      {label}
    </button>
  )
}

export default RoundLink;