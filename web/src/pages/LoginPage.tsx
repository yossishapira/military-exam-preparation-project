import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { login } from '../api/client'; 
import './Login.css';

export const LoginPage = () => {
  const [agentCode, setAgentCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); 

    try {
      const data = await login(agentCode, password);
      setAuth(data.user, data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'פרטי התחברות שגויים');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>כניסת סוכנים</h2>
        
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>קוד סוכן:</label>
            <input 
              type="text" 
              value={agentCode}
              onChange={(e) => setAgentCode(e.target.value)}
              placeholder="הכנס קוד סוכן"
              required 
            />
          </div>

          <div className="input-group">
            <label>סיסמה:</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="הכנס סיסמה"
              required 
            />
          </div>

          <button type="submit" className="login-btn">התחבר למערכת</button>
        </form>
      </div>
    </div>
  );
};