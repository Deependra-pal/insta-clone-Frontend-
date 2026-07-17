import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, loading, error, setError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (setError) {
      setError(null);
    }
  }, [setError]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      // Error is caught and stored in the AuthContext
    }
  };

  return (
    <div className="   min-h-screen w-full bg-[#F8FAFC] flex items-center justify-center p-4 sm:p-6">
      <div className=" p-[20px] bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-100/30 p-10 sm:p-12 max-w-[450px] w-full h-auto transition-all duration-300 mx-auto">

        {/* Header Section */}
        <div className="flex flex-col items-start w-full">
          <h2 className="text-[36px] font-bold text-neutral-900 leading-none">
            Welcome Back
          </h2>
          <p className="text-base text-slate-500 mt-2.5">
            Sign in to your Instagram account.
          </p>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-650 text-sm rounded-xl text-left w-full font-medium">
            {typeof error === 'string' ? error : error.message || 'Login failed.'}
          </div>
        )}

        {/* Inputs and Submit Section */}
        <form onSubmit={handleLogin} className="w-full flex flex-col mt-10">

          {/* Email address field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-slate-700 mb-2.5">
              Email Address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="name@mail.com or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[52px] text-sm px-4 border border-slate-200 rounded-xl bg-white outline-none focus:border-instagram focus:ring-4 focus:ring-instagram-light transition-all placeholder:text-slate-400 text-slate-800"
              required
            />
          </div>

          {/* Password field */}
          <div className="flex flex-col mt-6">
            <label htmlFor="password" className="text-sm font-medium text-slate-700 mb-2.5">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[52px] text-sm px-4 border border-slate-200 rounded-xl bg-white outline-none focus:border-instagram focus:ring-4 focus:ring-instagram-light transition-all placeholder:text-slate-400 text-slate-800"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[52px] rounded-xl text-sm font-semibold text-white bg-instagram hover:bg-instagram-dark active:scale-[0.99] transition-all duration-200 mt-8 shadow-md shadow-blue-600/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Footer Section */}
        <div className="text-center w-full text-sm text-slate-600 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-instagram hover:text-instagram-dark transition-colors ml-1">
            Register
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LoginForm;
