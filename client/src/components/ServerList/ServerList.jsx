import React, { useState, useEffect } from 'react';
import ServerButton from '../RoundButton/ServerButton';
import ServerAddButton from '../RoundButton/ServerAddButton';
import { getServers } from '../../services/api';
import './ServerList.css';
import { FaDiscord } from "react-icons/fa";

function ServerList() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    const fetchServers = async () => {
      const data = await getServers();
      setServers(data);
      //console.log(data);
    };
    fetchServers();
  });

  return (
    <div className="server-list">
      <ServerButton server={{id: '@me', servername: <FaDiscord size={30} />}} />
      <></>
      {servers.map((server) => (
        <ServerButton key={server.id} server={server} />
      ))}
      <></>
      <ServerAddButton />
    </div>
  );
}

export default ServerList;

