import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Search, MessageSquare, CheckCircle, AlertTriangle, XCircle, Info, PlusCircle } from 'lucide-react';

interface TicketType {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  assignedTo: string;
}

const initialTickets: TicketType[] = [
  {
    id: '1',
    title: 'Login Issue on Mobile App',
    description: 'Users are unable to log in through the mobile application. The app crashes when entering credentials.',
    priority: 'high',
    status: 'open',
    assignedTo: 'John Developer',
  },
  {
    id: '2',
    title: 'Feature Request: Dark Mode',
    description: 'Users have requested a dark mode option for better user experience during night usage.',
    priority: 'medium',
    status: 'in-progress',
    assignedTo: 'Sarah UI/UX',
  },
  {
    id: '3',
    title: 'Database Connection Timeout',
    description: 'Database connections are timing out during peak hours, causing service interruptions.',
    priority: 'urgent',
    status: 'resolved',
    assignedTo: 'Mike DevOps',
  },
  {
    id: '4',
    title: 'Payment Gateway Integration',
    description: 'Need assistance with integrating a new payment gateway for the e-commerce platform.',
    priority: 'high',
    status: 'open',
    assignedTo: '',
  },
];

const TicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<TicketType[]>(initialTickets);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);

  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setModalMode('add');
    setSelectedTicket(null);
    setShowModal(true);
  };

  const handleEdit = (ticket: TicketType) => {
    setModalMode('edit');
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  const handleView = (ticket: TicketType) => {
    setModalMode('view');
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      setTickets(tickets.filter(t => t.id !== id));
    }
  };

  const handleSave = (ticket: TicketType) => {
    if (modalMode === 'add') {
      setTickets([...tickets, { ...ticket, id: Date.now().toString() }]);
    } else if (modalMode === 'edit' && selectedTicket) {
      setTickets(tickets.map(t => (t.id === selectedTicket.id ? { ...ticket, id: selectedTicket.id } : t)));
    }
    setShowModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 mt-12 px-4">
      <div className="flex items-center justify-between mb-6 sticky top-0 z-10 bg-white/80 py-4 rounded-t-2xl shadow">
        <h1 className="text-3xl font-extrabold text-gray-900">Tickets</h1>
        <button
          onClick={handleAdd}
          className="flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg font-bold shadow hover:bg-primary-700 transition-colors text-lg sticky top-4"
        >
          <PlusCircle className="w-6 h-6 mr-2" /> Add Ticket
        </button>
      </div>
      <div className="mb-8 flex items-center">
        <Search className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search tickets..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Assigned To</th>
              <th className="px-8 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTickets.map(ticket => (
              <tr key={ticket.id} className="group hover:bg-primary-50 transition border-l-4" style={{ borderColor: ticket.status === 'resolved' ? '#22c55e' : ticket.status === 'in-progress' ? '#eab308' : ticket.status === 'open' ? '#3b82f6' : '#a1a1aa' }}>
                <td className="px-8 py-5 whitespace-nowrap font-medium text-base">{ticket.title}</td>
                <td className="px-8 py-5 whitespace-normal break-words max-w-lg text-base">{ticket.description}</td>
                <td className="px-8 py-5 whitespace-nowrap capitalize flex items-center gap-2">
                  {ticket.status === 'resolved' && <CheckCircle className="w-4 h-4 text-green-500" />}
                  {ticket.status === 'in-progress' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                  {ticket.status === 'open' && <Info className="w-4 h-4 text-blue-500" />}
                  {ticket.status === 'closed' && <XCircle className="w-4 h-4 text-gray-400" />}
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    ticket.status === 'open' ? 'bg-blue-100 text-blue-700' :
                    ticket.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                    ticket.status === 'resolved' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-8 py-5 whitespace-nowrap capitalize flex items-center gap-2">
                  {ticket.priority === 'urgent' && <XCircle className="w-4 h-4 text-red-500" />}
                  {ticket.priority === 'high' && <AlertTriangle className="w-4 h-4 text-orange-500" />}
                  {ticket.priority === 'medium' && <Info className="w-4 h-4 text-yellow-500" />}
                  {ticket.priority === 'low' && <CheckCircle className="w-4 h-4 text-green-500" />}
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    ticket.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                    ticket.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                    ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-8 py-5 whitespace-nowrap text-base">{ticket.assignedTo || 'Unassigned'}</td>
                <td className="px-8 py-5 whitespace-nowrap text-right space-x-2">
                  <button onClick={() => handleView(ticket)} className="text-blue-500 hover:text-blue-700"><Eye className="inline w-5 h-5" /></button>
                  <button onClick={() => handleEdit(ticket)} className="text-green-500 hover:text-green-700"><Edit className="inline w-5 h-5" /></button>
                  <button onClick={() => handleDelete(ticket.id)} className="text-red-500 hover:text-red-700"><Trash2 className="inline w-5 h-5" /></button>
                  <button className="ml-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition">View Details</button>
                </td>
              </tr>
            ))}
            {filteredTickets.length === 0 && (
              <tr>
                <td colSpan={6} className="px-8 py-20 text-center text-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <MessageSquare className="w-10 h-10 text-primary-300 mb-2" />
                    <span className="text-lg font-semibold">No tickets found</span>
                    <span className="text-sm">No tickets? <button onClick={handleAdd} className="text-primary-600 underline font-semibold">Create your first one!</button></span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
        <TicketModal
          mode={modalMode}
          ticket={selectedTicket}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

interface TicketModalProps {
  mode: 'add' | 'edit' | 'view';
  ticket: TicketType | null;
  onClose: () => void;
  onSave: (ticket: TicketType) => void;
}

const TicketModal: React.FC<TicketModalProps> = ({ mode, ticket, onClose, onSave }) => {
  const [form, setForm] = useState<TicketType>(
    ticket || { id: '', title: '', description: '', status: 'open', priority: 'medium', assignedTo: '' }
  );
  const isView = mode === 'view';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">×</button>
        <h2 className="text-xl font-bold mb-4">
          {mode === 'add' && 'Add Ticket'}
          {mode === 'edit' && 'Edit Ticket'}
          {mode === 'view' && 'Ticket Details'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              disabled={isView}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              disabled={isView}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              disabled={isView}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              required
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              disabled={isView}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              required
            >
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Assigned To</label>
            <input
              type="text"
              name="assignedTo"
              value={form.assignedTo}
              onChange={handleChange}
              disabled={isView}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          {!isView && (
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary-600 text-white rounded hover:bg-primary-700"
            >
              {mode === 'add' ? 'Add Ticket' : 'Save Changes'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default TicketsPage; 