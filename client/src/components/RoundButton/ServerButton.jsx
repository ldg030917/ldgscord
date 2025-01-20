import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RoundButton from './RoundButton';
import ContextMenu from '../ContextMenu/ContextMenu';

function ServerButton({ server }) {
  const navigate = useNavigate();
  const serverButtonRef = useRef(null);

  const handleClick = () => {
    navigate(`/channels/${server.id}`);
  };

  return (
    <RoundButton ref={serverButtonRef} onClick={handleClick} >
      <ContextMenu ParentRef={serverButtonRef} />
      {server.name}
    </RoundButton>
  );
}

export default ServerButton;
