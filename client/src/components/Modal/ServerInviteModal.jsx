import React, { useState } from "react";
import Modal from "./Modal";
import Input from "../Input/Input";
import {  } from "../../services/api";
import BasicButton from "../BasicButton/BasicButton";

function ServerInviteModal({ showModal, closeModal }) {
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
}

export default ServerInviteModal;