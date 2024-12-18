import React, { useState } from "react";
import Modal from "./Modal";
import Input from "../Input/Input";
import { createServer, createChannel } from "../../services/api";
import { useNavigate } from "react-router-dom";
import BasicButton from "../BasicButton/BasicButton";

function ServerAddModal({ showModal, closeModal }) {
  const navigate = useNavigate();
  const [serverName, SetServerName] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    const data = {
      name: serverName,
    };

    const serverRes = await createServer(data);
    const channelRes = await createChannel(null, serverRes.server_id);

    navigate(`/channels/${serverRes.server_id}/${channelRes.channel_id}`);
    closeModal();
  }

  return(
    <Modal showModal={showModal} closeModal={closeModal}>
      <h1>서버 생성</h1>
      <Input 
        value={serverName}
        placeholder={"My Server"}
        onChange={(e) => SetServerName(e.target.value)}
        type="text"
      />
      <BasicButton onClick={handleSubmit}>생성</BasicButton>
    </Modal>
  )
}

export default ServerAddModal;