import { Routes, Route, Navigate } from 'react-router-dom';

// Auth Pages
import Login from '../feature/auth/pages/login';
import Register from '../feature/auth/pages/register';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect root path to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Fallback route - redirect all unmatched to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;