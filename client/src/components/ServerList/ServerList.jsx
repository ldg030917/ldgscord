import React, { useState, useEffect } from 'react';
import ServerButton from '../ServerButton/ServerButton';
import { getServers } from '../../services/api';
import './ServerList.css';

function ServerList() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    const fetchServers = async () => {
      const data = await getServers();
      setServers(data);
      console.log(data);
    };
    fetchServers();
  }, []);

  return (
    <div className="server-list">
      <ServerButton server={{id: '@me', servername: 'D'}} />
      <></>
      {servers.map((server) => (
        <ServerButton key={server.id} server={server} />
      ))}
      <></>
      <ServerButton server={{id: 'AAAAAAAAAAAA', servername: '+'}}/>
    </div>
  );
}

export default ServerList;

