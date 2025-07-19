import React, { useState, useEffect } from 'react';
import { useToast } from '../components/Layout/Layout';
import { Plus, Edit, Trash2, Mail, Phone, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useRef } from 'react';

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
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiRef = useRef<HTMLDivElement>(null);

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
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
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
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
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
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Morphing Blobs */}
      <motion.svg viewBox="0 0 600 600" className="absolute top-0 left-0 w-96 h-96 opacity-30 -z-10">
        <motion.path fill="#a78bfa"
          animate={{
            d: [
              'M421,320Q420,390,350,420Q280,450,210,420Q140,390,140,320Q140,250,210,220Q280,190,350,220Q420,250,421,320Z',
              'M400,320Q420,390,350,420Q280,450,210,420Q140,390,160,320Q180,250,250,220Q320,190,390,220Q460,250,400,320Z',
              'M421,320Q420,390,350,420Q280,450,210,420Q140,390,140,320Q140,250,210,220Q280,190,350,220Q420,250,421,320Z',
            ]
          }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        />
      </motion.svg>
      <motion.svg viewBox="0 0 600 600" className="absolute bottom-0 right-0 w-96 h-96 opacity-30 -z-10">
        <motion.path fill="#f472b6"
          animate={{
            d: [
              'M421,320Q420,390,350,420Q280,450,210,420Q140,390,140,320Q140,250,210,220Q280,190,350,220Q420,250,421,320Z',
              'M400,320Q420,390,350,420Q280,450,210,420Q140,390,160,320Q180,250,250,220Q320,190,390,220Q460,250,400,320Z',
              'M421,320Q420,390,350,420Q280,450,210,420Q140,390,140,320Q140,250,210,220Q280,190,350,220Q420,250,421,320Z',
            ]
          }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        />
      </motion.svg>
      {/* Confetti burst on add/update */}
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={300} />} 
      {/* Animated Section Header & Divider */}
      <motion.h2 initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 text-center animate-gradient-x">Clients <span>💼</span></motion.h2>
      <motion.svg viewBox="0 0 1440 80" className="w-full h-8 mb-8">
        <motion.path fill="#a78bfa" fillOpacity=".2"
          animate={{
            d: [
              'M0,40L80,50C160,60,320,80,480,70C640,60,800,40,960,33C1120,27,1280,25,1360,24L1440,24L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z',
              'M0,60L80,40C160,20,320,0,480,20C640,40,800,60,960,50C1120,40,1280,60,1360,70L1440,60L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z',
              'M0,40L80,50C160,60,320,80,480,70C640,60,800,40,960,33C1120,27,1280,25,1360,24L1440,24L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z',
            ]
          }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        />
      </motion.svg>
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
          <motion.div
            key={client.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-6 flex flex-col items-center gap-3 border-t-8 transition-all duration-300 backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 border-white/40 dark:border-gray-800/40 hover:scale-110 hover:shadow-2xl hover:shadow-blue-200 dark:hover:shadow-blue-900 animate-pop-in`}
            style={{ borderColor: idx % 2 === 0 ? '#3b82f6' : '#f59e42', transitionDelay: `${idx * 80}ms` }}
          >
            <div className="text-5xl animate-bounce mb-2">{client.emoji || '🏢'}</div>
            <div className="text-xl font-extrabold text-primary-700 dark:text-primary-300 mb-1 flex items-center gap-2 animate-fade-in-up">
              <span className="w-5 h-5 text-primary-400">🏢</span> {client.company}
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-white mb-1 animate-fade-in-up">
              {client.name}<span className="w-1 h-6 bg-blue-400 inline-block ml-1 align-middle animate-blink rounded" />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 mb-1 animate-fade-in-up">
              <span className="w-4 h-4">✉️</span> {client.email}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 mb-3 animate-fade-in-up">
              <span className="w-4 h-4">📞</span> {client.phone}
            </div>
            <div className="flex gap-2 mt-auto">
              <button onClick={() => handleEdit(client)} className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition flex items-center gap-1 font-bold animate-pop-in"><Edit className="w-4 h-4" /> Edit</button>
              <button onClick={() => handleDelete(client.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition flex items-center gap-1 font-bold animate-pop-in"><Trash2 className="w-4 h-4" /> Delete</button>
            </div>
          </motion.div>
        ))}
      </div>
      {loading && <div className="text-center py-4 text-primary-600 dark:text-primary-400 animate-pulse">Loading...</div>}
      {!loading && clients.length === 0 && <div className="text-center py-8 text-gray-400 text-xl">No clients found. <span>😢</span></div>}
    </div>
  );
};

// Animated Client Card
const ClientCard: React.FC<{ client: Client; idx: number; handleEdit: (c: Client) => void; handleDelete: (id: string) => void }> = ({ client, idx, handleEdit, handleDelete }) => {
  const [show, setShow] = useState(false);
  const [nameDisplay, setNameDisplay] = useState('');
  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), idx * 120);
    return () => clearTimeout(timeout);
  }, [idx]);
  useEffect(() => {
    if (show && nameDisplay.length < client.name.length) {
      const timeout = setTimeout(() => {
        setNameDisplay(client.name.slice(0, nameDisplay.length + 1));
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [show, nameDisplay, client.name]);
  const gradients = [
    'from-blue-100 via-blue-200 to-blue-300',
    'from-pink-100 via-pink-200 to-pink-300',
    'from-green-100 via-green-200 to-green-300',
    'from-purple-100 via-purple-200 to-purple-300',
    'from-indigo-100 via-indigo-200 to-indigo-300',
    'from-teal-100 via-teal-200 to-teal-300',
    'from-orange-100 via-orange-200 to-orange-300',
    'from-violet-100 via-violet-200 to-violet-300',
  ];
  const gradient = gradients[idx % gradients.length];
  return (
    <div
      className={`bg-gradient-to-br ${gradient} dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-6 flex flex-col items-center gap-3 border-t-8 transition-all duration-300 ${show ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'} hover:scale-110 hover:shadow-2xl hover:shadow-blue-200 dark:hover:shadow-blue-900 animate-pop-in`}
      style={{ borderColor: idx % 2 === 0 ? '#3b82f6' : '#f59e42', transitionDelay: `${idx * 80}ms` }}
    >
      <div className="text-5xl animate-bounce mb-2">{client.emoji || '🏢'}</div>
      <div className="text-xl font-extrabold text-primary-700 dark:text-primary-300 mb-1 flex items-center gap-2 animate-fade-in-up">
        <Building2 className="w-5 h-5 text-primary-400" /> {client.company}
      </div>
      <div className="text-lg font-bold text-gray-900 dark:text-white mb-1 animate-fade-in-up">
        {nameDisplay}<span className="w-1 h-6 bg-blue-400 inline-block ml-1 align-middle animate-blink rounded" />
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 mb-1 animate-fade-in-up">
        <Mail className="w-4 h-4" /> {client.email}
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 mb-3 animate-fade-in-up">
        <Phone className="w-4 h-4" /> {client.phone}
      </div>
      <div className="flex gap-2 mt-auto">
        <button onClick={() => handleEdit(client)} className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition flex items-center gap-1 font-bold animate-pop-in"><Edit className="w-4 h-4" /> Edit</button>
        <button onClick={() => handleDelete(client.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition flex items-center gap-1 font-bold animate-pop-in"><Trash2 className="w-4 h-4" /> Delete</button>
      </div>
    </div>
  );
};

export default Clients; 