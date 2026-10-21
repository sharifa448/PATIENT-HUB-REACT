
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Stethoscope,
  Building2,
  MessageSquare,
  ShoppingBag,
  Pill,
  Users,
  User,
  Settings,
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

  const sidebarClass = isMobile
    ? `w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
    : `${isOpen ? 'w-64' : 'w-20'}`;

  const showText = isOpen;

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          bg-white h-screen flex flex-col border-r border-gray-200
          fixed left-0 top-0 z-50 transition-all duration-300
          ${sidebarClass}
        `}
      >
        <div
          className={`p-4 border-b border-gray-100 flex items-center ${
            showText ? 'justify-start gap-2' : 'justify-center'
          } h-20`}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">M</span>
          </div>

          {showText && (
            <div>
              <h1 className="text-lg font-bold text-gray-800 whitespace-nowrap">
                MyPatientHUB
              </h1>
              <p className="text-xs text-gray-400 whitespace-nowrap">
                Healthcare Platform
              </p>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <div key={index} className="relative group">
                <button
                  onClick={() => handleNavigate(item.path)}
                  className={`flex items-center ${
                    showText
                      ? 'gap-3 px-6 w-[calc(100%-16px)] mx-2'
                      : 'justify-center px-3 w-[calc(100%-16px)] mx-2'
                  } py-3 text-sm font-medium transition-all rounded-lg ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {showText && (
                    <span className="whitespace-nowrap">{item.name}</span>
                  )}
                </button>

                {!isMobile && !isOpen && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none shadow-lg">
                    {item.name}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
