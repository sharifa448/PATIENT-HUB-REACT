import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer'; // 👈 این خط اضافه شد

const DashboardLayout = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const handleChange = (e) => {
      setIsMobile(e.matches);
      setSidebarOpen(!e.matches);
    };
    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-blue-950 flex transition-colors duration-300">
      
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isMobile={isMobile} />

      <div className={`flex-1 transition-all duration-300 flex flex-col ${isMobile ? 'ml-0' : sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <Header title={title} onMenuClick={toggleSidebar} />
        
        {/* محتوای صفحات + فوتر */}
        <main className="p-4 md:p-6 min-h-[calc(100vh-80px)] flex flex-col flex-1">
          <div className="flex-1">
            {children}
          </div>
          
          {/* 👈 فوتر اینجا قرار گرفت */}
          <Footer /> 
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;