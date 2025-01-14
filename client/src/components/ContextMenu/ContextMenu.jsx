import React, { useState, useEffect, useRef } from "react";
import './ContextMenu.css';

function ContextMenu({ children, ParentRef }) {
  const contextMenuRef = useRef(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 메뉴 외부를 클릭했을 때 메뉴 닫기
    const handleClickOutside = (e) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
        setShowContextMenu(false); // 메뉴를 닫는 함수 호출
        //console.log(`${children} : 꺼짐`);
      }
    };
    
    const handleRightClickOutside = (e) => {
      e.preventDefault();
      setPosition({ x: e.clientX, y: e.clientY });
      if (ParentRef.current && ParentRef.current.contains(e.target)) {
        setShowContextMenu(true);
        //console.log(`${children} : 켜짐`);
      } else {
        setShowContextMenu(false);
      }
    }

    // 이벤트 리스너 추가
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('contextmenu', handleRightClickOutside);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('contextmenu', handleRightClickOutside);
    };
  }, []); // 빈 배열을 넣어 컴포넌트가 마운트될 때만 실행

  if (!showContextMenu) return null;

  return (
    <ul className="context-menu" ref={contextMenuRef} style={{
      top: position.y,
      left: position.x,
    }}>
      <div>{children}</div>
      <li style={{ padding: '8px', cursor: 'pointer' }}>메뉴 항목 1</li>
      <li style={{ padding: '8px', cursor: 'pointer' }}>메뉴 항목 2</li>
      <li style={{ padding: '8px', cursor: 'pointer' }}>메뉴 항목 3</li>
    </ul>
  );
}

export default ContextMenu;