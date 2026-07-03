// src/utils/api.js
// Utility functions for API calls

// API Configuration - supports both local dev and deployed backend
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const jobsAPI = {
  // Get all jobs
  getAllJobs: async () => {
    const response = await fetch(`${API_BASE}/api/jobs`);
    if (!response.ok) throw new Error('Failed to fetch jobs');
    return response.json();
  },

  // Get job by ID
  getJobById: async (id) => {
    const response = await fetch(`${API_BASE}/api/jobs/${id}`);
    if (!response.ok) throw new Error('Failed to fetch job');
    return response.json();
  },

  // Search jobs
  searchJobs: async (query) => {
    const response = await fetch(`${API_BASE}/api/search?q=${query}`);
    if (!response.ok) throw new Error('Failed to search jobs');
    return response.json();
  },

  // Get jobs by location
  getJobsByLocation: async (location) => {
    const response = await fetch(`${API_BASE}/api/location/${location}`);
    if (!response.ok) throw new Error('Failed to fetch jobs by location');
    return response.json();
  },

  // Get jobs by type
  getJobsByType: async (type) => {
    const response = await fetch(`${API_BASE}/api/type/${type}`);
    if (!response.ok) throw new Error('Failed to fetch jobs by type');
    return response.json();
  },

  // Get all locations
  getLocations: async () => {
    const response = await fetch(`${API_BASE}/api/locations`);
    if (!response.ok) throw new Error('Failed to fetch locations');
    return response.json();
  },

  // Get all job types
  getTypes: async () => {
    const response = await fetch(`${API_BASE}/api/types`);
    if (!response.ok) throw new Error('Failed to fetch types');
    return response.json();
  },

  // Filter jobs
  filterJobs: async (filters) => {
    const response = await fetch(`${API_BASE}/api/filter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters),
    });
    if (!response.ok) throw new Error('Failed to filter jobs');
    return response.json();
  },
};
