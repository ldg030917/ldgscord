import React, { useState, useEffect } from 'react';
import WIP from '../WIP';
import './MessageBox.css';

function MessageBox({data}) {

  return (
    <div className='message-box'>
      <div className='profile-img'>
        {data.user_id}
        <WIP></WIP>
      </div>
      <div className='text-area'>
        <div>
          {data.created_at}
        </div>
        <div>
          {data.content}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;