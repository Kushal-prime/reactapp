import React from 'react';
import { Link } from 'react-router-dom';

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

const Home: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4 py-12 relative overflow-hidden">
    {/* Animated Blobs */}
    <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob -z-10" style={{ animationDelay: '0s' }} />
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob -z-10" style={{ animationDelay: '2s' }} />
    <div className="w-full flex flex-col items-center">
      <div className="text-7xl mb-6 animate-bounce">🚀</div>
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4 text-center drop-shadow-lg flex items-center gap-3">
        Welcome to IT Client Dashboard
      </h1>
      <p className="text-2xl text-primary-600 mb-4 text-center font-semibold">Your all-in-one platform for managing projects, teams, and IT events.</p>
      <p className="text-lg text-gray-600 mb-10 text-center max-w-3xl">Sign in to manage your projects, team, and tasks in one place.</p>
      <div className="flex flex-col sm:flex-row gap-6 mb-12">
        <Link to="/login" className="px-10 py-4 bg-primary-600 text-white rounded-2xl font-bold shadow-lg hover:bg-primary-700 transition text-2xl">Log In</Link>
        <Link to="/login" className="px-10 py-4 bg-white border-2 border-primary-600 text-primary-600 rounded-2xl font-bold shadow-lg hover:bg-primary-50 transition text-2xl">Sign Up</Link>
      </div>
      {/* Feature Highlights */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8 px-2">
        {features.map((f) => (
          <div key={f.title} className="flex flex-col items-center bg-gradient-to-tr from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8">
            <span className="text-4xl mb-2">{f.icon}</span>
            <div className="font-bold text-gray-800 text-xl mb-2">{f.title}</div>
            <div className="text-gray-500 text-lg text-center">{f.desc}</div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-xs text-gray-400 opacity-80 select-none">
        Powered by <span className="font-bold text-primary-600">React</span>
      </div>
    </div>
  </div>
);

export default Home; 