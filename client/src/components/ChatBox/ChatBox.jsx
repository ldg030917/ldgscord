import React, { useState } from "react";
import './ChatBox.css';

function ChatBox() {
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 기본 엔터키 기능 (줄바꿈) 방지
      handleSubmit(); // 폼 제출
    }
  };

  const handleSubmit = () => {
    // 폼 제출 처리 (예: API 호출, 콘솔 출력 등)
    console.log('폼 제출:', message);
    setMessage(''); // 메시지 초기화 (옵션)
  };

  return(
    <form className="chat-box" onSubmit={(e) => e.preventDefault()}>
      <textarea 
        className="chat-input"
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        rows="1" 
        autocomplete="off" 
        required
      />
      <button style={{ display: 'none' }} type="submit" onClick={handleSubmit}/>
    </form>
  )
}

export default ChatBox;