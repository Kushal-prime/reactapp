import React, { useState, createContext, useContext, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';

// Toast context for global notifications
const ToastContext = createContext<(msg: string) => void>(() => {});
export const useToast = () => useContext(ToastContext);

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [loading, setLoading] = useState(false);

  // Toast auto-hide
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  // Loading overlay control for children
  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <ToastContext.Provider value={showToast}>
      <div className={`min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50`}>
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <Sidebar />
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-screen">
          <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          {toast && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded shadow-lg animate-fade-in">
              {toast}
            </div>
          )}
          {loading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
              <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <main className="flex-1 p-6 md:p-10">
            {/* Children pages can use useToast() and setLoading() via context */}
            {/* You can pass setLoading as context if needed for async actions */}
            {/* Outlet renders the current page */}
            <Outlet />
          </main>
        </div>
      </div>
    </ToastContext.Provider>
  );
};

export default Layout; 