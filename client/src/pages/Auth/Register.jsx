import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css'

function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      user_id: userId,
      password: password,
    };

    try{
      const response = await axios.post('http://localhost:5000/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error:', error);
    }
    // 로그인 로직을 여기에 추가 (예: 백엔드 API 호출)
    // 예시로 로그인 후, 다른 페이지로 이동
    console.log('아이디:', userId);
    console.log('비밀번호:', password);

    navigate('/channels');
  };

  return (
    <div className='login-page'>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            name="user_id" 
            placeholder="아이디" 
            value={userId} 
            onChange={(e) => setUserId(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="비밀번호" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <input className="btn" type="submit" value="로그인" />
        </form>
        <a href="/register">혹시 계정이 없으신가요?</a>
      </div>
    </div>
    
  );
}

export default LoginPage;
