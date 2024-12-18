import React, { useState, useEffect } from 'react';
import ServerButton from '../RoundButton/ServerButton';
import ServerAddButton from '../RoundButton/ServerAddButton';
import { getServers } from '../../services/api';
import './ServerList.css';
import { FaDiscord } from "react-icons/fa";

function ServerList({ servers }) {

  return (
    <div className="server-list">
      <ServerButton server={{id: '@me', name: <FaDiscord size={30} />}} />
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

