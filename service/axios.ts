import axios from 'axios';
import { handleAxiosError } from './error';

// Axios instance
const API = axios.create({
  baseURL: '', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Store tokens securely (use cookies in production for added security)
let accessToken = '';
let refreshToken = '';

// Function to set tokens
export const setTokens = (access: string, refresh: string) => {
  accessToken = access;
  refreshToken = refresh;
};

// Request interceptor to attach the access token
API.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
// API.interceptors.response.use(
//   (response) => response, // Pass through valid responses
//   async (error) => {
//     const originalRequest = error.config;

//     // Check if the error is due to an expired token

//     try {
//       const { data } = await axios.post('auth/refresh-token', {
//         refreshToken, // Include the refresh token in the payload
//       });
//       // Request a new access token using the refresh token
//       accessToken = data.body.accessToken;

//       // Update tokens
//       setTokens(accessToken, refreshToken);

//       // Retry the original request with the new access token
//       originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//       return API(originalRequest);
//     } catch (refreshError) {
//       // Handle failed refresh (e.g., redirect to login)
//       handleAxiosError(refreshError as import('axios').AxiosError);
//     }
//   }
// );

export default API;
