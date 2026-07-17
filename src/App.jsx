import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from "./feature/auth/auth.context";

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;