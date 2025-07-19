import React from 'react';
import { 
  Users, 
  Calendar, 
  FolderOpen, 
  Upload, 
  MessageSquare, 
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

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

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div className="bg-white rounded-3xl shadow p-8 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 text-center drop-shadow-lg flex items-center gap-3">
          <span>👋</span> Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-lg text-gray-600 mb-2 text-center max-w-2xl">Here’s a quick overview of your projects, team, and tasks. Manage everything in one place!</p>
      </div>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center bg-white rounded-xl shadow p-6 border border-gray-100">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
      {/* Feature Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:scale-105 hover:shadow-xl transition-transform duration-200 group">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{section.icon}</span>
              <span className="text-xl font-bold text-gray-800">{section.title}</span>
            </div>
            <div className="text-2xl font-extrabold text-primary-600 mb-1">{section.stat}</div>
            <div className="text-gray-500 mb-4">{section.desc}</div>
            <a href={section.link} className="mt-auto self-start flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold shadow hover:bg-primary-700 hover:scale-105 transition-all duration-150">
              View All <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        ))}
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
    </div>
  );
};

export default Dashboard; 