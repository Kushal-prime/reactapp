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
  Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl shadow-xl p-10 flex flex-col items-center text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-20 w-64 h-64 bg-white rounded-full blur-3xl" style={{zIndex:0}}></div>
        <div className="flex flex-col items-center z-10">
          <div className="text-2xl font-semibold text-white mb-4 text-center">
            {greeting.text}, {user?.name?.split(' ')[0] || 'User'}!
          </div>
          <div className="flex gap-4 mt-2">
            <a href="/dashboard/projects" className="px-5 py-2 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 text-white rounded-lg font-semibold shadow hover:from-blue-600 hover:to-blue-400 hover:scale-105 transition-all duration-150">Add Project</a>
            <a href="/dashboard/tasks" className="px-5 py-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 text-white rounded-lg font-semibold shadow hover:from-yellow-500 hover:to-orange-500 hover:scale-105 transition-all duration-150">Add Task</a>
            <a href="/dashboard/clients" className="px-5 py-2 bg-gradient-to-r from-green-500 via-green-400 to-green-300 text-white rounded-lg font-semibold shadow hover:from-green-600 hover:to-green-400 hover:scale-105 transition-all duration-150">Add Client</a>
          </div>
        </div>
      </div>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex flex-col items-center bg-gradient-to-br from-white via-blue-50 to-purple-100 rounded-2xl shadow-lg p-6 border border-gray-100 hover:scale-105 hover:shadow-2xl transition-transform duration-200 group">
            <div className="text-4xl mb-2 group-hover:scale-125 transition-transform">{stat.icon}</div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                {typeof stat.value === 'number' ? animatedStats[i] : stat.value}
              </div>
              <span className={`text-xs font-semibold ${trends[i]==='up' ? 'text-green-600' : 'text-red-600'}`}>{trendPercents[i]} {trends[i]==='up' ? '▲' : '▼'}</span>
            </div>
            <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
      {/* Feature Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
        {sections.map((section) => (
          <a key={section.title} href={section.link} className="flex flex-col bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:scale-105 hover:shadow-xl transition-transform duration-200 group cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl group-hover:scale-125 transition-transform">{section.icon}</span>
              <span className="text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors">{section.title}</span>
            </div>
            <div className="text-2xl font-extrabold text-primary-600 mb-1">{section.stat}</div>
            <div className="text-gray-500 mb-4">{section.desc}</div>
            <span className={`mt-auto self-start flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow hover:scale-105 transition-all duration-150 ${section.title === 'Events' ? 'bg-blue-600 hover:bg-blue-700 text-white' : section.title === 'Tickets' ? 'bg-pink-600 hover:bg-pink-700 text-white' : section.title === 'Deliverables' ? 'bg-purple-600 hover:bg-purple-700 text-white' : section.title === 'Users' ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`}>View All <ArrowRight className="w-4 h-4" /></span>
          </a>
        ))}
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
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">📈 Recent Projects</h2>
          <div className="space-y-4">
            {recentProjects.map((proj) => (
              <div key={proj.title} className="mb-2">
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-gray-800">{proj.title}</div>
                  <div className="text-xs text-gray-500">{proj.client}</div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 mt-2">
                  <div className="h-3 rounded-full bg-primary-500" style={{ width: `${proj.progress}%` }} />
                </div>
                <div className="text-xs text-gray-500 mt-1">{proj.progress}% complete</div>
              </div>
            ))}
          </div>
        </div>
        {/* Recent Tasks */}
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">✅ Recent Tasks</h2>
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div key={task.title} className="mb-2">
                <div className="font-semibold text-gray-800">{task.title}</div>
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
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 mt-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">🕒 Recent Activity</h2>
        <ul className="space-y-3">
          {recentActivity.map((activity, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <span className="text-2xl">{activity.icon}</span>
              <span className="flex-1 text-gray-700">{activity.text}</span>
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
            className={`w-14 h-14 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-lg hover:bg-primary-700 transition-all duration-200 text-3xl focus:outline-none ${fabOpen ? 'rotate-45' : ''}`}
            aria-label="Quick actions"
          >
            <Plus className="w-8 h-8 transition-transform duration-200" style={{transform: fabOpen ? 'rotate(45deg)' : 'rotate(0deg)'}} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 