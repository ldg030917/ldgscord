import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../../services/socket";
import { FaDiscord } from "react-icons/fa";
import { createMessage } from "../../services/api";
import './ChatBox.css';

function ChatBox() {
  const socket = useSocket();
  const [content, setContent] = useState('');
  const textareaRef = useRef(null);
  const { serverId, channelId } = useParams();

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleInputChange = (event) => {
    setContent(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.shiftKey) {
      return;
    }

    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // 기본 엔터키 기능 (줄바꿈) 방지
      handleSubmit(); // 폼 제출
    }
  };

  const handleSubmit = () => {
    // 폼 제출 처리 (예: API 호출, 콘솔 출력 등)
    socket.emit('SEND_MESSAGE', { 
        serverId: serverId,
        channelId: channelId, 
        content: content
      }
    );
    createMessage({ content: content }, channelId);
    console.log('폼 제출:', content);
    setContent(''); // 메시지 초기화 (옵션)
  };
  
  useEffect(() => {
    adjustHeight();
  }, [content]);
  
  return(
    <form className="chat-box" onSubmit={(e) => e.preventDefault()}>
      <button className="chat-icon-button"><FaDiscord size={24} /></button>
      <textarea 
        ref={textareaRef}
        className="chat-input"
        value={content}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        rows="1" 
        autoComplete="off" 
        spellCheck="false"
      />
      <button style={{ display: 'none' }} type="submit" onClick={handleSubmit}/>
    </form>
  )
}

export default ChatBox;