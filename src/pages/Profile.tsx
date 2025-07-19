import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, login, loading } = useAuth();
  const showToast = useToast();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
    role: user?.role || '',
    locale: (user as any)?.locale || '',
    verified_email: (user as any)?.verified_email || false,
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // Sync profile state with user changes
  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
      return;
    }
    if (user) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        avatar: user.avatar || '',
        role: user.role || '',
        locale: (user as any)?.locale || '',
        verified_email: (user as any)?.verified_email || false,
      });
    }
  }, [user, loading, navigate]);

  const allowedRoles = ['admin', 'provider', 'student'] as const;
  const getValidRole = (role: string): 'admin' | 'provider' | 'student' => {
    return allowedRoles.includes(role as any) ? (role as 'admin' | 'provider' | 'student') : 'student';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setProfile({ ...profile, avatar: url });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Update user in context and localStorage
    const updatedUser = { ...user, ...profile, id: user?.id || '', role: getValidRole(profile.role) };
    login(updatedUser);
    setEditMode(false);
    showToast('Profile updated!');
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-lg">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow p-8">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      <div className="flex items-center mb-6">
        <img
          src={profile.avatar || 'https://ui-avatars.com/api/?name=User'}
          alt="Avatar"
          className="w-20 h-20 rounded-full object-cover border-2 border-primary-500 bg-gray-200"
        />
        {editMode && (
          <input
            type="file"
            accept="image/*"
            className="ml-4"
            onChange={handleAvatarChange}
          />
        )}
      </div>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            disabled={!editMode}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            disabled={!editMode}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <input
            type="text"
            name="role"
            value={profile.role}
            disabled
            className="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2 bg-gray-100 text-gray-500"
          />
        </div>
        {profile.locale && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Locale</label>
            <input
              type="text"
              name="locale"
              value={profile.locale}
              disabled
              className="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2 bg-gray-100 text-gray-500"
            />
          </div>
        )}
        {typeof profile.verified_email !== 'undefined' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Verified</label>
            <input
              type="text"
              name="verified_email"
              value={profile.verified_email ? 'Yes' : 'No'}
              disabled
              className="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2 bg-gray-100 text-gray-500"
            />
          </div>
        )}
        <div className="flex space-x-4 mt-6">
          {editMode ? (
            <>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
              >
                Save
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile; 