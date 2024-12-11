import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { register } from '../../services/api';
import Input from '../../components/Input/Input';
import BasicButton from '../../components/BasicButton/BasicButton';
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
    <form className="register-form" onSubmit={handleSubmit}>
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        }}>
        <h1 style={{ color: 'white', margin: '0px' }}>계정 만들기</h1>
      </div>
      <Input
        label={'이메일'}
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label={'별명'}
        type='text'
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <Input
        label={'사용자명'}
        type="text"
        value={userId} 
        onChange={(e) => setUserId(e.target.value)} 
      />
      <Input
        label={'비밀번호'}
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <BasicButton type={'submit'}>계속하기</BasicButton>
      <a href="/login">이미 계정이 있으신가요?</a>
    </form>
  );
}

export default RegisterPage;
