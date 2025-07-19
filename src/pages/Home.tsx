import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Confetti from 'react-confetti';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { useCallback } from 'react';
import { Howl } from 'howler';

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

const sparkleSound = new Howl({ src: ['https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae7e2.mp3'] });

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

  // Confetti state
  const [showConfetti, setShowConfetti] = useState(false);
  // Parallax mouse state
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  // Hero emoji tilt state
  const [emojiTilt, setEmojiTilt] = useState({ x: 0, y: 0 });
  // Hero emoji wink state
  const [wink, setWink] = useState(false);

  // Parallax handler
  const handleMouseMove = (e: React.MouseEvent) => {
    setMouse({ x: e.clientX, y: e.clientY });
  };

  // Hero emoji mouse handlers
  const handleEmojiMove = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
    setEmojiTilt({ x, y });
  };
  const handleEmojiLeave = () => setEmojiTilt({ x: 0, y: 0 });
  const handleEmojiClick = () => {
    setWink(true);
    setTimeout(() => setWink(false), 400);
    sparkleSound.play();
  };
  // Button sparkle/confetti handler
  const handleButtonClick = () => {
    setShowConfetti(true);
    sparkleSound.play();
    setTimeout(() => setShowConfetti(false), 2000);
  };

  // Particle config
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);
  const particlesOptions = {
    background: { color: 'transparent' },
    fpsLimit: 60,
    interactivity: {
      events: { onHover: { enable: true, mode: 'repulse' }, resize: true },
      modes: { repulse: { distance: 100, duration: 0.4 } }
    },
    particles: {
      color: { value: ['#a78bfa', '#f472b6', '#60a5fa', '#fbbf24'] },
      links: { enable: true, color: '#a78bfa', distance: 150, opacity: 0.2, width: 1 },
      move: { enable: true, speed: 1, direction: 'none', outModes: 'out' },
      number: { value: 60, density: { enable: true, area: 800 } },
      opacity: { value: 0.5 },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 4 } },
    },
    detectRetina: true,
  };

  return (
    <div onMouseMove={handleMouseMove} className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100 px-4 py-0 relative overflow-hidden">
      {/* Particle Starfield Background */}
      <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="absolute inset-0 w-full h-full -z-20" />
      {/* Morphing SVG Blobs */}
      <motion.svg viewBox="0 0 600 600" className="absolute top-0 left-0 w-96 h-96 opacity-30 -z-10" style={{ animationDelay: '0s' }}>
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
      <motion.svg viewBox="0 0 600 600" className="absolute bottom-0 right-0 w-96 h-96 opacity-30 -z-10" style={{ animationDelay: '2s' }}>
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
      {/* Animated SVG Wave Divider */}
      <motion.svg viewBox="0 0 1440 320" className="w-full h-24 absolute top-[60vh] left-0 z-10">
        <motion.path fill="#fff" fillOpacity="1"
          animate={{
            d: [
              'M0,160L80,170.7C160,181,320,203,480,197.3C640,192,800,160,960,133.3C1120,107,1280,85,1360,74.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z',
              'M0,180L80,160C160,140,320,100,480,120C640,140,800,220,960,240C1120,260,1280,220,1360,200L1440,180L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z',
              'M0,160L80,170.7C160,181,320,203,480,197.3C640,192,800,160,960,133.3C1120,107,1280,85,1360,74.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z',
            ]
          }}
          transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
        />
      </motion.svg>
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={400} />}
      {/* Hero Section */}
      <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="w-full flex flex-col items-center justify-center min-h-[70vh] pt-24 pb-12">
        <motion.div whileHover={{ scale: 1.08, rotate: 8 }} className="backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 rounded-3xl shadow-2xl p-10 md:p-16 flex flex-col items-center max-w-2xl border-2 border-white/40 dark:border-gray-800/40 animate-fade-in">
          <motion.div
            animate={{ y: [0, -20, 0], rotateX: emojiTilt.y, rotateY: emojiTilt.x }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-7xl mb-6 cursor-pointer select-none"
            onMouseMove={handleEmojiMove}
            onMouseLeave={handleEmojiLeave}
            onClick={handleEmojiClick}
          >
            {wink ? '😉' : '🚀'}
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 text-center drop-shadow-lg flex items-center gap-3 animate-gradient-x min-h-[56px]">
            {displayed}
            <span className="w-2 h-8 bg-pink-500 animate-blink inline-block ml-1 align-middle rounded" />
          </h1>
          <p className="text-2xl text-primary-600 mb-4 text-center font-semibold">Your all-in-one platform for managing projects, teams, and IT events.</p>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-10 text-center max-w-2xl">Sign in to manage your projects, team, and tasks in one place. Experience seamless collaboration, real-time updates, and powerful analytics—all in a beautiful, modern interface.</p>
          <div className="flex flex-col sm:flex-row gap-6 mb-4 w-full justify-center">
            <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.07, boxShadow: '0 0 24px #a78bfa' }}>
              <Link to="/login" onClick={handleButtonClick} className="px-10 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl font-bold shadow-xl hover:from-blue-700 hover:to-pink-700 hover:scale-105 transition text-2xl w-full sm:w-auto text-center">Log In</Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.07, boxShadow: '0 0 24px #a78bfa' }}>
              <Link to="/login" className="px-10 py-4 bg-white/80 border-2 border-primary-600 text-primary-600 rounded-2xl font-bold shadow-xl hover:bg-primary-50 hover:scale-105 transition text-2xl w-full sm:w-auto text-center">Sign Up</Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      {/* Feature Highlights - Glassmorphism */}
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 px-2 animate-fade-in-up">
        {features.map((f, i) => (
          <motion.div key={f.title} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.08, boxShadow: '0 0 32px #a78bfa' }} transition={{ duration: 0.5, delay: i * 0.1 }} className="flex flex-col items-center backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 border border-white/40 dark:border-gray-800/40 rounded-2xl shadow-lg p-10 hover:scale-105 hover:shadow-2xl transition-transform duration-200">
            <span className="text-5xl mb-3 animate-pop-in">{f.icon}</span>
            <div className="font-bold text-gray-800 dark:text-white text-2xl mb-2 text-center">{f.title}</div>
            <div className="text-gray-500 dark:text-gray-300 text-lg text-center">{f.desc}</div>
          </motion.div>
        ))}
      </motion.div>
      {/* Testimonial Carousel - Glassmorphism */}
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="w-full max-w-2xl mx-auto mb-16 animate-fade-in">
        <motion.div layout className="relative backdrop-blur-lg bg-white/40 dark:bg-gray-900/40 rounded-2xl shadow-xl p-8 border-2 border-white/40 dark:border-gray-800/40 flex flex-col items-center">
          <motion.img layout src={testimonials[testimonialIdx].avatar} alt={testimonials[testimonialIdx].name} className="w-16 h-16 rounded-full mb-4 border-4 border-primary-200 shadow-lg" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} />
          <motion.blockquote layout className="text-xl italic text-gray-700 dark:text-gray-200 text-center mb-2 animate-fade-in-up" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>“{testimonials[testimonialIdx].quote}”</motion.blockquote>
          <div className="font-bold text-primary-600 text-lg">{testimonials[testimonialIdx].name}</div>
          <div className="text-gray-500 text-sm mb-2">{testimonials[testimonialIdx].company}</div>
          <motion.div className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer text-2xl text-primary-400 hover:text-primary-600" whileTap={{ scale: 0.8 }} onClick={() => setTestimonialIdx((testimonialIdx - 1 + testimonials.length) % testimonials.length)}>&#8592;</motion.div>
          <motion.div className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-2xl text-primary-400 hover:text-primary-600" whileTap={{ scale: 0.8 }} onClick={() => setTestimonialIdx((testimonialIdx + 1) % testimonials.length)}>&#8594;</motion.div>
        </motion.div>
      </motion.div>
      {/* Floating Action Button with sound */}
      <motion.a href="#" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: 'spring', stiffness: 200 }} whileHover={{ scale: 1.15, boxShadow: '0 0 32px #a78bfa' }} className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full shadow-2xl px-6 py-4 text-xl font-bold flex items-center gap-2 animate-bounce cursor-pointer" onClick={handleButtonClick}>
        <span>✨ Get Started</span>
      </motion.a>
      {/* Footer */}
      <motion.footer initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="w-full py-8 flex flex-col items-center bg-transparent mt-auto animate-fade-in">
        <div className="flex gap-4 mb-2">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-600 transition text-2xl"><i className="fab fa-github"></i> GitHub</a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-600 transition text-2xl"><i className="fab fa-twitter"></i> Twitter</a>
          <a href="mailto:info@itdashboard.com" className="text-gray-400 hover:text-primary-600 transition text-2xl"><i className="fas fa-envelope"></i> Email</a>
        </div>
        <div className="text-xs text-gray-400 opacity-80 select-none">
          &copy; {new Date().getFullYear()} IT Client Dashboard. All rights reserved.
        </div>
      </motion.footer>
    </div>
  );
};

export default Home; 