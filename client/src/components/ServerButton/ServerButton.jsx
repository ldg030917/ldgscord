import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ServerButton.css';

function ServerButton({ server }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/channels/${server.id}`);
  };

  return (
    <div className="server-button" onClick={handleClick}>
      {server.servername}
    </div>
  );
}

export default ServerButton;
