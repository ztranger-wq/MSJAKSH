import axios from 'axios';

const api = axios.create({
  // This will be replaced with the actual API Gateway URL after deployment
  baseURL: 'https://<YOUR_API_GATEWAY_ID>.execute-api.us-east-1.amazonaws.com/dev',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepts every request to inject the auth token if it exists.
api.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  if (user) {
    const { token } = JSON.parse(user);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
