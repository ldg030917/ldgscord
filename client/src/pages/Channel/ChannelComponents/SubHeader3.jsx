import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 48px;
  border-bottom: 1px solid rgba(27, 27, 27, 0.829);
  color: #ffffff99;
  padding: 10px;
  box-sizing: border-box;
`;

const Profile = styled.div`
  
`;

const StyledButton = styled.button`
  color: ${(props) => (props.$color ? (props.$active ? props.$color : 'white') : 'inherit')};
  margin: 5px;
  font-size: 16px;
  border-radius: 5px;
  box-shadow: none;
  border: none;
  filter: ${(props) => (props.$active && !props.$color ? 'brightness(1.5)' : 'brightness(1)')};
  background-color: ${(props) => (props.$active ? 'inherit' : props.$color)};

  &:hover{
    filter: ${(props) => (props.$color ? 'brightness(1)' : 'brightness(1.2)')};
  }
`;

const SubHeader3 = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const { serverId, channelId } = useParams();

  const handleClick = (index) => {
    setActiveIndex(index);
  }

  return (
    <Box>
      {serverId ==='@me' && channelId == null && <>
        <Profile>{'친구'}</Profile>
        <StyledButton 
          index={1}
          $active={activeIndex === 1}
          onClick={()=>handleClick(1)}
        >
            온라인
        </StyledButton>
        <StyledButton 
          index={2}
          $active={activeIndex === 2}
          onClick={()=>handleClick(2)}
        >
            모두
        </StyledButton>
        <StyledButton
          index={3}
          $active={activeIndex === 3}
          onClick={()=>handleClick(3)}
        >
            대기 중
        </StyledButton>
        <StyledButton
          index={4}
          $active={activeIndex === 4}
          onClick={()=>handleClick(4)}
        >
            차단 목록
        </StyledButton>
        <StyledButton
          index={5}
          $active={activeIndex === 5}
          $color={'#0c800c'}
          onClick={()=>handleClick(5)}
        >
            친구 추가하기
        </StyledButton>
      </>}
      {serverId !== '@me' && channelId && <>
        <>{`#${channelId}`}</>
      </>}
    </Box>
  );
};

export default SubHeader3;