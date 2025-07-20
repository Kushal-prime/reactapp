import React, { useEffect, useRef, useState } from 'react';
import { 
  Users, 
  Calendar, 
  FolderOpen, 
  Upload, 
  MessageSquare, 
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  Plus,
  User as UserIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSpring, animated } from 'react-spring';
import Confetti from 'react-confetti';
import { Dialog } from '@headlessui/react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Personalized greeting logic
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good morning', icon: '☀️' };
    if (hour < 18) return { text: 'Good afternoon', icon: '⛅' };
    return { text: 'Good evening', icon: '🌙' };
  };
  const greeting = getGreeting();

  const stats = [
    { icon: '📁', label: 'Total Projects', value: 12 },
    { icon: '🚀', label: 'Active Projects', value: 8 },
    { icon: '💰', label: 'Total Revenue', value: '$125,000' },
    { icon: '👥', label: 'Team Members', value: 15 },
  ];
  const sections = [
    { icon: '📅', title: 'Events', stat: 5, desc: 'Upcoming events and webinars', link: '/dashboard/events' },
    { icon: '🎫', title: 'Tickets', stat: 9, desc: 'Open support tickets', link: '/dashboard/tickets' },
    { icon: '📤', title: 'Deliverables', stat: 7, desc: 'Pending deliverables', link: '/dashboard/deliverables' },
    { icon: '👥', title: 'Users', stat: 15, desc: 'Active team members', link: '/dashboard/users' },
    { icon: '📝', title: 'Updates', stat: 3, desc: 'Recent announcements', link: '/dashboard/updates' },
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

  const recentEvents = [
    {
      id: '1',
      title: 'React Advanced Workshop',
      type: 'webinar',
      date: '2024-01-15',
      time: '14:00',
      provider: 'Tech Academy',
      participants: 45,
      maxParticipants: 50,
    },
    {
      id: '2',
      title: 'Data Science Fundamentals',
      type: 'course',
      date: '2024-01-18',
      time: '10:00',
      provider: 'Data Institute',
      participants: 28,
      maxParticipants: 30,
    },
    {
      id: '3',
      title: 'Cloud Architecture Seminar',
      type: 'seminar',
      date: '2024-01-20',
      time: '16:00',
      provider: 'Cloud Solutions',
      participants: 15,
      maxParticipants: 25,
    },
  ];

  const upcomingDeadlines = [
    {
      id: '1',
      title: 'Project Alpha - Phase 1',
      dueDate: '2024-01-16',
      status: 'urgent',
    },
    {
      id: '2',
      title: 'Project Beta - Documentation',
      dueDate: '2024-01-18',
      status: 'warning',
    },
    {
      id: '3',
      title: 'Project Gamma - Testing',
      dueDate: '2024-01-22',
      status: 'normal',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent':
        return 'text-red-600 bg-red-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-green-600 bg-green-100';
    }
  };

  // Animated stat cards
  const [animatedStats, setAnimatedStats] = useState(stats.map(s => 0));
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    stats.forEach((stat, i) => {
      let start = 0;
      const end = typeof stat.value === 'number' ? stat.value : parseInt(stat.value.toString().replace(/[^0-9]/g, ''));
      const duration = 1000;
      const step = Math.ceil(end / (duration / 16));
      intervals[i] = setInterval(() => {
        start += step;
        setAnimatedStats(prev => {
          const next = [...prev];
          next[i] = start >= end ? end : start;
          return next;
        });
        if (start >= end) clearInterval(intervals[i]);
      }, 16);
    });
    return () => intervals.forEach(clearInterval);
  }, []);

  // Animated counters with react-spring
  // const animatedStatSprings = stats.map((stat, i) => {
  //   const end = typeof stat.value === 'number' ? stat.value : parseInt(stat.value.toString().replace(/[^0-9]/g, ''));
  //   return useSpring({
  //     from: { val: 0 },
  //     to: { val: end },
  //     config: { mass: 1, tension: 120, friction: 20 },
  //     delay: 300 + i * 200,
  //   });
  // });
  // Section reveal on scroll
  const [reveal, setReveal] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) setReveal(true);
      else setReveal(false);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Example trend indicators (randomized for demo)
  const trends = ['up', 'down', 'up', 'up'];
  const trendPercents = ['+5%', '-2%', '+8%', '+1%'];

  // Recent activity feed (demo data)
  const recentActivity = [
    { icon: '✅', text: 'Task "Design user interface mockups" completed by Sarah Johnson', time: '2 min ago' },
    { icon: '🆕', text: 'New client "Acme Corp" added', time: '10 min ago' },
    { icon: '🚀', text: 'Project "Mobile App Development" launched', time: '1 hour ago' },
    { icon: '✏️', text: 'Profile updated', time: 'Yesterday' },
  ];

  // Floating quick action button state
  const [fabOpen, setFabOpen] = useState(false);

  const typewriterGreetings = [
    `Welcome, ${user?.name?.split(' ')[0] || 'User'}!`,
    'Your Project Hub 🚀',
    'Track, Manage, Succeed!',
    'Let’s get productive!'
  ];

  // Typewriter greeting effect
  const [greetIdx, setGreetIdx] = useState(0);
  const [greetDisplay, setGreetDisplay] = useState('');
  const [greetChar, setGreetChar] = useState(0);
  useEffect(() => {
    if (greetChar < typewriterGreetings[greetIdx].length) {
      const timeout = setTimeout(() => {
        setGreetDisplay(typewriterGreetings[greetIdx].slice(0, greetChar + 1));
        setGreetChar(greetChar + 1);
      }, 60);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setGreetChar(0);
        setGreetIdx((greetIdx + 1) % typewriterGreetings.length);
        setGreetDisplay('');
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [greetChar, greetIdx]);

  // Typewriter for section titles
  const [sectionTypeIdx, setSectionTypeIdx] = useState(0);
  const [sectionTypeChar, setSectionTypeChar] = useState(0);
  const [sectionTypeDisplay, setSectionTypeDisplay] = useState('');
  const [sectionTypeActive, setSectionTypeActive] = useState(0);
  useEffect(() => {
    if (sectionTypeChar < sections[sectionTypeActive]?.title.length) {
      const timeout = setTimeout(() => {
        setSectionTypeDisplay(sections[sectionTypeActive].title.slice(0, sectionTypeChar + 1));
        setSectionTypeChar(sectionTypeChar + 1);
      }, 40);
      return () => clearTimeout(timeout);
    }
  }, [sectionTypeChar, sectionTypeActive, sections]);
  useEffect(() => {
    setSectionTypeChar(0);
    setSectionTypeDisplay('');
  }, [sectionTypeActive]);
  // Confetti for section click
  const [confettiSection, setConfettiSection] = useState<number|null>(null);

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectForm, setProjectForm] = useState({ title: '', client: '', progress: 0 });
  const [projects, setProjects] = useState(recentProjects);

  // Add Project handler
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    setProjects([
      ...projects,
      { title: projectForm.title, client: projectForm.client, progress: Number(projectForm.progress) }
    ]);
    setProjectForm({ title: '', client: '', progress: 0 });
    setShowProjectModal(false);
  };

  return (
    <div className="space-y-10 min-h-screen bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100 relative overflow-hidden">
      {/* Animated Morphing Blobs */}
      <svg className="absolute top-0 left-0 w-96 h-96 opacity-30 animate-blob-morph -z-10" viewBox="0 0 400 400" fill="none"><defs><linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#a5b4fc"/><stop offset="100%" stopColor="#fbcfe8"/></linearGradient></defs><path d="M300,200Q300,300,200,350Q100,300,100,200Q100,100,200,50Q300,100,300,200Z" fill="url(#grad1)"/></svg>
      <svg className="absolute bottom-0 right-0 w-96 h-96 opacity-30 animate-blob-morph -z-10" viewBox="0 0 400 400" fill="none"><defs><linearGradient id="grad2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fbcfe8"/><stop offset="100%" stopColor="#a5b4fc"/></linearGradient></defs><path d="M300,200Q350,300,200,350Q50,300,100,200Q50,100,200,50Q350,100,300,200Z" fill="url(#grad2)"/></svg>
      {/* Welcome Section - Redesigned */}
      <div className="relative flex flex-col items-center justify-center min-h-[340px] w-full bg-gradient-to-br from-white/80 via-blue-50/80 to-pink-50/80 dark:from-gray-900/80 dark:via-blue-900/80 dark:to-pink-900/80 rounded-3xl shadow-2xl border-2 border-white/40 dark:border-gray-800/40 overflow-hidden animate-fade-in">
        {/* Animated floating shapes */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-200 rounded-full opacity-30 blur-2xl animate-blob -z-10" />
        <div className="absolute -bottom-12 right-10 w-56 h-56 bg-blue-200 rounded-full opacity-30 blur-2xl animate-blob2 -z-10" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-100 rounded-full opacity-20 blur-3xl animate-blob3 -z-10" style={{ transform: 'translate(-50%, -50%)' }} />
        <div className="flex flex-col items-center z-10 w-full">
          {/* Avatar and Greeting */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 via-pink-400 to-purple-400 flex items-center justify-center shadow-lg mb-2 animate-pop-in">
              {user?.avatar ? (
                <img src={user.avatar} alt="avatar" className="w-20 h-20 rounded-full object-cover" />
              ) : (
                <UserIcon className="w-12 h-12 text-white" />
              )}
            </div>
            <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-center drop-shadow-lg animate-gradient-x min-h-[48px]">
              {greetDisplay}
              <span className="w-2 h-8 bg-pink-500 animate-blink inline-block ml-1 align-middle rounded" />
            </div>
            <div className="text-lg text-gray-500 dark:text-gray-300 mt-2 animate-fade-in-up">Let’s build something amazing today! 🚀</div>
          </div>
          {/* Quick Actions */}
          <div className="flex flex-col items-center gap-2 w-full mt-4">
            <div className="text-sm font-semibold text-gray-400 mb-1 animate-fade-in-up">Quick Actions</div>
            <div className="flex gap-4">
              <button onClick={() => setShowProjectModal(true)} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 via-teal-400 to-blue-300 text-white rounded-xl font-bold shadow hover:from-blue-600 hover:to-teal-400 hover:scale-105 transition-all duration-150 animate-pop-in"><FolderOpen className="w-5 h-5" /> Add Project</button>
              <a href="/dashboard/tasks" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 text-white rounded-xl font-bold shadow hover:from-pink-500 hover:to-yellow-400 hover:scale-105 transition-all duration-150 animate-pop-in"><TrendingUp className="w-5 h-5" /> Add Task</a>
              <a href="/dashboard/clients" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 via-teal-400 to-blue-300 text-white rounded-xl font-bold shadow hover:from-green-600 hover:to-teal-400 hover:scale-105 transition-all duration-150 animate-pop-in"><Users className="w-5 h-5" /> Add Client</a>
            </div>
          </div>
          {/* Quick Stats or Recent Activity */}
          <div className="mt-8 w-full max-w-2xl animate-fade-in-up">
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <div className="flex flex-col items-center bg-white/80 dark:bg-gray-800/80 rounded-xl shadow p-4 min-w-[120px]">
                <div className="text-2xl font-bold text-blue-600">{stats[0].value}</div>
                <div className="text-xs text-gray-500">Projects</div>
              </div>
              <div className="flex flex-col items-center bg-white/80 dark:bg-gray-800/80 rounded-xl shadow p-4 min-w-[120px]">
                <div className="text-2xl font-bold text-pink-600">{stats[1].value}</div>
                <div className="text-xs text-gray-500">Active</div>
              </div>
              <div className="flex flex-col items-center bg-white/80 dark:bg-gray-800/80 rounded-xl shadow p-4 min-w-[120px]">
                <div className="text-2xl font-bold text-green-600">{stats[3].value}</div>
                <div className="text-xs text-gray-500">Team</div>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-400 text-center">Tip: Use the quick actions above to get started fast!</div>
          </div>
        </div>
      </div>
      {/* Stat Cards with tilt and animated counters */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full transition-all duration-700 ${reveal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}> 
        {stats.map((stat, i) => (
          <AnimatedStatCard
            key={stat.label}
            stat={stat}
            trend={trends[i]}
            trendPercent={trendPercents[i]}
            delay={300 + i * 200}
          />
        ))}
      </div>
      {/* Feature Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
        {sections.map((section, i) => {
          let bg = '';
          if (section.title === 'Events') bg = 'bg-gradient-to-br from-blue-200 via-blue-100 to-white dark:from-blue-900 dark:via-blue-800 dark:to-gray-900';
          else if (section.title === 'Tickets') bg = 'bg-gradient-to-br from-pink-200 via-pink-100 to-white dark:from-pink-900 dark:via-pink-800 dark:to-gray-900';
          else if (section.title === 'Deliverables') bg = 'bg-gradient-to-br from-purple-200 via-purple-100 to-white dark:from-purple-900 dark:via-purple-800 dark:to-gray-900';
          else if (section.title === 'Users') bg = 'bg-gradient-to-br from-yellow-200 via-yellow-100 to-white dark:from-yellow-900 dark:via-yellow-800 dark:to-gray-900';
          else if (section.title === 'Updates') bg = 'bg-gradient-to-br from-teal-200 via-teal-100 to-white dark:from-teal-900 dark:via-teal-800 dark:to-gray-900';
          else bg = 'bg-gradient-to-br from-white via-blue-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-pink-900';
          const isActive = sectionTypeActive === i;
          return (
            <div key={section.title} className="relative">
              {confettiSection === i && <Confetti width={300} height={200} recycle={false} numberOfPieces={120} style={{position:'absolute',top:0,left:0,pointerEvents:'none',zIndex:20}} />}
              <a
                href={section.link}
                className={`flex flex-col ${bg} rounded-2xl shadow-xl p-6 border-4 border-transparent hover:border-pink-400 dark:hover:border-pink-600 hover:shadow-pink-200 dark:hover:shadow-pink-900 transition-transform duration-200 group cursor-pointer animate-fade-in-up relative overflow-hidden`}
                onMouseEnter={() => setSectionTypeActive(i)}
                onClick={e => { setConfettiSection(i); setTimeout(() => setConfettiSection(null), 1200); }}
                style={{ minHeight: 180 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl group-hover:scale-125 transition-transform animate-bounce">{section.icon}</span>
                  <span className="text-xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient-x group-hover:scale-110 transition-transform">
                    {isActive ? (
                      <>
                        {sectionTypeDisplay}
                        <span className="w-1 h-6 bg-pink-400 inline-block ml-1 align-middle animate-blink rounded" />
                      </>
                    ) : section.title}
                  </span>
                  {section.title === 'Updates' && <span className="ml-2 px-2 py-0.5 bg-pink-500 text-white text-xs font-bold rounded-full animate-pulse">New</span>}
                </div>
                <div className="text-2xl font-extrabold text-primary-600 mb-1 animate-count-up">{section.stat}</div>
                <div className="text-gray-500 mb-4 animate-fade-in-up">{section.desc}</div>
                <span className={`mt-auto self-start flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow hover:scale-110 transition-all duration-150 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white animate-pop-in`}>
                  View All <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            </div>
          );
        })}
        {/* Clients Section Card */}
        <a href="/dashboard/clients" className="flex flex-col bg-gradient-to-br from-green-200 via-green-300 to-green-400 dark:from-green-900 dark:via-green-800 dark:to-green-700 rounded-2xl shadow-xl p-6 border-4 border-green-300 hover:scale-105 hover:shadow-2xl hover:border-green-500 transition-transform duration-200 group cursor-pointer animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl group-hover:scale-125 transition-transform">💼</span>
            <span className="text-xl font-bold text-green-900 dark:text-green-200 group-hover:text-green-700 transition-colors">Clients</span>
          </div>
          <div className="text-lg font-semibold text-green-800 dark:text-green-100 mb-1">Manage your clients and their details here.</div>
          <span className="mt-auto self-start flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 hover:scale-105 transition-all duration-150">
            View All <ArrowRight className="w-4 h-4" />
          </span>
        </a>
        {/* Tasks Section Card */}
        <a href="/dashboard/tasks" className="flex flex-col bg-gradient-to-br from-red-100 via-red-200 to-red-300 dark:from-red-900 dark:via-red-800 dark:to-red-700 rounded-2xl shadow-xl p-6 border-4 border-red-200 hover:scale-105 hover:shadow-2xl hover:border-red-400 transition-transform duration-200 group cursor-pointer animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl group-hover:scale-125 transition-transform">🗂️</span>
            <span className="text-xl font-bold text-red-900 dark:text-red-200 group-hover:text-red-700 transition-colors">Tasks</span>
          </div>
          <div className="text-lg font-semibold text-red-800 dark:text-red-100 mb-1">Track and manage your tasks efficiently.</div>
          <span className="mt-auto self-start flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold shadow hover:bg-red-700 hover:scale-105 transition-all duration-150">
            View All <ArrowRight className="w-4 h-4" />
          </span>
        </a>
      </div>
      {/* Recent Projects & Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* Recent Projects */}
        <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-6 border-2 border-white/40 dark:border-gray-800/40 animate-fade-in-up">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">📈 Recent Projects</h2>
          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.title} className="mb-2 animate-pop-in hover:scale-105 hover:shadow-lg transition-transform duration-200 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-gray-800 dark:text-white">{proj.title}</div>
                  <div className="text-xs text-gray-500">{proj.client}</div>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3 mt-2">
                  <div className="h-3 rounded-full bg-primary-500" style={{ width: `${proj.progress}%` }} />
                </div>
                <div className="text-xs text-gray-500 mt-1">{proj.progress}% complete</div>
              </div>
            ))}
          </div>
        </div>
        {/* Recent Tasks */}
        <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-6 border-2 border-white/40 dark:border-gray-800/40 animate-fade-in-up">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">✅ Recent Tasks</h2>
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div key={task.title} className="mb-2 animate-pop-in hover:scale-105 hover:shadow-lg transition-transform duration-200 bg-gradient-to-r from-pink-50 to-yellow-50 dark:from-pink-900 dark:to-yellow-900 rounded-xl p-4">
                <div className="font-semibold text-gray-800 dark:text-white">{task.title}</div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  Assigned to {task.assignee}
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor(task.status)}`}>{task.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Recent Activity Feed */}
      <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-6 border-2 border-white/40 dark:border-gray-800/40 mt-8 animate-fade-in-up">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">🕒 Recent Activity</h2>
        <ul className="space-y-3">
          {recentActivity.map((activity, idx) => (
            <li key={idx} className="flex items-center gap-3 animate-pop-in hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900 transition-transform duration-200 rounded-xl p-2">
              <span className="text-2xl">{activity.icon}</span>
              <span className="flex-1 text-gray-700 dark:text-white">{activity.text}</span>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Floating Quick Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative flex flex-col items-end">
          {fabOpen && (
            <div className="mb-2 flex flex-col gap-2 animate-fade-in">
              <a href="/dashboard/projects" className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">Add Project</a>
              <a href="/dashboard/tasks" className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition">Add Task</a>
              <a href="/dashboard/clients" className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">Add Client</a>
            </div>
          )}
          <button
            onClick={() => setFabOpen(fab => !fab)}
            className={`w-14 h-14 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-lg hover:bg-primary-700 transition-all duration-200 text-3xl focus:outline-none ${fabOpen ? 'rotate-45' : ''} animate-bounce-slow`}
            aria-label="Quick actions"
          >
            <Plus className="w-8 h-8 transition-transform duration-200" style={{transform: fabOpen ? 'rotate(45deg)' : 'rotate(0deg)'}} />
          </button>
        </div>
      </div>
      {/* Project Modal */}
      <Dialog open={showProjectModal} onClose={() => setShowProjectModal(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <Dialog.Panel className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in">
          <Dialog.Title className="text-2xl font-bold mb-4 text-primary-700">Add Project</Dialog.Title>
          <form onSubmit={handleAddProject} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" name="title" value={projectForm.title} onChange={e => setProjectForm(f => ({ ...f, title: e.target.value }))} className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Client</label>
              <input type="text" name="client" value={projectForm.client} onChange={e => setProjectForm(f => ({ ...f, client: e.target.value }))} className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Progress (%)</label>
              <input type="number" name="progress" value={projectForm.progress} onChange={e => setProjectForm(f => ({ ...f, progress: Number(e.target.value) }))} min={0} max={100} className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500" required />
            </div>
            <div className="flex gap-2 mt-4">
              <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition font-bold">Add</button>
              <button type="button" onClick={() => setShowProjectModal(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition font-bold">Cancel</button>
            </div>
          </form>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

// AnimatedStatCard child component
const AnimatedStatCard = ({ stat, trend, trendPercent, delay }: { stat: any, trend: string, trendPercent: string, delay: number }) => {
  const end = typeof stat.value === 'number' ? stat.value : parseInt(stat.value.toString().replace(/[^0-9]/g, ''));
  const spring = useSpring({
    from: { val: 0 },
    to: { val: end },
    config: { mass: 1, tension: 120, friction: 20 },
    delay,
  });
  return (
    <animated.div
      className="flex flex-col items-center bg-gradient-to-br from-white via-blue-100 to-pink-100 dark:from-gray-900 dark:via-blue-900 dark:to-pink-900 rounded-2xl shadow-xl p-6 border-2 border-white/40 dark:border-gray-800/40 hover:scale-110 hover:shadow-2xl transition-transform duration-200 group animate-fade-in-up"
      style={{
        transform: spring.val.to(val => `scale(${0.8 + 0.2 * (val / end)})`),
      }}
    >
      <div className="text-4xl mb-2 group-hover:scale-125 transition-transform animate-pop-in">{stat.icon}</div>
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors animate-count-up">
          {typeof stat.value === 'number' ? <animated.span>{spring.val.to(val => Math.floor(val))}</animated.span> : stat.value}
        </div>
        <span className={`text-xs font-semibold ${trend==='up' ? 'text-green-600' : 'text-red-600'}`}>{trendPercent} {trend==='up' ? '▲' : '▼'}</span>
      </div>
      <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
    </animated.div>
  );
};

export default Dashboard; 