import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Upload, 
  Download,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { Deliverable } from '../types';

const Deliverables: React.FC = () => {
  const [deliverables, setDeliverables] = useState<Deliverable[]>([
    {
      id: '1',
      title: 'Frontend Components',
      description: 'React components for user authentication and dashboard',
      status: 'completed',
      dueDate: '2024-01-10',
      projectId: '1',
      fileUrl: 'https://example.com/frontend-components.zip',
      uploadedAt: '2024-01-09T15:30:00Z'
    },
    {
      id: '2',
      title: 'API Documentation',
      description: 'Complete API documentation with examples and endpoints',
      status: 'in-progress',
      dueDate: '2024-01-15',
      projectId: '1',
      fileUrl: undefined,
      uploadedAt: undefined
    },
    {
      id: '3',
      title: 'Database Schema',
      description: 'Database design and migration scripts',
      status: 'pending',
      dueDate: '2024-01-20',
      projectId: '1',
      fileUrl: undefined,
      uploadedAt: undefined
    },
    {
      id: '4',
      title: 'Mobile App UI',
      description: 'UI/UX designs and mockups for mobile application',
      status: 'overdue',
      dueDate: '2024-01-08',
      projectId: '2',
      fileUrl: undefined,
      uploadedAt: undefined
    },
    {
      id: '5',
      title: 'Testing Report',
      description: 'Comprehensive testing documentation and results',
      status: 'completed',
      dueDate: '2024-01-12',
      projectId: '3',
      fileUrl: 'https://example.com/testing-report.pdf',
      uploadedAt: '2024-01-11T10:15:00Z'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterProject, setFilterProject] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const projects = [
    { id: '1', name: 'E-commerce Platform Development' },
    { id: '2', name: 'Mobile App Development' },
    { id: '3', name: 'Data Analytics Dashboard' },
    { id: '4', name: 'Cloud Migration Project' }
  ];

  const filteredDeliverables = deliverables.filter(deliverable => {
    const matchesSearch = deliverable.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deliverable.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || deliverable.status === filterStatus;
    const matchesProject = filterProject === 'all' || deliverable.projectId === filterProject;
    return matchesSearch && matchesStatus && matchesProject;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'overdue':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getProjectName = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown Project';
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 mt-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-extrabold text-gray-900">Deliverables</h1>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg font-bold shadow hover:bg-primary-700 transition-colors text-lg"
        >
          <Upload className="h-5 w-5 mr-2" /> Upload Deliverable
        </button>
      </div>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search deliverables..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>
        <select
          value={filterProject}
          onChange={(e) => setFilterProject(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="all">All Projects</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
      </div>
      {/* Deliverables Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredDeliverables.length === 0 ? (
          <div className="col-span-full py-16 flex flex-col items-center gap-2 text-gray-400">
            <Upload className="w-10 h-10 text-primary-300 mb-2" />
            <span className="text-lg font-semibold">No deliverables found</span>
            <span className="text-sm">Try adjusting your search or upload a new deliverable.</span>
          </div>
        ) : (
          filteredDeliverables.map((deliverable, idx) => (
            <DeliverableCard key={deliverable.id} deliverable={deliverable} idx={idx} getProjectName={getProjectName} isOverdue={isOverdue} />
          ))
        )}
      </div>
    </div>
  );
};

// Animated Deliverable Card
const DeliverableCard: React.FC<{ deliverable: Deliverable; idx: number; getProjectName: (id: string) => string; isOverdue: (date: string) => boolean }> = ({ deliverable, idx, getProjectName, isOverdue }) => {
  const [show, setShow] = useState(false);
  const [titleDisplay, setTitleDisplay] = useState('');
  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), idx * 120);
    return () => clearTimeout(timeout);
  }, [idx]);
  useEffect(() => {
    if (show && titleDisplay.length < deliverable.title.length) {
      const timeout = setTimeout(() => {
        setTitleDisplay(deliverable.title.slice(0, titleDisplay.length + 1));
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [show, titleDisplay, deliverable.title]);
  const gradients = [
    'from-green-100 via-green-200 to-green-300',
    'from-blue-100 via-blue-200 to-blue-300',
    'from-red-100 via-red-200 to-red-300',
    'from-pink-100 via-pink-200 to-pink-300',
    'from-purple-100 via-purple-200 to-purple-300',
    'from-indigo-100 via-indigo-200 to-indigo-300',
    'from-teal-100 via-teal-200 to-teal-300',
    'from-orange-100 via-orange-200 to-orange-300',
  ];
  const gradient = gradients[idx % gradients.length];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500 animate-pop-in" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500 animate-pop-in" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-yellow-500 animate-pop-in" />;
      case 'overdue':
        return <XCircle className="h-5 w-5 text-red-500 animate-pop-in" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500 animate-pop-in" />;
    }
  };
  return (
    <div
      className={`bg-gradient-to-br ${gradient} dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl shadow-xl p-6 flex flex-col gap-4 items-center border-b-8 border-primary-200 transition-all duration-300 ${show ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'} hover:scale-110 hover:shadow-2xl hover:shadow-primary-200 dark:hover:shadow-primary-900 animate-pop-in`}
      style={{ transitionDelay: `${idx * 80}ms` }}
    >
      <div className="flex items-center gap-2 w-full justify-between">
        {getStatusIcon(deliverable.status)}
        <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ml-2 ${getStatusColor(deliverable.status)} animate-fade-in`}>{deliverable.status}</span>
      </div>
      <div className="text-xl font-extrabold text-primary-700 dark:text-primary-300 text-center w-full truncate animate-fade-in-up">
        {titleDisplay}<span className="w-1 h-6 bg-primary-400 inline-block ml-1 align-middle animate-blink rounded" />
      </div>
      <div className="text-sm text-gray-700 dark:text-gray-200 w-full text-center mb-2 animate-fade-in-up">{deliverable.description}</div>
      <div className="w-full flex items-center gap-2 justify-center animate-fade-in-up">
        <Calendar className="h-4 w-4 text-primary-400" />
        <span className="font-bold">Due:</span> {new Date(deliverable.dueDate).toLocaleDateString()}
        {isOverdue(deliverable.dueDate) && (
          <span className="ml-2 text-red-600 font-medium animate-pulse">(Overdue)</span>
        )}
      </div>
      <div className="w-full flex items-center gap-2 justify-center animate-fade-in-up">
        <span className="text-xs text-gray-500 dark:text-gray-400">Project:</span>
        <span className="font-semibold text-primary-700 dark:text-primary-300 animate-pop-in">{getProjectName(deliverable.projectId)}</span>
      </div>
      {deliverable.uploadedAt && (
        <div className="w-full flex items-center gap-2 justify-center text-xs text-gray-500 dark:text-gray-400 animate-fade-in-up">
          <Upload className="h-4 w-4" /> Uploaded: {new Date(deliverable.uploadedAt).toLocaleDateString()}
        </div>
      )}
      <div className="flex gap-2 mt-2 w-full justify-center">
        {deliverable.fileUrl ? (
          <button className="p-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition animate-pop-in" title="Download"><Download className="h-4 w-4" /></button>
        ) : (
          <button className="p-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition animate-pop-in" title="Upload"><Upload className="h-4 w-4" /></button>
        )}
        <button className="p-2 bg-primary-500 text-white rounded-full shadow hover:bg-primary-600 transition animate-pop-in" title="View"><Eye className="h-4 w-4" /></button>
        <button className="p-2 bg-yellow-500 text-white rounded-full shadow hover:bg-yellow-600 transition animate-pop-in" title="Edit"><Edit className="h-4 w-4" /></button>
        <button className="p-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition animate-pop-in" title="Delete"><Trash2 className="h-4 w-4" /></button>
      </div>
    </div>
  );
};

export default Deliverables; 