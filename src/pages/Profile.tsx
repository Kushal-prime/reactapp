import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useCallback, useRef } from 'react';

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
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiRef = useRef<HTMLDivElement>(null);
  // Avatar parallax state
  const [avatarTilt, setAvatarTilt] = useState({ x: 0, y: 0 });
  // Avatar parallax handlers
  const handleAvatarMove = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
    setAvatarTilt({ x, y });
  };
  const handleAvatarLeave = () => setAvatarTilt({ x: 0, y: 0 });

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
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-lg">Loading...</div>;
  }
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Morphing Blobs */}
      <motion.svg viewBox="0 0 600 600" className="absolute top-0 left-0 w-96 h-96 opacity-30 -z-10">
        <motion.path fill="#a78bfa"
          animate={{
            d: [
              'M421,320Q420,390,350,420Q280,450,210,420Q140,390,140,320Q140,250,210,220Q280,190,350,220Q420,250,421,320Z',
              'M400,320Q420,390,350,420Q280,450,210,420Q140,390,160,320Q180,250,250,220Q320,190,390,220Q460,250,400,320Z',
              'M421,320Q420,390,350,420Q280,450,210,420Q140,390,140,320Q140,250,210,220Q280,190,350,220Q420,250,421,320Z',
            ]
          }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        />
      </motion.svg>
      <motion.svg viewBox="0 0 600 600" className="absolute bottom-0 right-0 w-96 h-96 opacity-30 -z-10">
        <motion.path fill="#f472b6"
          animate={{
            d: [
              'M421,320Q420,390,350,420Q280,450,210,420Q140,390,140,320Q140,250,210,220Q280,190,350,220Q420,250,421,320Z',
              'M400,320Q420,390,350,420Q280,450,210,420Q140,390,160,320Q180,250,250,220Q320,190,390,220Q460,250,400,320Z',
              'M421,320Q420,390,350,420Q280,450,210,420Q140,390,140,320Q140,250,210,220Q280,190,350,220Q420,250,421,320Z',
            ]
          }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        />
      </motion.svg>
      {/* Confetti burst on update */}
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={300} />} 
      {/* Animated Glassmorphism Card */}
      <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-xl mx-auto mt-10 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl shadow-2xl p-10 border-2 border-white/40 dark:border-gray-800/40 animate-fade-in relative z-10">
        {/* Animated Divider */}
        <motion.svg viewBox="0 0 1440 80" className="w-full h-8 absolute -top-8 left-0">
          <motion.path fill="#a78bfa" fillOpacity=".2"
            animate={{
              d: [
                'M0,40L80,50C160,60,320,80,480,70C640,60,800,40,960,33C1120,27,1280,25,1360,24L1440,24L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z',
                'M0,60L80,40C160,20,320,0,480,20C640,40,800,60,960,50C1120,40,1280,60,1360,70L1440,60L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z',
                'M0,40L80,50C160,60,320,80,480,70C640,60,800,40,960,33C1120,27,1280,25,1360,24L1440,24L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z',
              ]
            }}
            transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
          />
        </motion.svg>
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 text-center animate-gradient-x">Profile</h2>
        <div className="flex flex-col items-center mb-8">
          <motion.div
            animate={{ rotateX: avatarTilt.y, rotateY: avatarTilt.x }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative"
            onMouseMove={handleAvatarMove}
            onMouseLeave={handleAvatarLeave}
          >
            <img
              src={profile.avatar || 'https://ui-avatars.com/api/?name=User'}
              alt="Avatar"
              className="w-28 h-28 rounded-full object-cover border-4 border-primary-500 bg-gray-200 shadow-xl animate-pop-in hover:scale-110 transition-transform duration-200 cursor-pointer"
            />
            {editMode && (
              <input
                type="file"
                accept="image/*"
                className="absolute bottom-0 right-0 bg-white/80 rounded-full p-1 border-2 border-primary-500 shadow hover:bg-primary-100 transition-all"
                onChange={handleAvatarChange}
              />
            )}
          </motion.div>
          <div className="mt-4 text-lg font-semibold text-gray-800 dark:text-white animate-fade-in-up">{profile.name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-300 animate-fade-in-up">{profile.email}</div>
          <div className="text-xs text-primary-600 dark:text-primary-400 mt-1 animate-fade-in-up">{profile.role}</div>
        </div>
        <form onSubmit={handleSave} className="space-y-6 animate-fade-in-up">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all focus:scale-105 focus:shadow-lg"
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
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all focus:scale-105 focus:shadow-lg"
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
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.08, boxShadow: '0 0 24px #a78bfa' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg font-bold shadow-lg hover:from-blue-700 hover:to-pink-700 hover:scale-105 transition-all animate-pop-in"
                >
                  Save
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.08, boxShadow: '0 0 24px #a78bfa' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold shadow hover:bg-gray-300 transition-all animate-pop-in"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </motion.button>
              </>
            ) : (
              <motion.button
                type="button"
                whileHover={{ scale: 1.08, boxShadow: '0 0 24px #a78bfa' }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg font-bold shadow-lg hover:from-blue-700 hover:to-pink-700 hover:scale-105 transition-all animate-pop-in"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </motion.button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Profile; 