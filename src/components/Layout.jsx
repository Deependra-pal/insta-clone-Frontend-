import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children, onCreatePostClick }) => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      root.classList.remove('dark');
      setIsDark(false);
      localStorage.setItem('theme', 'light');
    } else {
      root.classList.add('dark');
      setIsDark(true);
      localStorage.setItem('theme', 'dark');
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const root = document.documentElement;
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
      setIsDark(true);
    } else {
      root.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-black text-[#262626] dark:text-[#f5f5f5] transition-colors duration-200 flex flex-col md:flex-row font-sans">
      
      {/* Sidebar Navigation - Desktop */}
      <aside className="hidden md:flex flex-col w-60 border-r border-[#dbdbdb] dark:border-[#262626] h-screen sticky top-0 bg-white dark:bg-black p-6 pb-8 z-10">
        {/* Instagram Logo */}
        <div className="mb-10 mt-4 px-2">
          <Link to="/" className="text-2xl font-bold tracking-tight text-[#262626] dark:text-[#f5f5f5] font-serif italic">
            Instagram
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col space-y-2">
          <Link 
            to="/" 
            className={`flex items-center space-x-4 px-3 py-3 rounded-lg transition-colors hover:bg-[#fafafa] dark:hover:bg-[#121212] ${
              location.pathname === '/' ? 'font-bold' : 'font-normal'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={location.pathname === '/' ? 2.5 : 2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-sm">Home</span>
          </Link>

          <button 
            onClick={onCreatePostClick} 
            className="flex items-center w-full text-left space-x-4 px-3 py-3 rounded-lg transition-colors hover:bg-[#fafafa] dark:hover:bg-[#121212] font-normal cursor-pointer text-[#262626] dark:text-[#f5f5f5]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">Create</span>
          </button>

          <Link 
            to="/profile" 
            className={`flex items-center space-x-4 px-3 py-3 rounded-lg transition-colors hover:bg-[#fafafa] dark:hover:bg-[#121212] ${
              location.pathname.startsWith('/profile') ? 'font-bold' : 'font-normal'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={location.pathname.startsWith('/profile') ? 2.5 : 2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-sm">Profile</span>
          </Link>
        </nav>

        {/* Footer Settings */}
        <div className="border-t border-[#dbdbdb] dark:border-[#262626] pt-4 flex flex-col space-y-1">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="flex items-center space-x-4 px-3 py-3 rounded-lg transition-colors hover:bg-[#fafafa] dark:hover:bg-[#121212] font-normal cursor-pointer text-[#262626] dark:text-[#f5f5f5]"
          >
            {isDark ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
                <span className="text-sm">Light Mode</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646" />
                </svg>
                <span className="text-sm">Dark Mode</span>
              </>
            )}
          </button>

          {/* Logout */}
          <Link 
            to="/login"
            className="flex items-center space-x-4 px-3 py-3 rounded-lg transition-colors hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 font-normal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-sm">Log Out</span>
          </Link>
        </div>
      </aside>

      {/* Top Header - Mobile */}
      <header className="md:hidden flex items-center justify-between px-6 py-3 border-b border-[#dbdbdb] dark:border-[#262626] bg-white dark:bg-black sticky top-0 z-10">
        <Link to="/" className="text-xl font-bold tracking-tight text-[#262626] dark:text-[#f5f5f5] font-serif italic">
          Instagram
        </Link>
        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-1 cursor-pointer">
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-550" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646" />
              </svg>
            )}
          </button>
          <Link to="/login" className="text-red-500 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 overflow-y-auto pb-16 md:pb-0 h-screen">
        {children}
      </main>

      {/* Bottom Bar Navigation - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-[#dbdbdb] dark:border-[#262626] bg-white dark:bg-black py-2 px-8 flex justify-between items-center z-10">
        <Link to="/" className="p-2 text-[#262626] dark:text-[#f5f5f5]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>
        <button onClick={onCreatePostClick} className="p-2 text-[#262626] dark:text-[#f5f5f5] cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <Link to="/profile" className="p-2 text-[#262626] dark:text-[#f5f5f5]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </Link>
      </nav>

    </div>
  );
};

export default Layout;
