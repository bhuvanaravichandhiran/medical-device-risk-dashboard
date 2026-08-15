import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Dashboard Service
export const dashboardService = {
  // Get dashboard overview stats
  getStats: async () => {
    try {
      const response = await apiClient.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  },

  // Get severity distribution data
  getSeverityDistribution: async () => {
    try {
      const response = await apiClient.get('/dashboard/severity-distribution');
      return response.data;
    } catch (error) {
      console.error('Error fetching severity distribution:', error);
      throw error;
    }
  },

  // Get risk trends over time
  getRiskTrends: async (timeRange = '30days') => {
    try {
      const response = await apiClient.get('/dashboard/risk-trends', {
        params: { time_range: timeRange },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching risk trends:', error);
      throw error;
    }
  },

  // Get recent events/assessments
  getRecentEvents: async (limit = 10) => {
    try {
      const response = await apiClient.get('/dashboard/recent-events', {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching recent events:', error);
      throw error;
    }
  },
};

export default dashboardService;
