import React from 'react';
import { useNavigate } from 'react-router-dom';
import RoundButton from './RoundButton';

function ServerButton({ server }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/channels/${server.id}`);
  };

  return (
    <RoundButton onClick={handleClick}>
      {server.name}
    </RoundButton>
  );
}

export default ServerButton;
