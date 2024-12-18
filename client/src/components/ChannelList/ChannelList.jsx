import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import BasicButton from "../BasicButton/BasicButton";
import './ChannelList.css';

function ChannelList({ serverId, channels }) {
  const navigate = useNavigate();

  const handleClick = (channelId) => {
    navigate(`/channels/${serverId}/${channelId}`);
  };

  return (
    <div className="channel-list">
      {channels.map((channel) => (
        <BasicButton isBlue={false} key={channel.id} onClick={() => handleClick(channel.id)}>{channel.name}</BasicButton>
      ))}
    </div>
  );
}

export default ChannelList;