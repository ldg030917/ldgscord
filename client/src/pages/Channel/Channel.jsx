
// Channel.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ServerList from '../../components/ServerList/ServerList';
import ChannelList from '../../components/ChannelList/ChannelList';
import { getServers, getChannels } from '../../services/api';
import ChatBox from '../../components/ChatBox/ChatBox';
import axios from 'axios';
import './Channel.css';

function ChannelPage() {
  const { serverId, channelId } = useParams();

  const [servers, setServers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [showChannels, setShowChannels] = useState(false);
  
  const fetchServers = async () => {
    const data = await getServers();
    setServers(data);
    //console.log(data);
  };

  const fetchChannels = async (serverId) => {
    const data = await getChannels(serverId);
    setChannels(data);
    //console.log(serverId, data);
  };
  

  useEffect(() => {
    if (serverId === '@me') {
      setShowChannels(false); // @me일 때는 친구 목록
    } else {
      setShowChannels(true);  // 서버 ID가 있으면 채널 목록
    }
    fetchServers();
    fetchChannels(serverId);
  }, [serverId]);

  return (
    <div className='main-container'>
      <div className='sub-container1'>
        <ServerList servers={servers} />
      </div>
      <div className='sub-container2'>
        <div className='sub-container2-header'>

        </div>
        <div className='sub-container2-body'>
          {showChannels ? <ChannelList serverId={serverId} channels={channels} /> : <>AAAAAAAAA</>}
          <h1>{serverId}</h1>
          <h1>{channelId}</h1>
        </div>
        <div className='sub-container2-profile'>
        </div>
      </div>
      <div className='sub-container3'>
        <div className='sub-container3-header'>
        </div>
        <div className='sub-container3-body'>
          <ChatBox />
        </div>
      </div>
    </div>
  );
}

export default ChannelPage;