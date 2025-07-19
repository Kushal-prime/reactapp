import React, { useState } from 'react';
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
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Deliverables List</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredDeliverables.length === 0 ? (
            <div className="py-16 flex flex-col items-center gap-2 text-gray-400">
              <Upload className="w-10 h-10 text-primary-300 mb-2" />
              <span className="text-lg font-semibold">No deliverables found</span>
              <span className="text-sm">Try adjusting your search or upload a new deliverable.</span>
            </div>
          ) : (
            filteredDeliverables.map((deliverable) => (
              <div key={deliverable.id} className="p-6 hover:bg-primary-50 transition-colors flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    {getStatusIcon(deliverable.status)}
                    <h4 className="text-lg font-medium text-gray-900 ml-2">{deliverable.title}</h4>
                    <span className={`ml-3 px-2 py-1 text-xs font-bold rounded-full ${getStatusColor(deliverable.status)}`}>{deliverable.status}</span>
                  </div>
                  <p className="text-gray-600 mb-3">{deliverable.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Due: {new Date(deliverable.dueDate).toLocaleDateString()}
                      {isOverdue(deliverable.dueDate) && (
                        <span className="ml-2 text-red-600 font-medium">(Overdue)</span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">Project:</span>
                      {getProjectName(deliverable.projectId)}
                    </div>
                    {deliverable.uploadedAt && (
                      <div className="flex items-center">
                        <Upload className="h-4 w-4 mr-2" />
                        Uploaded: {new Date(deliverable.uploadedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {deliverable.fileUrl ? (
                    <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                  ) : (
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                      <Upload className="h-4 w-4" />
                    </button>
                  )}
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Deliverables; 