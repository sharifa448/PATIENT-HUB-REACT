import React, { useState, useEffect, useRef } from 'react';
import { Search, Settings, Bell, LogOut, Menu, Home, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const searchData = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Appointments', path: '/appointments' },
  { name: 'Find Doctor', path: '/find-doctor' },
  { name: 'Find Clinic', path: '/find-clinic' },
  { name: 'Chat', path: '/chat' },
  { name: 'Find MarketPlace', path: '/find-marketplace' },
  { name: 'Find Pharmacy', path: '/find-pharmacy' },
  { name: 'My Dependents', path: '/my-dependents' },
  { name: 'My Account', path: '/my-account' },
  { name: 'Settings', path: '/settings' },
];

const Header = ({ title = 'Dashboard', onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  const filteredResults = searchData.filter(item =>
    item.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setSearchTerm('');
    setIsSearchFocused(false);
  }, [location.pathname]);

  const handleResultClick = (path) => {
    navigate(path);
    setSearchTerm('');
    setIsSearchFocused(false);
  };

  // ✅ تابع ساده برای دکمه زنگ
  const handleBellClick = () => {
    // یک پیام ساده که نشون بده دکمه کار می‌کنه
    alert("You have no new notifications right now.");
  };

  return (
    <header className="bg-white dark:bg-blue-950 border-b border-slate-200 dark:border-blue-900 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-30 transition-colors shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="text-slate-600 dark:text-slate-300 hover:text-purple-500 transition p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-blue-900"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div>
          <div className="flex items-center gap-1 text-xs text-slate-400 mb-0.5">
            <Home className="w-3 h-3" />
            <span>/</span>
            <span>{title}</span>
          </div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">{title}</h2>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative hidden md:block" ref={searchRef}>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsSearchFocused(true);
              }}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search pages..."
              autoComplete="off"
              className="pl-10 pr-10 py-2 border border-slate-200 dark:border-blue-800 rounded-lg text-sm bg-white dark:bg-blue-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 w-48 lg:w-64 transition-colors"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {isSearchFocused && searchTerm && (
            <div className="absolute top-full mt-2 w-full bg-white dark:bg-blue-950 border border-slate-200 dark:border-blue-800 rounded-xl shadow-2xl overflow-hidden z-50">
              {filteredResults.length > 0 ? (
                <ul className="max-h-60 overflow-y-auto py-2">
                  {filteredResults.map((item, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleResultClick(item.path)}
                        className="w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-blue-900 flex items-center gap-2 transition-colors"
                      >
                        <Search className="w-3.5 h-3.5 text-slate-400" />
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center">
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">No results found</p>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-purple-500 text-sm font-medium transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden md:inline">Log out</span>
        </button>

        <ThemeToggle />

        <button 
          onClick={() => navigate('/settings')} 
          className="text-slate-500 dark:text-slate-400 hover:text-purple-500 transition"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* ✅ دکمه زنگ که حالا فقط یه پیام ساده نشون می‌ده */}
        <button 
          onClick={handleBellClick}
          className="relative text-slate-500 dark:text-slate-400 hover:text-purple-500 transition p-1"
        >
          <Bell className="w-5 h-5" />
          {/* نقطه قرمز کوچیک روی زنگ */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;