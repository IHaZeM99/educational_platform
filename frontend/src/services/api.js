import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem('accessToken'));
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if ( error.response?.status === 401) {
            // Handle token expiration or unauthorized access
            localStorage.removeItem('authTokens');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)

export default api;