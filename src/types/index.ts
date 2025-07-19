export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'provider' | 'student';
  avatar?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'webinar' | 'seminar' | 'course';
  date: string;
  time: string;
  duration: string;
  provider: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  location?: string;
  online?: boolean;
  maxParticipants?: number;
  currentParticipants: number;
  price?: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  image?: string;
  tags: string[];
  createdAt: string;
  expiresAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold' | 'cancelled';
  client: string;
  startDate: string;
  endDate?: string;
  progress: number;
  deliverables: Deliverable[];
}

export interface Deliverable {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  dueDate: string;
  projectId: string;
  fileUrl?: string;
  uploadedAt?: string;
}

export interface Update {
  id: string;
  title: string;
  content: string;
  projectId: string;
  author: string;
  createdAt: string;
  attachments?: string[];
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  category: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  attachments?: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
  link?: string;
} 