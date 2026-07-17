import { createContext, useState } from "react";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} from "../api/auth.api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Global Authentication State
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Register
  const register = async (username, email, password) => {
    try {
      setLoading(true);

      const response = await registerUser(
        username,
        email,
        password
      );

      setUser(response.user);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      setLoading(true);

      const response = await loginUser(email, password);

      setUser(response.user);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get Logged In User
  const fetchCurrentUser = async () => {
    try {
      setLoading(true);

      const response = await getMe();

      setUser(response.user);

      return response;
    } catch (error) {
      console.error(error);
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


 