import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import RegisterPage from "./Register";
import LoginPage from "./Login";
import './Auth.css';

function Auth() {
  return(
    <div className="auth-page">
      <div className="auth-container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default Auth;