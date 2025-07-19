import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tickets from './pages/Tickets';
import UsersPage from './pages/Users';
import Events from './pages/Events';
import Updates from './pages/Updates';
import Deliverables from './pages/Deliverables';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Clients from './pages/Clients';
import Tasks from './pages/Tasks';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Layout />}> {/* Dashboard layout wrapper */}
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="events" element={<Events />} />
          <Route path="updates" element={<Updates />} />
          <Route path="deliverables" element={<Deliverables />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="clients" element={<Clients />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App; 