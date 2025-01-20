import React, { useState, useEffect, useRef } from 'react';
import WIP from '../WIP';
import ContextMenu from '../ContextMenu/ContextMenu';
import { formatDate } from '../../services/utils';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  margin-top: 12px;
`;

const ProfileImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  background-color: var(--blue-button-color);
  border-radius: 50%;
  margin: 10px;
`;
const TextArea = styled.div`
  display: flex;
  flex-direction: column;
`

const Area1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
`;

const Name = styled.div`
  color: mintcream;
  margin-right: 10px;
`;

const Date = styled.p`
  font-size: 12px;
  margin: 0;
`;

const MessageBox = ({ data }) => {
  const messageBoxRef = useRef(null);
  return (
    <Box ref={messageBoxRef}>
      <ContextMenu ParentRef={messageBoxRef} children={data.content} />
      <ProfileImg>
        <WIP size={'20'}></WIP>
      </ProfileImg>
      <TextArea>
        <Area1>
          <Name>{data.user_id}</Name>
          <Date>{formatDate(data.created_at)}</Date>
        </Area1>
        <>
          <div>{data.content}</div>
        </>
      </TextArea>
    </Box>
  );
};

export default MessageBox;