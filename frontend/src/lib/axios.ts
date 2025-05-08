import axios from 'axios';

// Create a custom axios instance with default config
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('auth_token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error status codes
    if (error.response) {
      const { status } = error.response;
      
      // Handle 401 Unauthorized
      if (status === 401) {
        // Clear auth data and redirect to login
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
      
      // Handle 403 Forbidden
      if (status === 403) {
        console.error('Permission denied');
      }
      
      // Handle 404 Not Found
      if (status === 404) {
        console.error('Resource not found');
      }
      
      // Handle 500 Internal Server Error
      if (status >= 500) {
        console.error('Server error occurred');
      }
    } else if (error.request) {
      // Request was made but no response was received
      console.error('Network error - no response received');
    } else {
      // Error in setting up the request
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;