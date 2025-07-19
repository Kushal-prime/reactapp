import React, { useState } from 'react';
import { Plus, Edit, Trash2, User, Shield, GraduationCap, Briefcase, Search } from 'lucide-react';

interface UserType {
  id: string;
  name: string;
  age: number;
  work: string;
  role: 'admin' | 'provider' | 'student';
  emoji?: string;
}

const pastelColors = [
  'bg-pink-100', 'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100', 'bg-indigo-100', 'bg-teal-100', 'bg-orange-100',
  'dark:bg-pink-900', 'dark:bg-blue-900', 'dark:bg-green-900', 'dark:bg-yellow-900', 'dark:bg-purple-900', 'dark:bg-indigo-900', 'dark:bg-teal-900', 'dark:bg-orange-900',
];
const emojiList = ['👩‍💻', '👨‍💻', '🧑‍🎨', '🧑‍🔬', '🧑‍🏫', '🧑‍💼', '🧑‍🎓', '🧑‍🚀', '🧑‍🔧', '🧑‍⚖️'];

const roleBadge = (role: UserType['role']) => {
  switch (role) {
    case 'admin': return { color: 'bg-red-200 text-red-700 dark:bg-red-800 dark:text-red-200', icon: <Shield className="w-4 h-4 inline-block mr-1" /> };
    case 'provider': return { color: 'bg-blue-200 text-blue-700 dark:bg-blue-800 dark:text-blue-200', icon: <Briefcase className="w-4 h-4 inline-block mr-1" /> };
    case 'student': return { color: 'bg-green-200 text-green-700 dark:bg-green-800 dark:text-green-200', icon: <GraduationCap className="w-4 h-4 inline-block mr-1" /> };
    default: return { color: 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-200', icon: <User className="w-4 h-4 inline-block mr-1" /> };
  }
};

const initialUsers: UserType[] = [
  { id: '1', name: 'John Smith', age: 32, work: 'Frontend Developer', role: 'admin', emoji: '👨‍💻' },
  { id: '2', name: 'Sarah Johnson', age: 28, work: 'UI/UX Designer', role: 'provider', emoji: '🧑‍🎨' },
  { id: '3', name: 'Mike Davis', age: 35, work: 'DevOps Engineer', role: 'provider', emoji: '🧑‍🔬' },
  { id: '4', name: 'Lisa Chen', age: 22, work: 'Student', role: 'student', emoji: '🧑‍🎓' },
  { id: '5', name: 'David Wilson', age: 24, work: 'Student', role: 'student', emoji: '🧑‍🎓' },
];

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<UserType>>({ role: 'student' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.work.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!form.name) errs.name = 'Name required';
    if (!form.age) errs.age = 'Age required';
    if (!form.work) errs.work = 'Work required';
    if (!form.role) errs.role = 'Role required';
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
    setUsers([
      ...users,
      { ...form, id: Date.now().toString(), emoji: form.emoji || emojiList[Math.floor(Math.random() * emojiList.length)] } as UserType,
    ]);
    setForm({ role: 'student' });
    setShowForm(false);
  };

  const handleEdit = (user: UserType) => {
    setEditingId(user.id);
    setForm(user);
    setShowForm(true);
    setErrors({});
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setUsers(users.map(u => u.id === editingId ? { ...u, ...form } as UserType : u));
    setEditingId(null);
    setForm({ role: 'student' });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">Users <span>🧑‍💻</span></h2>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setForm({ role: 'student' }); }}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white rounded-full font-bold shadow-lg hover:scale-110 transition-all text-lg animate-pulse"
        >
          <Plus className="w-7 h-7" /> Add User <span>🎈</span>
        </button>
      </div>
      <div className="mb-8 flex items-center">
        <Search className="w-5 h-5 text-indigo-400 mr-2" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border border-indigo-300 rounded px-3 py-2 w-64 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      {showForm && (
        <form onSubmit={editingId ? handleUpdate : handleAdd} className="bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 dark:from-pink-900 dark:via-purple-900 dark:to-indigo-900 rounded-xl shadow p-6 mb-8 flex flex-wrap gap-4 items-end animate-fade-in">
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
            <label className="text-xs font-bold mb-1">Age</label>
            <input name="age" type="number" value={form.age || ''} onChange={handleChange} placeholder="Age" className={`border rounded px-3 py-2 ${errors.age ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.age && <span className="text-xs text-red-500 mt-1">{errors.age}</span>}
          </div>
          <div className="flex flex-col flex-1 min-w-[120px]">
            <label className="text-xs font-bold mb-1">Work</label>
            <input name="work" value={form.work || ''} onChange={handleChange} placeholder="Work" className={`border rounded px-3 py-2 ${errors.work ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.work && <span className="text-xs text-red-500 mt-1">{errors.work}</span>}
          </div>
          <div className="flex flex-col flex-1 min-w-[120px]">
            <label className="text-xs font-bold mb-1">Role</label>
            <select name="role" value={form.role || 'student'} onChange={handleChange} className={`border rounded px-3 py-2 ${errors.role ? 'border-red-500' : 'border-gray-300'}`}>
              <option value="admin">Admin</option>
              <option value="provider">Provider</option>
              <option value="student">Student</option>
            </select>
            {errors.role && <span className="text-xs text-red-500 mt-1">{errors.role}</span>}
          </div>
          <div className="flex items-end gap-2">
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition font-bold">
              {editingId ? 'Update' : 'Add'}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setForm({ role: 'student' }); setErrors({}); }} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition font-bold">Cancel</button>
          </div>
        </form>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredUsers.map((user, idx) => {
          const pastel = pastelColors[idx % pastelColors.length];
          const badge = roleBadge(user.role);
          return (
            <div
              key={user.id}
              className={`rounded-3xl shadow-lg p-6 flex flex-col items-center gap-3 hover:scale-105 hover:shadow-2xl transition-all duration-300 border-4 ${pastel}`}
            >
              <div className="text-5xl mb-2 animate-pulse-slow">{user.emoji || user.name.charAt(0)}</div>
              <div className="text-lg font-extrabold text-indigo-700 dark:text-indigo-300 mb-1">{user.name}</div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 mb-1 ${badge.color}`}>{badge.icon}{user.role}</div>
              <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">{user.work}</div>
              <div className="text-xs text-gray-400 mb-3">Age: {user.age}</div>
              <div className="flex gap-2 mt-auto">
                <button onClick={() => handleEdit(user)} className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition flex items-center gap-1 font-bold"><Edit className="w-4 h-4" /> Edit</button>
                <button onClick={() => handleDelete(user.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition flex items-center gap-1 font-bold"><Trash2 className="w-4 h-4" /> Delete</button>
              </div>
            </div>
          );
        })}
      </div>
      {!users.length && <div className="text-center py-8 text-gray-400 text-xl">No users found. <span>😢</span></div>}
    </div>
  );
};

export default UsersPage; 