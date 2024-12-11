import React, { useState } from "react";
import RoundButton from "./RoundButton";
import ServerAddModal from "../Modal/ServerAddModal";
import { IoIosAdd } from "react-icons/io";
import './ServerAddButton.css';

function ServerAddButton() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  return(
    <>
      <RoundButton onClick={openModal} className="server-add-button">
        <IoIosAdd size={30}/>
      </RoundButton>
      <ServerAddModal showModal={showModal} closeModal={closeModal} />
    </>
  );
};

export default ServerAddButton;