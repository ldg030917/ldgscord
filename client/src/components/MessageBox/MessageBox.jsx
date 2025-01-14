import React, { useState, useEffect, useRef } from 'react';
import WIP from '../WIP';
import ContextMenu from '../ContextMenu/ContextMenu';
import './MessageBox.css';

function MessageBox({ data }) {
  const messageBoxRef = useRef(null);
  return (
    <div className='message-box' ref={messageBoxRef}>
      <ContextMenu ParentRef={messageBoxRef} />
      <div className='profile-img'>
        {data.user_id}
        <WIP></WIP>
      </div>
      <div className='text-area'>
        <div>{data.created_at}</div>
        <div>{data.content}</div>
      </div>
    </div>
  );
};

export default MessageBox;