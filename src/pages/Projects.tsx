import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import { useToast } from '../components/Layout/Layout';

interface ProjectType {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold' | 'cancelled';
  client: string;
  progress: number;
}

const initialProjects: ProjectType[] = [
  {
    id: '1',
    title: 'E-commerce Platform Development',
    description: 'Building a modern e-commerce platform with React and Node.js',
    status: 'active',
    client: 'TechCorp Inc.',
    progress: 65,
  },
  {
    id: '2',
    title: 'Mobile App Development',
    description: 'iOS and Android app for food delivery service',
    status: 'active',
    client: 'FoodExpress',
    progress: 35,
  },
  {
    id: '3',
    title: 'Data Analytics Dashboard',
    description: 'Real-time analytics dashboard for business intelligence',
    status: 'completed',
    client: 'DataFlow Solutions',
    progress: 100,
  },
  {
    id: '4',
    title: 'Cloud Migration Project',
    description: 'Migrating legacy systems to AWS cloud infrastructure',
    status: 'on-hold',
    client: 'Legacy Systems Ltd.',
    progress: 20,
  },
];

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectType[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const showToast = useToast();

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setModalMode('add');
    setSelectedProject(null);
    setShowModal(true);
  };

  const handleEdit = (project: ProjectType) => {
    setModalMode('edit');
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleView = (project: ProjectType) => {
    setModalMode('view');
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleSave = (project: ProjectType) => {
    if (modalMode === 'add') {
      setProjects([...projects, { ...project, id: Date.now().toString() }]);
      showToast('Project added!');
    } else if (modalMode === 'edit' && selectedProject) {
      setProjects(projects.map(p => (p.id === selectedProject.id ? { ...project, id: selectedProject.id } : p)));
      showToast('Project updated!');
    }
    setShowModal(false);
  };

  // Helper for status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'on-hold': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 shadow"
        >
          <Plus className="w-5 h-5 mr-2" /> Add Project
        </button>
      </div>
      <div className="mb-4 flex items-center">
        <Search className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      {/* Projects Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProjects.map((project, idx) => {
          const gradients = [
            'from-pink-100 via-pink-200 to-pink-300',
            'from-blue-100 via-blue-200 to-blue-300',
            'from-green-100 via-green-200 to-green-300',
            'from-red-100 via-red-200 to-red-300', // changed from yellow to light red
            'from-purple-100 via-purple-200 to-purple-300',
            'from-indigo-100 via-indigo-200 to-indigo-300',
            'from-teal-100 via-teal-200 to-teal-300',
            'from-orange-100 via-orange-200 to-orange-300',
          ];
          const gradient = gradients[idx % gradients.length];
          const statusIcons = {
            active: '🟢',
            completed: '✅',
            'on-hold': '⏸️',
            cancelled: '❌',
          };
          return (
            <div
              key={project.id}
              className={`bg-gradient-to-br ${gradient} dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl shadow-xl p-6 flex flex-col gap-4 items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in border-b-8 border-primary-200`}
            >
              <div className="flex items-center gap-2 w-full justify-between">
                <span className="text-2xl">{statusIcons[project.status]}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${getStatusBadge(project.status)}`}>{project.status}</span>
              </div>
              <div className="text-2xl font-extrabold text-primary-700 dark:text-primary-300 text-center w-full truncate">{project.title}</div>
              <div className="w-full flex items-center gap-2">
                <div className="flex-1 h-3 bg-white/40 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-3 rounded-full ${project.progress === 100 ? 'bg-green-500' : 'bg-primary-500'} transition-all duration-700 animate-pulse`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                <span className="text-xs font-bold text-primary-700 dark:text-primary-300">{project.progress}%</span>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-200 w-full text-center">{project.client}</div>
              <div className="flex gap-2 mt-2 w-full justify-center">
                <button onClick={() => handleView(project)} className="p-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition" title="View">👁️</button>
                <button onClick={() => handleEdit(project)} className="p-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition" title="Edit">✏️</button>
                <button onClick={() => handleDelete(project.id)} className="p-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition" title="Delete">🗑️</button>
              </div>
            </div>
          );
        })}
      </div>
      {filteredProjects.length === 0 && (
        <div className="text-center py-8 text-gray-400 text-xl">No projects found. <span>😢</span></div>
      )}
      {showModal && (
        <ProjectModal
          mode={modalMode}
          project={selectedProject}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

interface ProjectModalProps {
  mode: 'add' | 'edit' | 'view';
  project: ProjectType | null;
  onClose: () => void;
  onSave: (project: ProjectType) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ mode, project, onClose, onSave }) => {
  const [form, setForm] = useState<ProjectType>(
    project || { id: '', title: '', description: '', status: 'active', client: '', progress: 0 }
  );
  const isView = mode === 'view';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, progress: Number(form.progress) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl">×</button>
        <h2 className="text-2xl font-bold mb-4 text-primary-700 dark:text-primary-300">
          {mode === 'add' && 'Add Project'}
          {mode === 'edit' && 'Edit Project'}
          {mode === 'view' && 'Project Details'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              disabled={isView}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              disabled={isView}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              disabled={isView}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On-Hold</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Client</label>
            <input
              type="text"
              name="client"
              value={form.client}
              onChange={handleChange}
              disabled={isView}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Progress</label>
            <input
              type="number"
              name="progress"
              value={form.progress}
              onChange={handleChange}
              disabled={isView}
              min={0}
              max={100}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3 mt-2">
              <div
                className={`h-3 rounded-full ${form.progress === 100 ? 'bg-green-500' : 'bg-primary-500'} transition-all duration-700`}
                style={{ width: `${form.progress}%` }}
              />
            </div>
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-300">{form.progress}%</span>
          </div>
          {!isView && (
            <button type="submit" className="w-full py-2 px-4 bg-primary-600 text-white rounded hover:bg-primary-700 transition">{mode === 'add' ? 'Add Project' : 'Save Changes'}</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProjectsPage; 