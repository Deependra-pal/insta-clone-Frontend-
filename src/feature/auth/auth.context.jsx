import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} from "./services/auth.api"; // Wait, in the original it was "../api/auth.api" - let's check!

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  // Global Authentication State
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Register
  const register = async (username, email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await registerUser(
        username,
        email,
        password
      );

      setUser(response.user);

      return response;
    } catch (error) {
      if (error.errors) {
        console.error("Detailed validation errors:", error.errors);
      } else {
        console.error(error);
      }
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await loginUser(email, password);

      setUser(response.user);

      return response;
    } catch (error) {
      if (error.errors) {
        console.error("Detailed validation errors:", error.errors);
      } else {
        console.error(error);
      }
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get Logged In User
  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getMe();

      setUser(response.user);

      return response;
    } catch (error) {
      if (error.errors) {
        console.error("Detailed validation errors:", error.errors);
      } else {
        console.error(error);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setLoading(true);

      await logoutUser();

      setUser(null);
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        setError,
        register,
        login,
        fetchCurrentUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
