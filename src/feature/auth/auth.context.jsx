import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  // Global Authentication State
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

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

      setUser(response.data.user);

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

      setUser(response.data.user);

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

      setUser(response.data.user);

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
