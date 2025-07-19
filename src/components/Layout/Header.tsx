import React, { useState } from 'react';
import { Bell, Search, Menu, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Notification } from '../../types';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Project Update',
      message: 'New deliverable uploaded for Project Alpha',
      type: 'info',
      read: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Deadline Reminder',
      message: 'Project Beta deliverables due in 2 days',
      type: 'warning',
      read: false,
      createdAt: new Date().toISOString(),
    },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Dark mode state for mobile toggle
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  const toggleDark = () => {
    setDark(d => {
      const next = !d;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="relative ml-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md relative" onClick={() => setShowNotifications(v => !v)}>
              <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  <div className="px-4 py-2 border-b">
                    <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                  </div>
                  {notifications.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className={`w-2 h-2 rounded-full ${
                              notification.type === 'warning' ? 'bg-yellow-400' :
                              notification.type === 'error' ? 'bg-red-400' :
                              notification.type === 'success' ? 'bg-green-400' :
                              'bg-blue-400'
                            }`} />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(notification.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User profile */}
          <div className="flex items-center">
            <a href="/dashboard/profile" className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center hover:opacity-80 transition">
              {user?.avatar ? (
                <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <span className="text-white text-sm font-medium">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </a>
            <div className="ml-3 hidden md:block">
              <p className="text-sm font-medium text-gray-700">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>

          {/* Mobile dark mode toggle - moved to far right */}
          <button
            className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition md:hidden"
            onClick={toggleDark}
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 