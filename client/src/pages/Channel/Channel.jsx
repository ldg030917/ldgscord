
// Channel.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ServerList from '../../components/ServerList/ServerList';
import ChannelList from '../../components/ChannelList/ChannelList';
import axios from 'axios';
import './Channel.css';

function ChannelPage() {
  const { serverId } = useParams();

  const [showChannels, setShowChannels] = useState(false);

  useEffect(() => {
    if (serverId === '@me') {
      setShowChannels(false); // @me일 때는 친구 목록
    } else {
      setShowChannels(true);  // 서버 ID가 있으면 채널 목록
    }
  }, [serverId]);

  return (
    <div className='main-container'>
      <div className='sub-container1'>
        <ServerList />
      </div>
      <div className='sub-container2'>
        <div className='sub-container2-header'>

        </div>
        <div className='sub-container2-body'>
          {showChannels ? <ChannelList /> : <>AAAAAAAAA</>}
        </div>
        <div className='sub-container2-profile'>

        </div>
      </div>
      <div className='sub-container3'>
        <div className='sub-container3-header'>

        </div>
        <div className='sub-container3-body'>

        </div>
      </div>
    </div>
  );
}

export default ChannelPage;