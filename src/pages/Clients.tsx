import React, { useState } from 'react';
import { useToast } from '../components/Layout/Layout';
import { Plus, Edit, Trash2, Mail, Phone, Building2 } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  emoji?: string;
}

const initialClients: Client[] = [
  { id: '1', name: 'Acme Corp', email: 'contact@acme.com', company: 'Acme Corp', phone: '123-456-7890', emoji: '🏢' },
  { id: '2', name: 'Globex Inc.', email: 'info@globex.com', company: 'Globex Inc.', phone: '987-654-3210', emoji: '🌎' },
];

const emojiList = ['🏢', '🌎', '🚀', '💼', '🏦', '🏭', '🛒', '🏥', '🎨', '🧪'];

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [form, setForm] = useState<Partial<Client>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const showToast = useToast();

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!form.name) errs.name = 'Name required';
    if (!form.email) errs.email = 'Email required';
    if (!form.company) errs.company = 'Company required';
    if (!form.phone) errs.phone = 'Phone required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setClients([
        ...clients,
        { ...form, id: Date.now().toString(), emoji: form.emoji || emojiList[Math.floor(Math.random() * emojiList.length)] } as Client,
      ]);
      setForm({});
      setShowForm(false);
      setLoading(false);
      showToast('🎉 Client added!');
    }, 500);
  };

  const handleEdit = (client: Client) => {
    setEditingId(client.id);
    setForm(client);
    setShowForm(true);
    setErrors({});
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setClients(clients.map(c => c.id === editingId ? { ...c, ...form } as Client : c));
      setEditingId(null);
      setForm({});
      setShowForm(false);
      setLoading(false);
      showToast('✅ Client updated!');
    }, 500);
  };

  const handleDelete = (id: string) => {
    setLoading(true);
    setTimeout(() => {
      setClients(clients.filter(c => c.id !== id));
      setLoading(false);
      showToast('🗑️ Client deleted!');
    }, 400);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold text-primary-700 dark:text-primary-300 flex items-center gap-2">Clients <span>💼</span></h2>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setForm({}); }}
          className="flex items-center gap-2 px-5 py-2 bg-primary-600 text-white rounded-full font-bold shadow hover:bg-primary-700 transition-all text-lg animate-bounce"
        >
          <Plus className="w-6 h-6" /> Add Client <span>✨</span>
        </button>
      </div>
      {showForm && (
        <form onSubmit={editingId ? handleUpdate : handleAdd} className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 mb-8 flex flex-wrap gap-4 items-end animate-fade-in">
          <div className="flex flex-col flex-1 min-w-[120px]">
            <label className="text-xs font-bold mb-1">Emoji</label>
            <select name="emoji" value={form.emoji || ''} onChange={handleChange} className="border rounded px-3 py-2">
              <option value="">Random</option>
              {emojiList.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          <div className="flex flex-col flex-1 min-w-[120px]">
            <label className="text-xs font-bold mb-1">Name</label>
            <input name="name" value={form.name || ''} onChange={handleChange} placeholder="Name" className={`border rounded px-3 py-2 ${errors.name ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name}</span>}
          </div>
          <div className="flex flex-col flex-1 min-w-[120px]">
            <label className="text-xs font-bold mb-1">Email</label>
            <input name="email" value={form.email || ''} onChange={handleChange} placeholder="Email" className={`border rounded px-3 py-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email}</span>}
          </div>
          <div className="flex flex-col flex-1 min-w-[120px]">
            <label className="text-xs font-bold mb-1">Company</label>
            <input name="company" value={form.company || ''} onChange={handleChange} placeholder="Company" className={`border rounded px-3 py-2 ${errors.company ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.company && <span className="text-xs text-red-500 mt-1">{errors.company}</span>}
          </div>
          <div className="flex flex-col flex-1 min-w-[120px]">
            <label className="text-xs font-bold mb-1">Phone</label>
            <input name="phone" value={form.phone || ''} onChange={handleChange} placeholder="Phone" className={`border rounded px-3 py-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.phone && <span className="text-xs text-red-500 mt-1">{errors.phone}</span>}
          </div>
          <div className="flex items-end gap-2">
            <button type="submit" disabled={loading} className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition disabled:opacity-50 font-bold">
              {editingId ? 'Update' : 'Add'}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setForm({}); setErrors({}); }} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition font-bold">Cancel</button>
          </div>
        </form>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {clients.map((client, idx) => (
          <div
            key={client.id}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col items-center gap-3 hover:scale-105 hover:shadow-2xl transition-all duration-300 border-t-8"
            style={{ borderColor: idx % 2 === 0 ? '#3b82f6' : '#f59e42' }}
          >
            <div className="text-5xl animate-bounce-slow mb-2">{client.emoji || '🏢'}</div>
            <div className="text-xl font-extrabold text-primary-700 dark:text-primary-300 mb-1 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary-400" /> {client.company}
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">{client.name}</div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 mb-1">
              <Mail className="w-4 h-4" /> {client.email}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 mb-3">
              <Phone className="w-4 h-4" /> {client.phone}
            </div>
            <div className="flex gap-2 mt-auto">
              <button onClick={() => handleEdit(client)} className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition flex items-center gap-1 font-bold"><Edit className="w-4 h-4" /> Edit</button>
              <button onClick={() => handleDelete(client.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition flex items-center gap-1 font-bold"><Trash2 className="w-4 h-4" /> Delete</button>
            </div>
          </div>
        ))}
      </div>
      {loading && <div className="text-center py-4 text-primary-600 dark:text-primary-400 animate-pulse">Loading...</div>}
      {!loading && clients.length === 0 && <div className="text-center py-8 text-gray-400 text-xl">No clients found. <span>😢</span></div>}
    </div>
  );
};

export default Clients; 