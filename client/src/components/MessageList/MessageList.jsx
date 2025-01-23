import React, { useState, useEffect } from "react";
import { useSocket } from "../../services/socket";
import { getMessages } from "../../services/api";
import MessageBox from "../MessageBox/MessageBox";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const List = styled.div`
  height: 90%;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;              /* 스크롤바의 너비 */
    height: 8px;             /* 가로 스크롤바의 높이 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--bg-color-5); /* 스크롤바 핸들 색상 */
    border-radius: 10px;     /* 핸들의 둥근 모서리 */
  }

  &::-webkit-scrollbar-track {
    background-color: var(--bg-color-2); /* 스크롤바의 배경 색상 */
    border-radius: 10px;                 /* 트랙의 둥근 모서리 */
  }
`;

function MessageList() {
  const { channelId } = useParams();
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
    <List>
      {messageList.map((data, idx) => (
        <MessageBox key={idx} data={data} />
      ))}

    </List>
  )
};

export default MessageList;