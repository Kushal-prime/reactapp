import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FolderOpen, 
  FileText, 
  Upload, 
  MessageSquare, 
  Bell,
  Settings,
  LogOut,
  Calendar,
  Users,
  UserPlus,
  CheckSquare
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Events', href: '/dashboard/events', icon: Calendar },
    { name: 'Projects', href: '/dashboard/projects', icon: FolderOpen },
    { name: 'Updates', href: '/dashboard/updates', icon: FileText },
    { name: 'Deliverables', href: '/dashboard/deliverables', icon: Upload },
    { name: 'Tickets', href: '/dashboard/tickets', icon: MessageSquare },
    { name: 'Clients', href: '/dashboard/clients', icon: UserPlus },
    { name: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare },
    { name: 'Users', href: '/dashboard/users', icon: Users },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center h-16 px-4 border-b">
        <h1 className="text-xl font-bold text-primary-600">IT Client Dashboard</h1>
      </div>
      
      <div className="flex-1 px-4 py-6">
        <nav className="space-y-2 relative">
          {/* Animated highlight bar */}
          <motion.div
            layoutId="sidebar-highlight"
            className="absolute left-0 w-full h-10 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-md z-0"
            style={{ top: navigation.findIndex(item => isActive(item.href)) * 44 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
          {navigation.map((item, idx) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <motion.div key={item.name} layout className="relative z-10">
                <Link
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors relative overflow-hidden ${
                    active
                      ? 'bg-transparent text-primary-700 font-bold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  style={{ minHeight: 40 }}
                >
                  {/* Ripple effect on hover */}
                  <motion.span
                    whileHover={{ scale: 1.2, color: '#a78bfa', filter: 'drop-shadow(0 0 8px #a78bfa)' }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="mr-3 flex items-center"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.span>
                  {item.name}
                  {/* Glow effect on active */}
                  {active && (
                    <motion.span
                      layoutId="sidebar-glow"
                      className="absolute inset-0 rounded-md pointer-events-none"
                      style={{ boxShadow: '0 0 16px 4px #a78bfa55' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
        <Link
          to="/dashboard/profile"
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors mb-2"
        >
          <Users className="w-5 h-5 mr-3" />
          Profile
        </Link>
        <button
          onClick={logout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 