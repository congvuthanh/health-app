import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

// Utility type to extract the 'data' property from API response types
type UnwrapApiResponse<T> = T extends { data: infer D } ? D : T;

// Create axios instance with base configuration
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authentication token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    // Extract data from the API response wrapper
    // API returns { status, code, message, data }
    // We want to return just the data part for easier consumption
    if (response.data && response.data.status === 'ok') {
      return { ...response, data: response.data.data };
    }
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors - redirect to auth error page
    // BUT skip this for /signUp endpoint (login page)
    const isLoginEndpoint = error.config?.url?.includes('/signUp');

    if (error.response?.status === 401 && !isLoginEndpoint) {
      // Clear token on auth failure
      localStorage.removeItem('accessToken');

      // Redirect to auth error page if not already there
      if (window.location.pathname !== '/authenticationError') {
        window.location.href = '/authenticationError';
      }
    }
    return Promise.reject(error);
  }
);

// Custom mutator for Orval
// The response interceptor unwraps the data, so we need to reflect that in the type
export const apiClient = <T>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<UnwrapApiResponse<T>>> => {
  return axiosInstance(config) as Promise<AxiosResponse<UnwrapApiResponse<T>>>;
};

export default apiClient;
