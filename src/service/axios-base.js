import axios from 'axios';
import { URL } from '../lib/config';

// Variables to manage the refresh state
let isRefreshing = false;
let failedQueue = [];
let hasWarnedCustomHeader = false;
const axiosInstance = axios.create({
  baseURL: URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true // Ensures cookies are sent with every request
});


// Helper to process the waiting requests
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 1. Request Interceptor: Attach Access Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const headerNames = Object.keys(config.headers || {});
    const customHeader = headerNames.find((name) => /^x-/i.test(name));
    if (customHeader && !hasWarnedCustomHeader) {
      hasWarnedCustomHeader = true;
      console.warn(
        `[axios-base] Custom header "${customHeader}" detected. Make sure backend CORS allowedHeaders includes this X-* header.`
      );
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



// 2. Response Interceptor: Mutex Refresh Logic
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 error and we haven't tried to retry this request yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      if (isRefreshing) {
        // Queue this request while we wait for the new token
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to get a new access token using the refresh cookie
        const response = await axios.post(`${axiosInstance.defaults.baseURL}/auth/refresh`, {}, {
          withCredentials: true 
        });

        const { accessToken } = response.data;
        
        localStorage.setItem('token', accessToken);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        
        processQueue(null, accessToken);
        return axiosInstance(originalRequest);

      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('token');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;