import React, { useEffect } from "react";
import styled, { css } from "styled-components";

const Page = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var();
  display: flex;
  z-index: 9999;
  opacity: ${(props) => (props.$active ? 1 : 0)};
  visibility: ${(props) => (props.$active ? 'visible' : 'hidden')};
  transition: opacity 0.1s ease, visibility 0.1s ease;
`;

const Index = styled.div`
  
`;

const Settings = styled.div`
  
`;


const ConfigPage = ({ showPage, closePage }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if(e.key === 'Escape') {
        closePage();
      };
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  return (
    <Page $active={showPage} onClick={(e) => e.stopPropagation()}>
      <Index></Index>
      <Settings></Settings>
    </Page>
  )
}

export default ConfigPage;