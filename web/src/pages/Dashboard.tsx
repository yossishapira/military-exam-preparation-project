import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import './Dashboard.css';

export const Dashboard = () => {
  // שליפת נתונים ופונקציות מה-Store
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  
  // כלי הניווט של React Router
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* סרגל עליון */}
      <div className="navbar">
        <h2>מערכת ניהול סוכנים</h2>
        <div className="navbar-left">
          <span className="user-name">{user?.fullName}</span>
          <button className="logout-button" onClick={logout}>התנתק</button>
        </div>
      </div>

      {/* תוכן העמוד */}
      <div className="content">
        <h1>שלום {user?.fullName}!</h1>

        <div className="menu-grid">
          {/* כפתור דיווח */}
          <div className="menu-item" onClick={() => alert('דף דיווח בבנייה...')}>
            <h3>דיווח חדש</h3>
          </div>

          {/* כפתור היסטוריה */}
          <div className="menu-item" onClick={() => alert('דף היסטוריה בבנייה...')}>
            <h3>היסטוריה</h3>
          </div>
          
          {/* כפתור ניהול - מוצג רק לאדמין */}
          {user?.role === 'admin' && (
            <div 
              className="menu-item" 
              onClick={() => navigate('/admin/register')}
            >
              <h3>ניהול משתמשים</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};