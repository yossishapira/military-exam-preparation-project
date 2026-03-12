import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { Dashboard } from "./pages/Dashboard";
import { RegisterPage } from "./pages/RegisterPage";
import { useAuthStore } from "./store/useAuthStore";

export default function App() {
  // אנחנו שולפים את המשתמש מהמחסן
  const user = useAuthStore((state) => state.user);

  return (
    <Router>
      <Routes>
        {/* דף הכניסה - אם מחובר, שלח אותו לבית */}
        <Route 
          path="/auth/login" 
          element={user ? <Navigate to="/" /> : <LoginPage />} 
        />

        {/* דף הבית - דורש משתמש מחובר */}
        <Route 
          path="/" 
          element={user ? <Dashboard /> : <Navigate to="/auth/login" />} 
        />

        {/* דף הרשמה - דורש גם משתמש וגם שהוא יהיה אדמין */}
        <Route 
          path="/admin/register" 
          element={
            user && user.role === "admin" 
              ? <RegisterPage /> 
              : <Navigate to="/" />
          } 
        />

        {/* אם הוקלדה כתובת זבל - חזרה לבית */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}