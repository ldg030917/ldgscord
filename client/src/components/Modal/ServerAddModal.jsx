import React, { useState } from "react";
import Modal from "./Modal";
import Input from "../Input/Input";
import { createServer } from "../../services/api";
import { useNavigate } from "react-router-dom";

function ServerAddModal({ showModal, closeModal }) {
  const navigate = useNavigate();
  const [servername, SetServername] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    const data = {
      servername: servername,
    };

    const response = await createServer(data);

    navigate(`/channels/${response.server_id}`);
    closeModal();
  }

  return(
    <Modal showModal={showModal} closeModal={closeModal}>
      <h1>서버 생성</h1>
      <Input 
        value={servername}
        onChange={(e) => SetServername(e.target.value)}
        type="text"
      />
      <button onClick={handleSubmit}>생성</button>
    </Modal>
  )
}

export default ServerAddModal;