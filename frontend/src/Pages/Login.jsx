import React, { useState } from 'react';
import { GraduationCap, Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🚀 Requesting the backend
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: email.trim(), 
        password: password
      });

      // Backend returns: { token, role, userName, _id }
      if (response.data && response.data.token) {
        // --- 🛠 SYNC WITH EXAMS.JSX & AUTHCONTROLLER ---
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role); // Match with Exams.jsx: localStorage.getItem('role')
        localStorage.setItem('userName', response.data.userName); // Match with AuthController response

        // Role ke hisaab se redirect
        if (response.data.role === 'admin') {
          navigate('/classes');
        } else {
          // Student ko dashboard ya exams page pe bhejein
          navigate('/exams'); 
        }
      } else {
        alert("Login failed: Unexpected response from server.");
      }
    } catch (error) {
      console.error("Login Error:", error.response);
      const errorMessage = error.response?.data?.message || "Invalid email or password";
      alert("Login Fail: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="login-branding">
          <div className="logo-glow"></div>
          <GraduationCap size={60} color="#e33411" className="main-logo-icon" />
          <h1>KOKO~<span>PANEL</span></h1>
          <p>Login to Access the School Management Portal</p>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="login-button-elite" disabled={loading}>
            {loading ? "AUTHENTICATING..." : "SECURE LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;