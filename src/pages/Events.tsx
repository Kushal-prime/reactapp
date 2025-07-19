import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Globe,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { Event } from '../types';
import { useToast } from '../components/Layout/Layout';
import { useEffect } from 'react';

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'React Advanced Workshop',
      description: 'Learn advanced React patterns and best practices for building scalable applications.',
      type: 'webinar',
      date: '2024-01-15',
      time: '14:00',
      duration: '2 hours',
      provider: {
        id: '1',
        name: 'Tech Academy',
        email: 'contact@techacademy.com',
        phone: '+1-555-0123'
      },
      location: 'Online',
      online: true,
      maxParticipants: 50,
      currentParticipants: 45,
      price: 99,
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
      tags: ['React', 'JavaScript', 'Frontend'],
      createdAt: '2024-01-01T10:00:00Z',
      expiresAt: '2024-01-15T16:00:00Z'
    },
    {
      id: '2',
      title: 'Data Science Fundamentals',
      description: 'Introduction to data science concepts, tools, and methodologies.',
      type: 'course',
      date: '2024-01-18',
      time: '10:00',
      duration: '6 weeks',
      provider: {
        id: '2',
        name: 'Data Institute',
        email: 'info@datainstitute.com',
        phone: '+1-555-0456'
      },
      location: '123 Main St, Tech City',
      online: false,
      maxParticipants: 30,
      currentParticipants: 28,
      price: 299,
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      tags: ['Data Science', 'Python', 'Machine Learning'],
      createdAt: '2024-01-02T10:00:00Z',
      expiresAt: '2024-02-29T10:00:00Z'
    },
    {
      id: '3',
      title: 'Cloud Architecture Seminar',
      description: 'Understanding cloud architecture patterns and best practices.',
      type: 'seminar',
      date: '2024-01-20',
      time: '16:00',
      duration: '3 hours',
      provider: {
        id: '3',
        name: 'Cloud Solutions',
        email: 'hello@cloudsolutions.com',
        phone: '+1-555-0789'
      },
      location: 'Online',
      online: true,
      maxParticipants: 25,
      currentParticipants: 15,
      price: 0,
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
      tags: ['Cloud', 'AWS', 'Architecture'],
      createdAt: '2024-01-03T10:00:00Z',
      expiresAt: '2024-01-20T19:00:00Z'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const showToast = useToast();

  // Add modal state for new event
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    type: 'webinar',
    date: '',
    time: '',
    duration: '',
    provider: { id: '', name: '', email: '' },
    location: '',
    online: true,
    maxParticipants: 0,
    currentParticipants: 0,
    price: 0,
    status: 'upcoming',
    image: '',
    tags: [],
    createdAt: '',
    expiresAt: '',
  });

  // Add modal state for event details
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Helper: get all images for an event (simulate multiple images)
  const getEventImages = (event: Event) => {
    if (Array.isArray(event.image)) return event.image;
    // Simulate multiple images if only one is provided
    return [event.image, event.image + '&2', event.image + '&3'];
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    setEvents([
      ...events,
      {
        ...newEvent,
        type: newEvent.type as 'webinar' | 'seminar' | 'course',
        status: newEvent.status as 'upcoming' | 'ongoing' | 'completed' | 'cancelled',
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        expiresAt: newEvent.date || '',
        provider: { ...newEvent.provider, id: Date.now().toString() },
      },
    ]);
    setShowCreateModal(false);
    setNewEvent({
      title: '', description: '', type: 'webinar', date: '', time: '', duration: '', provider: { id: '', name: '', email: '' }, location: '', online: true, maxParticipants: 0, currentParticipants: 0, price: 0, status: 'upcoming', image: '', tags: [], createdAt: '', expiresAt: '',
    });
    showToast('Event created!');
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || event.type === filterType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'webinar':
        return 'bg-purple-100 text-purple-800';
      case 'seminar':
        return 'bg-orange-100 text-orange-800';
      case 'course':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600 mt-1">Manage webinars, seminars, and courses</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Event
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Types</option>
              <option value="webinar">Webinars</option>
              <option value="seminar">Seminars</option>
              <option value="course">Courses</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow group overflow-hidden flex flex-col">
            <div className="relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-44 object-cover group-hover:brightness-90 transition"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(event.type)}`}>{event.type}</span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}>{event.status}</span>
              </div>
              <div className="absolute bottom-3 left-3 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                {event.date}
              </div>
            </div>
            <div className="flex-1 flex flex-col p-5">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate">{event.title}</h3>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-300 mb-2 gap-2">
                <span>{event.location}</span>
                <span>•</span>
                <span>{event.time}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{event.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {event.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-200 rounded-full text-xs font-medium">{tag}</span>
                ))}
              </div>
              <div className="mt-auto flex gap-2">
                <button className="flex-1 px-3 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition">View</button>
                <button className="flex-1 px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition">Join</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative animate-fade-in">
            <button onClick={() => setShowCreateModal(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl">×</button>
            <h2 className="text-2xl font-bold mb-4 text-primary-700">Create Event</h2>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" required value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" required value={newEvent.description} onChange={e => setNewEvent({ ...newEvent, description: e.target.value })} />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" value={newEvent.type} onChange={e => setNewEvent({ ...newEvent, type: e.target.value })}>
                    <option value="webinar">Webinar</option>
                    <option value="seminar">Seminar</option>
                    <option value="course">Course</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input type="date" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" required value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <input type="time" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" required value={newEvent.time} onChange={e => setNewEvent({ ...newEvent, time: e.target.value })} />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Provider Name</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" value={newEvent.provider.name} onChange={e => setNewEvent({ ...newEvent, provider: { ...newEvent.provider, name: e.target.value } })} />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" value={newEvent.location} onChange={e => setNewEvent({ ...newEvent, location: e.target.value })} />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Max Participants</label>
                  <input type="number" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" value={newEvent.maxParticipants} onChange={e => setNewEvent({ ...newEvent, maxParticipants: Number(e.target.value) })} />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input type="number" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2" value={newEvent.price} onChange={e => setNewEvent({ ...newEvent, price: Number(e.target.value) })} />
                </div>
              </div>
              <button type="submit" className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold mt-4">Create Event</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events; 