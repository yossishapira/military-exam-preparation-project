import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { register } from '../api/client';
import './RegisterPage.css';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    agentCode: '',
    fullName: '',
    password: '',
    role: 'agent' 
  });
  const [message, setMessage] = useState({ text: '', isError: false });
  
  const token = useAuthStore((state) => state.token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ text: '', isError: false });

    try {
      await register(formData, token!);
      setMessage({ text: 'הסוכן נוצר בהצלחה!', isError: false });
      setFormData({ agentCode: '', fullName: '', password: '', role: 'agent' });
    } catch (err: any) {
      setMessage({ text: err.message || 'שגיאה ביצירת סוכן', isError: true });
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>רישום סוכן חדש</h2>
        
        {message.text && (
          <p className={message.isError ? "error-box" : "success-box"}>
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>שם מלא:</label>
            <input 
              type="text" 
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              required 
            />
          </div>

          <div className="form-group">
            <label>קוד סוכן:</label>
            <input 
              type="text" 
              value={formData.agentCode}
              onChange={(e) => setFormData({...formData, agentCode: e.target.value})}
              required 
            />
          </div>

          <div className="form-group">
            <label>סיסמה:</label>
            <input 
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
               
            />
          </div>

          <div className="form-group">
            <label>תפקיד:</label>
            <select 
              value={formData.role} 
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="agent">סוכן</option>
              <option value="admin">מנהל (Admin)</option>
            </select>
          </div>

          <button type="submit" className="save-btn">צור משתמש</button>
        </form>
      </div>
    </div>
  );
};