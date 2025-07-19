import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const features = [
  { icon: '🚀', title: 'Fast Project Management', desc: 'Track and manage all your IT projects in one place.' },
  { icon: '🔒', title: 'Secure & Private', desc: 'Your data is protected with enterprise-grade security.' },
  { icon: '🤝', title: 'Team Collaboration', desc: 'Work together with your team and clients seamlessly.' },
];

const stats = [
  { icon: '📁', label: 'Total Projects', value: 12 },
  { icon: '🚀', label: 'Active Projects', value: 8 },
  { icon: '💰', label: 'Total Revenue', value: '$125,000' },
  { icon: '👥', label: 'Team Members', value: 15 },
];

const recentProjects = [
  { title: 'E-commerce Platform', client: 'TechCorp Inc.', progress: 75 },
  { title: 'Mobile App Development', client: 'StartupXYZ', progress: 45 },
  { title: 'Website Redesign', client: 'Creative Studio', progress: 30 },
];

const recentTasks = [
  { title: 'Design user interface mockups', assignee: 'Sarah Johnson', status: 'Completed' },
  { title: 'Implement authentication system', assignee: 'Mike Chen', status: 'In-Progress' },
  { title: 'Write API documentation', assignee: 'Lisa Chen', status: 'Pending' },
];

const statusColor = (status: string) => {
  switch (status) {
    case 'Completed': return 'bg-green-100 text-green-700';
    case 'In-Progress': return 'bg-blue-100 text-blue-700';
    case 'Pending': return 'bg-yellow-100 text-yellow-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const sections = [
  { icon: '📅', title: 'Events', stat: 5, desc: 'Upcoming events and webinars', link: '/dashboard/events' },
  { icon: '🎫', title: 'Tickets', stat: 9, desc: 'Open support tickets', link: '/dashboard/tickets' },
  { icon: '📤', title: 'Deliverables', stat: 7, desc: 'Pending deliverables', link: '/dashboard/deliverables' },
  { icon: '👥', title: 'Users', stat: 15, desc: 'Active team members', link: '/dashboard/users' },
  { icon: '📝', title: 'Updates', stat: 3, desc: 'Recent announcements', link: '/dashboard/updates' },
];

const testimonials = [
  {
    quote: "This dashboard transformed our workflow! The animations and UI are next-level.",
    name: "Jane Doe",
    company: "TechCorp Inc.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    quote: "The best project management tool I've used. Super fast and beautiful!",
    name: "John Smith",
    company: "StartupXYZ",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    quote: "Our team loves the real-time updates and smooth experience.",
    name: "Emily Chen",
    company: "Creative Studio",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

const typewriterTexts = [
  "Welcome to IT Client Dashboard",
  "Experience the Power of React ✨",
  "Modern, Animated, and Responsive UI",
  "Manage Projects, Teams, and More!"
];

const Home: React.FC = () => {
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

  // Animated counters for stats
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));
  useEffect(() => {
    stats.forEach((stat, i) => {
      let start = 0;
      const end = typeof stat.value === 'number' ? stat.value : parseInt(stat.value.toString().replace(/[^0-9]/g, ''));
      const duration = 1000;
      const step = Math.ceil(end / (duration / 16));
      const interval = setInterval(() => {
        start += step;
        setAnimatedStats(prev => {
          const next = [...prev];
          next[i] = start >= end ? end : start;
          return next;
        });
        if (start >= end) clearInterval(interval);
      }, 16);
    });
  }, []);

  // Testimonial carousel
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIdx(idx => (idx + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100 px-4 py-0 relative overflow-hidden">
      {/* Animated Gradient Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob -z-10" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob -z-10" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob -z-10" style={{ animationDelay: '4s', transform: 'translate(-50%, -50%)' }} />

      {/* Hero Section */}
      <div className="w-full flex flex-col items-center justify-center min-h-[70vh] pt-24 pb-12">
        <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-3xl shadow-2xl p-10 md:p-16 flex flex-col items-center max-w-2xl border-2 border-white/40 dark:border-gray-800/40 animate-fade-in">
          <div className="text-7xl mb-6 animate-bounce">🚀</div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 text-center drop-shadow-lg flex items-center gap-3 animate-gradient-x min-h-[56px]">
            {displayed}
            <span className="w-2 h-8 bg-pink-500 animate-blink inline-block ml-1 align-middle rounded" />
          </h1>
          <p className="text-2xl text-primary-600 mb-4 text-center font-semibold">Your all-in-one platform for managing projects, teams, and IT events.</p>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-10 text-center max-w-2xl">Sign in to manage your projects, team, and tasks in one place. Experience seamless collaboration, real-time updates, and powerful analytics—all in a beautiful, modern interface.</p>
          <div className="flex flex-col sm:flex-row gap-6 mb-4 w-full justify-center">
            <Link to="/login" className="px-10 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl font-bold shadow-xl hover:from-blue-700 hover:to-pink-700 hover:scale-105 transition text-2xl w-full sm:w-auto text-center">Log In</Link>
            <Link to="/login" className="px-10 py-4 bg-white/80 border-2 border-primary-600 text-primary-600 rounded-2xl font-bold shadow-xl hover:bg-primary-50 hover:scale-105 transition text-2xl w-full sm:w-auto text-center">Sign Up</Link>
          </div>
        </div>
      </div>

      {/* Animated Stats */}
      <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10 animate-fade-in-up">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex flex-col items-center bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-lg p-6 border-2 border-white/40 dark:border-gray-800/40 hover:scale-105 hover:shadow-2xl transition-transform duration-200">
            <span className="text-4xl mb-2 animate-pop-in">{stat.icon}</span>
            <div className="text-3xl font-extrabold text-primary-600 mb-1 animate-count-up">{typeof stat.value === 'number' ? animatedStats[i] : stat.value}</div>
            <div className="text-gray-700 dark:text-gray-200 text-lg font-semibold">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Feature Highlights */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 px-2 animate-fade-in-up">
        {features.map((f) => (
          <div key={f.title} className="flex flex-col items-center bg-gradient-to-tr from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-2xl shadow-lg p-10 border-2 border-white/40 dark:border-gray-800/40 hover:scale-105 hover:shadow-2xl transition-transform duration-200">
            <span className="text-5xl mb-3 animate-pop-in">{f.icon}</span>
            <div className="font-bold text-gray-800 dark:text-white text-2xl mb-2 text-center">{f.title}</div>
            <div className="text-gray-500 dark:text-gray-300 text-lg text-center">{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Testimonial Carousel */}
      <div className="w-full max-w-2xl mx-auto mb-16 animate-fade-in">
        <div className="relative bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl p-8 border-2 border-white/40 dark:border-gray-800/40 flex flex-col items-center">
          <img src={testimonials[testimonialIdx].avatar} alt={testimonials[testimonialIdx].name} className="w-16 h-16 rounded-full mb-4 border-4 border-primary-200 shadow-lg" />
          <blockquote className="text-xl italic text-gray-700 dark:text-gray-200 text-center mb-2 animate-fade-in-up">“{testimonials[testimonialIdx].quote}”</blockquote>
          <div className="font-bold text-primary-600 text-lg">{testimonials[testimonialIdx].name}</div>
          <div className="text-gray-500 text-sm mb-2">{testimonials[testimonialIdx].company}</div>
          <div className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer text-2xl text-primary-400 hover:text-primary-600" onClick={() => setTestimonialIdx((testimonialIdx - 1 + testimonials.length) % testimonials.length)}>&#8592;</div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-2xl text-primary-400 hover:text-primary-600" onClick={() => setTestimonialIdx((testimonialIdx + 1) % testimonials.length)}>&#8594;</div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 flex flex-col items-center bg-transparent mt-auto animate-fade-in">
        <div className="flex gap-4 mb-2">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-600 transition text-2xl"><i className="fab fa-github"></i> GitHub</a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-600 transition text-2xl"><i className="fab fa-twitter"></i> Twitter</a>
          <a href="mailto:info@itdashboard.com" className="text-gray-400 hover:text-primary-600 transition text-2xl"><i className="fas fa-envelope"></i> Email</a>
        </div>
        <div className="text-xs text-gray-400 opacity-80 select-none">
          &copy; {new Date().getFullYear()} IT Client Dashboard. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home; 