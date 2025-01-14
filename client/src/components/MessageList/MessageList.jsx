import React, { useState, useEffect } from "react";
import { useSocket } from "../../services/socket";
import { getMessages } from "../../services/api";
import MessageBox from "../MessageBox/MessageBox";

function MessageList({ channelId }) {
  const socket = useSocket();
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.on('SEND_MESSAGE', data => {
      setMessageList((prevList) => [...prevList, data]);
      console.log('SEND_MESSAGE: ', data);
    });
    return () => {
      socket.off('SEND_MESSAGE');
    };
  }, [socket]);

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await getMessages(channelId);
      setMessageList(messages);
      console.log('messages: ', messages);
    }
    fetchMessages();
  }, [channelId]);

  return(
    <div className="message-list">
      {messageList.map((data, idx) => (
        <MessageBox key={idx} data={data} />
      ))}

    </div>
  )
};

export default MessageList;