import React, { useEffect, useRef, useState } from "react"
import styled from 'styled-components';
import { FaXmark, FaAngleDown } from "react-icons/fa6";
import ServerHeaderMenu from "./ServerHeaderMenu";

const StyledHeader = styled.div`
  /* display: flex;
  flex-direction: row;
  align-items: center; */
  height: 100%;
  width: 100%;
  padding: 0px 15px;
  box-sizing: border-box;
  color: var(--basic-text-color-1);
  position: relative;
`;

const StyledText = styled.p`
  position: absolute;
  top: 50%;
  white-space: nowrap;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  transform: translate(0, -50%);
  margin: 0;
  user-select: none;
  pointer-events: none;
`;

const Icon = styled.div`
  position: absolute;
  top: 50%;
  left: 90%;
  width: 16px;
  height: 16px;
  transform: translate(-50%, -50%);
  margin: 0;
`;

const ServerHeader = ({ name }) => {
  const [isToggled, setIsToggled] = useState(false);
  //const serverHeaderRef = useRef(null);

  // const handleClick = () => {
  //   setIsToggled((prev) => !prev);
  // }

  // useEffect(() => {
  //   const handleClickOutside = (e) => {
  //     if (serverHeaderRef.current && !serverHeaderRef.current.contains(e.target)) {
  //       setIsToggled(false);
  //     }
  //   }

  //   document.addEventListener('click', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   }
  // }, []);

  return (
    <StyledHeader onClick={() => setIsToggled(!isToggled)}>
      <StyledText>{name}</StyledText>
      <Icon>{isToggled ? <FaXmark /> : <FaAngleDown />}</Icon>
      <ServerHeaderMenu showMenu={isToggled} closeMenu={() => setIsToggled(false)}/>
    </StyledHeader>
  )
}

export default ServerHeader;