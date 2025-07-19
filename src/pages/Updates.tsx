import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  FileText,
  Edit,
  Trash2,
  Eye,
  Paperclip,
  UserCircle,
  PlusCircle
} from 'lucide-react';
import { Update } from '../types';
import { useToast } from '../components/Layout/Layout';

const Updates: React.FC = () => {
  const [updates, setUpdates] = useState<Update[]>([
    {
      id: '1',
      title: 'Phase 1 Development Complete',
      content: 'Successfully completed the first phase of the e-commerce platform. All core features are now functional including user authentication, product catalog, and shopping cart.',
      projectId: '1',
      author: 'John Developer',
      createdAt: '2024-01-10T14:30:00Z',
      attachments: ['phase1-report.pdf', 'screenshots.zip']
    },
    {
      id: '2',
      title: 'API Integration Progress',
      content: 'Made significant progress on third-party API integrations. Payment gateway and shipping APIs are now fully integrated and tested.',
      projectId: '1',
      author: 'Sarah Tech Lead',
      createdAt: '2024-01-08T10:15:00Z',
      attachments: ['api-docs.pdf']
    },
    {
      id: '3',
      title: 'Mobile App Beta Release',
      content: 'Beta version of the mobile app is ready for testing. Core features implemented include user registration, menu browsing, and order placement.',
      projectId: '2',
      author: 'Mike Mobile Dev',
      createdAt: '2024-01-12T16:45:00Z',
      attachments: ['beta-apk.zip', 'test-instructions.pdf']
    },
    {
      id: '4',
      title: 'Dashboard Analytics Implementation',
      content: 'Real-time analytics dashboard is now live with key metrics including user engagement, conversion rates, and performance indicators.',
      projectId: '3',
      author: 'Lisa Data Analyst',
      createdAt: '2024-01-05T11:20:00Z',
      attachments: ['analytics-report.pdf', 'dashboard-screenshots.zip']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterProject, setFilterProject] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const showToast = useToast();

  // Add modal state for new update
  const [newUpdate, setNewUpdate] = useState({
    title: '',
    content: '',
    projectId: '1', // Default to the first project
    author: '',
    attachments: [],
  });

  const handleCreateUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setUpdates([
      ...updates,
      {
        ...newUpdate,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      },
    ]);
    setShowCreateModal(false);
    setNewUpdate({ title: '', content: '', projectId: '1', author: '', attachments: [] });
    showToast('Update created!');
  };

  const projects = [
    { id: '1', name: 'E-commerce Platform Development' },
    { id: '2', name: 'Mobile App Development' },
    { id: '3', name: 'Data Analytics Dashboard' },
    { id: '4', name: 'Cloud Migration Project' }
  ];

  const filteredUpdates = updates.filter(update => {
    const matchesSearch = update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         update.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         update.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = filterProject === 'all' || update.projectId === filterProject;
    return matchesSearch && matchesProject;
  });

  const getProjectName = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown Project';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 mt-12 px-4 relative">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Project Updates</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg font-bold shadow hover:bg-primary-700 transition-colors text-lg"
        >
          <PlusCircle className="w-6 h-6 mr-2" /> New Update
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredUpdates.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
            <FileText className="w-16 h-16 text-primary-200 mb-4" />
            <span className="text-2xl font-bold">No updates yet</span>
            <span className="text-base mb-2">Keep your team in the loop with project updates.</span>
            <button onClick={() => setShowCreateModal(true)} className="mt-2 px-6 py-2 bg-primary-100 text-primary-700 rounded-lg font-semibold hover:bg-primary-200 transition">Create your first update</button>
          </div>
        ) : (
          filteredUpdates.map((update, idx) => (
            <UpdateCard key={update.id} update={update} idx={idx} getProjectName={getProjectName} />
          ))
        )}
      </div>
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative animate-fade-in">
            <button onClick={() => setShowCreateModal(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl">×</button>
            <h2 className="text-2xl font-bold mb-4 text-primary-700">Create Update</h2>
            <form onSubmit={handleCreateUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" required value={newUpdate.title} onChange={e => setNewUpdate({ ...newUpdate, title: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" required value={newUpdate.content} onChange={e => setNewUpdate({ ...newUpdate, content: e.target.value })} />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Project</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" value={newUpdate.projectId} onChange={e => setNewUpdate({ ...newUpdate, projectId: e.target.value })}>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Author</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" value={newUpdate.author} onChange={e => setNewUpdate({ ...newUpdate, author: e.target.value })} />
                </div>
              </div>
              <button type="submit" className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold mt-4">Create Update</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Animated Update Card
const UpdateCard: React.FC<{ update: Update; idx: number; getProjectName: (id: string) => string }> = ({ update, idx, getProjectName }) => {
  const [show, setShow] = useState(false);
  const [titleDisplay, setTitleDisplay] = useState('');
  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), idx * 120);
    return () => clearTimeout(timeout);
  }, [idx]);
  useEffect(() => {
    if (show && titleDisplay.length < update.title.length) {
      const timeout = setTimeout(() => {
        setTitleDisplay(update.title.slice(0, titleDisplay.length + 1));
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [show, titleDisplay, update.title]);
  return (
    <div className={`bg-gradient-to-br from-teal-50 via-white to-blue-50 dark:from-teal-900 dark:via-gray-900 dark:to-blue-900 rounded-2xl shadow-xl p-8 flex flex-col gap-3 border-l-4 border-primary-500 transition-all duration-300 ${show ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'} hover:scale-105 hover:shadow-2xl hover:shadow-primary-200 dark:hover:shadow-primary-900`} style={{ transitionDelay: `${idx * 80}ms` }}>
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xl shadow-lg animate-pop-in">
          {update.author ? update.author.charAt(0).toUpperCase() : <UserCircle className="w-8 h-8" />}
        </div>
        <div>
          <div className="font-bold text-gray-800 text-lg animate-fade-in-up">{update.author || 'Unknown'}</div>
          <div className="text-xs text-gray-500 animate-fade-in-up">{new Date(update.createdAt).toLocaleDateString()} at {new Date(update.createdAt).toLocaleTimeString()}</div>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-1 animate-pop-in">
        <FileText className="w-5 h-5 text-primary-400" />
        <span className="font-bold text-primary-700 text-xl animate-gradient-x">{titleDisplay}<span className="w-1 h-6 bg-primary-400 inline-block ml-1 align-middle animate-blink rounded" /></span>
      </div>
      <div className="text-gray-700 text-base mb-2 whitespace-pre-line animate-fade-in-up">{update.content}</div>
      <div className="flex items-center gap-3 text-sm text-gray-500 mt-2 animate-fade-in-up">
        <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full font-semibold animate-pop-in">{getProjectName(update.projectId)}</span>
        {update.attachments && update.attachments.length > 0 && (
          <span className="flex items-center gap-1 animate-fade-in-up">
            <FileText className="w-4 h-4 text-gray-400" /> {update.attachments.length} attachment{update.attachments.length > 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  );
};

export default Updates; 