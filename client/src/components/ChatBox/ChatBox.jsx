import React, { useState, useRef, useEffect } from "react";
import { FaDiscord } from "react-icons/fa";
import './ChatBox.css';

function ChatBox() {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
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
    console.log('폼 제출:', message);
    setMessage(''); // 메시지 초기화 (옵션)
  };
  
  useEffect(() => {
    adjustHeight();
  }, [message]);
  
  return(
    <form className="chat-box" onSubmit={(e) => e.preventDefault()}>
      <button className="chat-icon-button"><FaDiscord size={24} /></button>
      <textarea 
        ref={textareaRef}
        className="chat-input"
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        rows="1" 
        autocomplete="off" 
        spellCheck="false"
      />
      <button style={{ display: 'none' }} type="submit" onClick={handleSubmit}/>
    </form>
  )
}

export default ChatBox;