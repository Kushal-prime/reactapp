import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState('');

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1-555-0123',
    bio: 'Software developer with 5+ years of experience in web development.',
    location: 'San Francisco, CA'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    projectUpdates: true,
    eventReminders: true,
    ticketUpdates: true,
    weeklyDigest: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '24',
    passwordExpiry: '90'
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: localStorage.getItem('theme') || 'light',
    fontSize: 'medium',
    compactMode: false
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', appearanceSettings.theme === 'dark');
    localStorage.setItem('theme', appearanceSettings.theme);
  }, [appearanceSettings.theme]);

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette }
  ];

  const handleSave = () => {
    // Handle save logic here
    setToast('Settings saved!');
    setTimeout(() => setToast(''), 2000);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto mt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient-x">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account preferences and system settings</p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white rounded-lg font-semibold shadow-lg hover:from-green-500 hover:to-green-700 hover:scale-105 transition-all duration-200 text-lg animate-bounce-once"
        >
          <Save className="h-5 w-5 mr-2" />
          Save Changes
        </button>
      </div>

      {/* Settings Layout */}
      <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl divide-y divide-gray-100 border-2 border-blue-100 dark:border-gray-800">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6 pt-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-4 font-bold text-lg transition-all duration-200 relative group focus:outline-none ${
                    activeTab === tab.id
                      ? 'border-pink-500 text-pink-600 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 dark:from-pink-900 dark:via-purple-900 dark:to-blue-900 shadow-md scale-105'
                      : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2 group-hover:scale-125 transition-transform" />
                  {tab.name}
                  {activeTab === tab.id && <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-pink-400 rounded-full animate-pulse" />}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-8">
          {toast && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded shadow text-center animate-fade-in">
              {toast}
            </div>
          )}
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="space-y-6 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-pink-900 dark:via-purple-900 dark:to-blue-900 rounded-xl p-6 shadow-md animate-fade-in">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 dark:from-yellow-900 dark:via-orange-900 dark:to-pink-900 rounded-xl p-6 shadow-md animate-fade-in">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  {Object.entries(notificationSettings).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Receive notifications for {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </p>
                      </div>
                      <button
                        onClick={() => setNotificationSettings({ ...notificationSettings, [key]: !value })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          value ? 'bg-primary-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-900 dark:via-blue-900 dark:to-purple-900 rounded-xl p-6 shadow-md animate-fade-in">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <button
                      onClick={() => setSecuritySettings({ ...securitySettings, twoFactorAuth: !securitySettings.twoFactorAuth })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        securitySettings.twoFactorAuth ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Session Timeout (hours)
                    </label>
                    <select
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="1">1 hour</option>
                      <option value="8">8 hours</option>
                      <option value="24">24 hours</option>
                      <option value="168">1 week</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password Expiry (days)
                    </label>
                    <select
                      value={securitySettings.passwordExpiry}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, passwordExpiry: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="30">30 days</option>
                      <option value="60">60 days</option>
                      <option value="90">90 days</option>
                      <option value="365">1 year</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="space-y-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 rounded-xl p-6 shadow-md animate-fade-in">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Appearance</h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-700">Theme</span>
                  <select
                    value={appearanceSettings.theme}
                    onChange={e => setAppearanceSettings({ ...appearanceSettings, theme: e.target.value })}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Size
                    </label>
                    <select
                      value={appearanceSettings.fontSize}
                      onChange={(e) => setAppearanceSettings({ ...appearanceSettings, fontSize: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Compact Mode</h4>
                      <p className="text-sm text-gray-500">Reduce spacing for a more compact layout</p>
                    </div>
                    <button
                      onClick={() => setAppearanceSettings({ ...appearanceSettings, compactMode: !appearanceSettings.compactMode })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        appearanceSettings.compactMode ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          appearanceSettings.compactMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings; 