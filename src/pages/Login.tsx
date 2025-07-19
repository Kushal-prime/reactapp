import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { User } from '../types';
import axios from 'axios';
import { useToast } from '../components/Layout/Layout';

const typewriterTexts = [
  "Welcome to IT Client Dashboard",
  "Sign in to unlock your productivity 🚀",
  "Secure, Fast, and Beautiful UI",
  "Experience Next-Gen Project Management!"
];

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const showToast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Typewriter effect
  const [typeIndex, setTypeIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  useEffect(() => {
    if (charIndex < typewriterTexts[typeIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayed(typewriterTexts[typeIndex].slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 60);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCharIndex(0);
        setTypeIndex((typeIndex + 1) % typewriterTexts.length);
        setDisplayed('');
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, typeIndex]);

  // Sign up modal state
  const [showSignUp, setShowSignUp] = useState(false);
  const signUpRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (showSignUp && signUpRef.current) {
      signUpRef.current.focus();
    }
  }, [showSignUp]);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setLoading(true);
    setError('');
    try {
      const accessToken = credentialResponse.access_token || credentialResponse.credential;
      if (!accessToken) {
        setError('Google login failed: No access token.');
        showToast('Google login failed: No access token.');
        setLoading(false);
        return;
      }
      const res = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const profile = res.data;
      const googleUser: User = {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        role: 'admin',
        avatar: profile.picture,
        // Add extra fields if you want, e.g. locale: profile.locale
      };
      login(googleUser);
      showToast('Google login successful!');
      setLoading(false);
      navigate('/dashboard/profile');
    } catch (error) {
      setError('Google login failed.');
      showToast('Google login failed.');
      setLoading(false);
      console.error('Login error:', error);
    }
  };

  const handleGoogleError = () => {
    setError('Google login failed.');
    showToast('Google login failed.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@company.com' && password === 'admin123') {
      const adminUser: User = {
        id: 'admin',
        name: 'Admin User',
        email: 'admin@company.com',
        role: 'admin',
        avatar: 'https://ui-avatars.com/api/?name=Admin+User',
      };
      login(adminUser);
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Try admin@company.com / admin123.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100 relative overflow-hidden animate-fade-in">
      {/* Animated Gradient Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob -z-10" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob -z-10" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob -z-10" style={{ animationDelay: '4s', transform: 'translate(-50%, -50%)' }} />
      <div className="max-w-md w-full space-y-8 z-10">
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <div className="flex justify-center mb-4">
          <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-semibold shadow hover:bg-primary-200 transition">
            <span className="text-xl">🏠</span> Home
          </Link>
        </div>
        <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl shadow-2xl p-8 flex flex-col items-center border-2 border-white/40 dark:border-gray-800/40 animate-fade-in">
          <div className="mx-auto h-14 w-14 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-2 animate-bounce">
            <svg
              className="h-10 w-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="mt-2 text-center text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x min-h-[40px]">
            {displayed}
            <span className="w-2 h-8 bg-pink-500 animate-blink inline-block ml-1 align-middle rounded" />
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to access your dashboard
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="bg-white/90 dark:bg-gray-900/90 py-8 px-4 shadow-2xl rounded-2xl border-2 border-white/40 dark:border-gray-800/40 animate-fade-in-up">
            <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all duration-200 focus:scale-105 focus:shadow-lg"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all duration-200 focus:scale-105 focus:shadow-lg"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              {error && <div className="text-red-500 text-sm animate-fade-in">{error}</div>}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-primary-600 hover:text-primary-500 transition">Forgot your password?</a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-xl hover:from-blue-700 hover:to-pink-700 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 animate-pop-in"
                >
                  Sign in
                </button>
              </div>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white/90 dark:bg-gray-900/90 text-gray-500">Or continue with</span>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex justify-center">
                  <div className="rounded-lg shadow-lg overflow-hidden animate-pop-in">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      useOneTap
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button onClick={() => setShowSignUp(true)} className="font-medium text-primary-600 hover:text-primary-500 transition underline">Sign up</button>
              </p>
            </div>
          </div>
        </div>
        {/* Demo Login Button */}
        <div className="text-center">
          <button
            onClick={() => {
              const demoUser: User = {
                id: '1',
                name: 'Demo User',
                email: 'demo@example.com',
                role: 'admin',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
              };
              login(demoUser);
              navigate('/dashboard');
            }}
            className="text-sm text-gray-500 hover:text-gray-700 underline animate-fade-in"
          >
            Demo Login (Skip Authentication)
          </button>
        </div>
        {/* Sign Up Modal */}
        {showSignUp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 animate-fade-in">
            <div ref={signUpRef} tabIndex={-1} className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-2xl p-8 w-full max-w-md border-2 border-blue-200 dark:border-blue-900 animate-pop-in outline-none">
              <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">Create your account</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all" />
                <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all" />
                <input type="password" placeholder="Password" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all" />
                <button type="button" className="w-full py-2 rounded-md bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold shadow-lg hover:from-blue-700 hover:to-pink-700 hover:scale-105 transition-all">Sign Up</button>
                <button type="button" className="w-full py-2 rounded-md bg-gray-200 text-gray-700 font-semibold mt-2 hover:bg-gray-300 transition-all" onClick={() => setShowSignUp(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login; 