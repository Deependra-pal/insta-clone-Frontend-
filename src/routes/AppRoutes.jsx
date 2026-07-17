import { Routes, Route, Navigate } from 'react-router-dom';

// Auth Pages
import Login from '../feature/auth/pages/Login';
import Register from '../feature/auth/pages/Register';


const AppRoutes = () => {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<h1>This is home page.</h1>} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Fallback route - redirect all unmatched to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;