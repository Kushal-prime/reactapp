import React, { useState } from 'react';
import { useToast } from '../components/Layout/Layout';
import { Plus, Edit, Trash2, User, CheckCircle, Clock, Hourglass } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  assignee: string;
  status: 'Pending' | 'In-Progress' | 'Completed';
  emoji?: string;
}

const statusEmoji: Record<Task['status'], string> = {
  'Pending': '🕒',
  'In-Progress': '⏳',
  'Completed': '✅',
};

const initialTasks: Task[] = [
  { id: '1', title: 'Design UI mockups', assignee: 'Sarah Johnson', status: 'Completed', emoji: '🎨' },
  { id: '2', title: 'API integration', assignee: 'Mike Chen', status: 'In-Progress', emoji: '🔌' },
];

const emojiList = ['🎨', '🔌', '📝', '🚀', '🛠️', '📦', '🧪', '📊', '🗂️', '💡'];

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [form, setForm] = useState<Partial<Task>>({ status: 'Pending' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const showToast = useToast();

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!form.title) errs.title = 'Title required';
    if (!form.assignee) errs.assignee = 'Assignee required';
    if (!form.status) errs.status = 'Status required';
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
      setTasks([
        ...tasks,
        { ...form, id: Date.now().toString(), emoji: form.emoji || emojiList[Math.floor(Math.random() * emojiList.length)] } as Task,
      ]);
      setForm({ status: 'Pending' });
      setShowForm(false);
      setLoading(false);
      showToast('🎉 Task added!');
    }, 500);
  };

  const handleEdit = (task: Task) => {
    setEditingId(task.id);
    setForm(task);
    setShowForm(true);
    setErrors({});
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setTasks(tasks.map(t => t.id === editingId ? { ...t, ...form } as Task : t));
      setEditingId(null);
      setForm({ status: 'Pending' });
      setShowForm(false);
      setLoading(false);
      showToast('✅ Task updated!');
    }, 500);
  };

  const handleDelete = (id: string) => {
    setLoading(true);
    setTimeout(() => {
      setTasks(tasks.filter(t => t.id !== id));
      setLoading(false);
      showToast('🗑️ Task deleted!');
    }, 400);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold text-primary-700 dark:text-primary-300 flex items-center gap-2">Tasks <span>🗂️</span></h2>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setForm({ status: 'Pending' }); }}
          className="flex items-center gap-2 px-5 py-2 bg-primary-600 text-white rounded-full font-bold shadow hover:bg-primary-700 transition-all text-lg animate-bounce"
        >
          <Plus className="w-6 h-6" /> Add Task <span>✨</span>
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
            <label className="text-xs font-bold mb-1">Title</label>
            <input name="title" value={form.title || ''} onChange={handleChange} placeholder="Title" className={`border rounded px-3 py-2 ${errors.title ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.title && <span className="text-xs text-red-500 mt-1">{errors.title}</span>}
          </div>
          <div className="flex flex-col flex-1 min-w-[120px]">
            <label className="text-xs font-bold mb-1">Assignee</label>
            <input name="assignee" value={form.assignee || ''} onChange={handleChange} placeholder="Assignee" className={`border rounded px-3 py-2 ${errors.assignee ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.assignee && <span className="text-xs text-red-500 mt-1">{errors.assignee}</span>}
          </div>
          <div className="flex flex-col flex-1 min-w-[120px]">
            <label className="text-xs font-bold mb-1">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className={`border rounded px-3 py-2 ${errors.status ? 'border-red-500' : 'border-gray-300'}`}>
              <option value="Pending">Pending</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Completed">Completed</option>
            </select>
            {errors.status && <span className="text-xs text-red-500 mt-1">{errors.status}</span>}
          </div>
          <div className="flex items-end gap-2">
            <button type="submit" disabled={loading} className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition disabled:opacity-50 font-bold">
              {editingId ? 'Update' : 'Add'}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setForm({ status: 'Pending' }); setErrors({}); }} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition font-bold">Cancel</button>
          </div>
        </form>
      )}
      {/* Task Cards in a vertical list */}
      <div className="flex flex-col gap-6">
        {tasks.map((task, idx) => (
          <div
            key={task.id}
            className="bg-gradient-to-r from-cyan-50 via-blue-50 to-teal-50 dark:from-cyan-900 dark:via-blue-900 dark:to-teal-900 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row items-center gap-4 hover:scale-[1.02] hover:shadow-cyan-400/40 transition-all duration-300 border-l-8"
            style={{ borderColor: task.status === 'Completed' ? '#22d3ee' : task.status === 'In-Progress' ? '#38bdf8' : '#818cf8' }}
          >
            <div className="flex flex-col items-center sm:items-start flex-shrink-0 w-20">
              <div className="text-4xl animate-bounce-slow mb-2 drop-shadow-glow-cyan">{task.emoji || statusEmoji[task.status]}</div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm mt-1 ${
                task.status === 'Completed'
                  ? 'bg-cyan-200 text-cyan-800 dark:bg-cyan-700 dark:text-cyan-100'
                  : task.status === 'In-Progress'
                  ? 'bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-100'
                  : 'bg-indigo-200 text-indigo-800 dark:bg-indigo-700 dark:text-indigo-100'
              }`}>{task.status}</span>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <div className="text-xl font-black font-mono text-cyan-700 dark:text-cyan-300 flex items-center gap-2 tracking-wide">
                {statusEmoji[task.status]} {task.title}
              </div>
              <div className="flex items-center gap-2 text-sm text-cyan-700 dark:text-cyan-200">
                <User className="w-4 h-4" /> {task.assignee}
              </div>
              <div className="flex items-center gap-2 text-sm text-cyan-700 dark:text-cyan-200">
                {task.status === 'Completed' && <CheckCircle className="w-4 h-4 text-cyan-400" />}
                {task.status === 'In-Progress' && <Hourglass className="w-4 h-4 text-cyan-500" />}
                {task.status === 'Pending' && <Clock className="w-4 h-4 text-cyan-600" />}
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4 sm:mt-0 sm:ml-4">
              <button onClick={() => handleEdit(task)} className="px-3 py-1 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition flex items-center gap-1 font-bold"><Edit className="w-4 h-4" /> Edit</button>
              <button onClick={() => handleDelete(task.id)} className="px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600 transition flex items-center gap-1 font-bold"><Trash2 className="w-4 h-4" /> Delete</button>
            </div>
          </div>
        ))}
      </div>
      {loading && <div className="text-center py-4 text-primary-600 dark:text-primary-400 animate-pulse">Loading...</div>}
      {!loading && tasks.length === 0 && <div className="text-center py-8 text-gray-400 text-xl">No tasks found. <span>😢</span></div>}
    </div>
  );
};

export default Tasks; 