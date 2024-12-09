import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css'
import Input from '../../components/Input/Input';

function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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

      navigate('/channels');
      console.log(response);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('로그인 실패');
      }
    }
  };

  return (
    <div className='login-page'>
      <div className="login-form">
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          }}>
          <h1 style={{ color: 'white', margin: '0px' }}>돌아오신 것을 환영해요!</h1>
          <p style={{ color: 'GrayText', margin: '0px' }}>다시 만나다니 너무 반갑지는 않고요!</p>
        </div>
        <label className='label'>아이디 {error && <span style={{ color: 'red'}}>{error}</span>} </label>
        <Input 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)} 
          type={'text'} 
        />
        <label className='label'>비밀번호 {error && <span style={{ color: 'red'}}>{error}</span>} </label>
        <Input 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          type={'password'} 
        />
        <a href="/register">혹시 계정이 없으신가요?</a>
        <button className="btn" onClick={handleSubmit}>로그인</button>
      </div>
    </div>
    
  );
}

export default LoginPage;
