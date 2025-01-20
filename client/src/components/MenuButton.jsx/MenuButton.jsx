import React from "react";
import styled from "styled-components";

const Button = styled.div`
  position: relative;
  background-color: transparent;
  box-sizing: border-box;
  height: 35px;
  padding: 6px 6px;
  border-radius: 2px;

  &:hover {
    background-color: var(--blue-button-color);
  }
`
const Text = styled.div`
  background-color: transparent;
  position: absolute;
  top: 50%;
  height: auto;
  margin: 0;
  transform: translate(0, -50%);
  font-size: 14px;
  box-sizing: border-box;
  user-select: none;
  pointer-events: none;
`
const Icon = styled.div`
  position: absolute;
  top: 50%;
  left: 85%;
  margin: 0;
  transform: translate(0, -50%);
`

/** colorType: default, red, blue */
const MenuButton = ({ text, icon, colorType, onClick }) => {
  return (
    <Button onClick={onClick}>
      <Text>{text}</Text>
      <Icon>{icon}</Icon>
    </Button>
  )
}

export default MenuButton;