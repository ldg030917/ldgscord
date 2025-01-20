import React, { useState, useEffect, useRef } from "react";
import MenuButton from "../MenuButton.jsx/MenuButton";
import './ContextMenu.css';

function ContextMenu({ children, ParentRef }) {
  const contextMenuRef = useRef(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleClickMenu = (e) => {
    e.stopPropagation();
    setShowContextMenu(false);
  }
  
  const handleRightClickMenu = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    const handleClick = (e) => {
      setShowContextMenu(false);
    };
    
    const handleRightClick = (e) => {
      if (ParentRef.current && ParentRef.current.contains(e.target) && !contextMenuRef.current) {
        e.preventDefault();
        setPosition({ x: e.clientX, y: e.clientY });
        setShowContextMenu(true);
        //console.log(`${children} : 켜짐`);
      } else {
        setShowContextMenu(false);
      }
    }

    // 이벤트 리스너 추가
    document.addEventListener('click', handleClick);
    document.addEventListener('contextmenu', handleRightClick);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleRightClick);
    };
  }, []); // 빈 배열을 넣어 컴포넌트가 마운트될 때만 실행

  if (!showContextMenu) return null;

  return (
    <ul className="context-menu" onClick={handleClickMenu} onContextMenu={handleRightClickMenu} ref={contextMenuRef} style={{
      top: position.y,
      left: position.x,
    }}>
      <div>{children}</div>
      <MenuButton text={'읽음으로 표시하기'} />
      <MenuButton text={'초대하기'} />
      <MenuButton text={'서버 알림 끄기'} />
      <MenuButton text={'알림 설정'} />
      <MenuButton text={'서버 설정'} />
      <MenuButton text={'서버 프로필 설정'} />
      <MenuButton text={'채널 만들기'} />
      <MenuButton text={'서버 나가기'} />
    </ul>
  );
}

export default ContextMenu;