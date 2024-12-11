import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { register } from '../../services/api';
import Input from '../../components/Input/Input';
import './Auth.css'

function RegisterPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      user_id: userId,
      password: password,
      email: email,
      nickname: nickname,
    };

    await register(data);

    navigate('/login');
  };

  return (
    <div className="register-form">
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        }}>
        <h1 style={{ color: 'white', margin: '0px' }}>계정 만들기</h1>
      </div>
      <label className='label'>이메일</label>
      <Input
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className='label'>별명</label>
      <Input
        type='text'
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <label className='label'>사용자명</label>
      <Input
        type="text"
        value={userId} 
        onChange={(e) => setUserId(e.target.value)} 
      />
      <label className='label'>비밀번호</label>
      <Input
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button className="btn" onClick={handleSubmit}>계속하기</button>
      <a href="/login">이미 계정이 있으신가요?</a>
    </div>
  );
}

export default RegisterPage;
