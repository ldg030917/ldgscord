import React, { useState } from "react";
import styled from "styled-components";
import MenuButton from "../MenuButton.jsx/MenuButton";
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import BasicButton from "../BasicButton/BasicButton";
import { createChannel } from "../../services/api";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ConfigPage from "../ConfigPage/ConfigPage";

const Menu = styled.div`
  position: absolute;
  top: 120%;
  left: 50%;
  width: 90%;
  height: auto;
  transform: translate(-50%, 0);
  margin: 0%;
  background-color: var(--bg-color-5);
  z-index: 5;
  padding: 10px 8px;
  display: flex;
  flex-direction: column;
`;

const DivBar = styled.div`
  height: 1px;
  width: 95%;
  background-color: var(--div-bar-color);
  margin: 4px auto;
`

const ServerHeaderMenu = ({ showMenu, closeMenu }) => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  const handleInvite = (e) => {
    setShowInviteModal(true);
    console.log('Invite!');
  };

  const handleSetting = (e) => {
    //e.stopPropagation();
    setShowConfig(true);
  };

  const handleCreateChannel = () => {
    setShowCreateChannelModal(true);
  };

  const handleServerProfile = () => {

  };

  return (
    <>
      {showMenu &&
      <Menu onClick={closeMenu}>
        <MenuButton text={'초대하기'} onClick={handleInvite} />
        <MenuButton text={'서버 설정'} onClick={handleSetting} />
        <MenuButton text={'채널 만들기'} onClick={handleCreateChannel}/>
        <DivBar/>
        <MenuButton text={'알림 설정'} onClick={(e) => e.stopPropagation()}/>
        <DivBar/>
        <MenuButton text={'서버 프로필 편집'} onClick={handleServerProfile}/>
      </Menu>
      }
      <ConfigPage showPage={showConfig} closePage={() => setShowConfig(false)}/>
      <ServerInviteModal showModal={showInviteModal} closeModal={() => setShowInviteModal(false)}/>
      <CreateChannelModal showModal={showCreateChannelModal} closeModal={() => setShowCreateChannelModal(false)}/>
    </>
  )
}

export default ServerHeaderMenu;

const ServerInviteModal = ({ showModal, closeModal }) => {
  const serverName = 'server.current.name';

  const handleSubmit = async(e) => {
    e.preventDefault();
    closeModal();
  }

  return(
    <Modal showModal={showModal} closeModal={closeModal}>
      <p>{`친구를 ${serverName} 그룹으로 초대하기`}</p>
      
      <p>또는 친구에게 서버 초대 링크 전송하기</p>
      
    </Modal>
  )
};

const CreateChannelModal = ({ showModal, closeModal }) => {
  const [channelName, setChannelName] = useState('');
  const navigate = useNavigate();
  const { serverId } = useParams();

  const handleSubmit = async () => {
    
    const data = {
      name: channelName,
    };
    try {
      const res = await createChannel(data, serverId);
      navigate(`/channels/${serverId}/${res.channelId}`);
    } catch (error) {
      console.error(error);
    }
    closeModal();
  }

  return(
    <Modal showModal={showModal} closeModal={closeModal}>
      <h1>채널 만들기</h1>
      <Input 
        label={'채널 이름'}
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        type="text"
        placeholder={'새로운 채널'}
      />
      <BasicButton onClick={handleSubmit}>채널 만들기</BasicButton>
    </Modal>
  )
};