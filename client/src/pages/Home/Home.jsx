import React from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';

function HomePage() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/login');
  };
  
  return (
    <div className="home-page">
      <>홈페이지</>
      <button className="home-button" onClick={handleNavigate}>로그인</button>
    </div>
  )
}

export default HomePage;