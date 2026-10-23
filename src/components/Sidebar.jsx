import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, Stethoscope, Building2,
  MessageSquare, ShoppingBag, Pill, Users, User,
  Settings, X
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Appointments', icon: Calendar, path: '/appointments' },
    { name: 'Find Doctor', icon: Stethoscope, path: '/find-doctor' },
    { name: 'Find Clinic', icon: Building2, path: '/find-clinic' },
    { name: 'Chat', icon: MessageSquare, path: '/chat' },
    { name: 'Find MarketPlace', icon: ShoppingBag, path: '/find-marketplace' },
    { name: 'Find Pharmacy', icon: Pill, path: '/find-pharmacy' },
    { name: 'My Dependents', icon: Users, path: '/my-dependents' },
    { name: 'My Account', icon: User, path: '/my-account' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile && onClose) onClose();
  };

  const sidebarWidth = isMobile 
    ? (isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full') 
    : (isOpen ? 'w-64 translate-x-0' : 'w-20 translate-x-0');

  const showText = isOpen || isMobile;

  return (
    // ✅ سایدبار در دارک مود آبی تیره (blue-900) می‌شه
    <aside
      className={`
        bg-white dark:bg-blue-900 h-screen flex flex-col 
        border-r border-slate-200 dark:border-blue-800
        fixed left-0 top-0 z-50 transition-all duration-300
        ${sidebarWidth}
      `}
    >
      <div className={`p-6 border-b border-slate-100 dark:border-blue-800 flex items-center ${showText ? 'justify-between' : 'justify-center'} h-[88px]`}>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          {showText && (
            <div className="overflow-hidden">
              <h1 className="text-lg font-bold text-slate-800 dark:text-white whitespace-nowrap">
                MyPatientHUB
              </h1>
              <p className="text-xs text-slate-400 whitespace-nowrap">
                Healthcare Platform
              </p>
            </div>
          )}
        </div>

        {isMobile && (
          <button onClick={onClose} className="text-slate-500 dark:text-slate-400 hover:text-slate-700 p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 overflow-x-hidden">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <div key={index} className="relative group">
              <button
                onClick={() => handleNavigate(item.path)}
                className={`
                  w-[calc(100%-24px)] mx-3 flex items-center py-3 text-sm font-medium transition-all rounded-lg mb-1
                  ${showText ? 'gap-3 px-4' : 'justify-center px-0'}
                  ${isActive
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-blue-800'
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {showText && <span className="whitespace-nowrap">{item.name}</span>}
              </button>

              {!showText && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 whitespace-nowrap pointer-events-none">
                  {item.name}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;