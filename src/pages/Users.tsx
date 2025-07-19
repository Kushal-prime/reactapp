import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';

interface UserType {
  id: string;
  name: string;
  age: number;
  work: string;
  role: string;
}

const initialUsers: UserType[] = [
  { id: '1', name: 'John Smith', age: 32, work: 'Frontend Developer', role: 'admin' },
  { id: '2', name: 'Sarah Johnson', age: 28, work: 'UI/UX Designer', role: 'provider' },
  { id: '3', name: 'Mike Davis', age: 35, work: 'DevOps Engineer', role: 'provider' },
  { id: '4', name: 'Lisa Chen', age: 22, work: 'Student', role: 'student' },
  { id: '5', name: 'David Wilson', age: 24, work: 'Student', role: 'student' },
];

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.work.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setModalMode('add');
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleEdit = (user: UserType) => {
    setModalMode('edit');
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleView = (user: UserType) => {
    setModalMode('view');
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleSave = (user: UserType) => {
    if (modalMode === 'add') {
      setUsers([...users, { ...user, id: Date.now().toString() }]);
    } else if (modalMode === 'edit' && selectedUser) {
      setUsers(users.map(u => (u.id === selectedUser.id ? { ...user, id: selectedUser.id } : u)));
    }
    setShowModal(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <button
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 shadow"
        >
          <Plus className="w-5 h-5 mr-2" /> Add User
        </button>
      </div>
      <div className="mb-4 flex items-center">
        <Search className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.age}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.work}</td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                  <button onClick={() => handleView(user)} className="text-blue-500 hover:text-blue-700"><Eye className="inline w-5 h-5" /></button>
                  <button onClick={() => handleEdit(user)} className="text-green-500 hover:text-green-700"><Edit className="inline w-5 h-5" /></button>
                  <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700"><Trash2 className="inline w-5 h-5" /></button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-400">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
        <UserModal
          mode={modalMode}
          user={selectedUser}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

interface UserModalProps {
  mode: 'add' | 'edit' | 'view';
  user: UserType | null;
  onClose: () => void;
  onSave: (user: UserType) => void;
}

const UserModal: React.FC<UserModalProps> = ({ mode, user, onClose, onSave }) => {
  const [form, setForm] = useState<UserType>(
    user || { id: '', name: '', age: 18, work: '', role: 'student' }
  );
  const isView = mode === 'view';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          {mode === 'add' && 'Add User'}
          {mode === 'edit' && 'Edit User'}
          {mode === 'view' && 'User Details'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={isView}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              disabled={isView}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              min={1}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Work</label>
            <input
              type="text"
              name="work"
              value={form.work}
              onChange={handleChange}
              disabled={isView}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              disabled={isView}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              required
            >
              <option value="admin">Admin</option>
              <option value="provider">Provider</option>
              <option value="student">Student</option>
            </select>
          </div>
          {!isView && (
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary-600 text-white rounded hover:bg-primary-700"
            >
              {mode === 'add' ? 'Add User' : 'Save Changes'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default UsersPage; 