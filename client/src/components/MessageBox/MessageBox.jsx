import React, { useState, useEffect } from 'react';
import { FaDiscord } from "react-icons/fa";
import './MessageBox.css';

function MessageBox({data}) {

  return (
    <div className='message-box'>
      <div className='profile-img'>
        {data.user_id}
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