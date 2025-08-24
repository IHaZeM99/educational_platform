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
        const token = localStorage.getItem('accessToken');
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
            if(localStorage.getItem('refreshToken')) {
                const refreshToken = localStorage.getItem('refreshToken');
                try {
                    const response = await api.post('/auth/refresh/', { refresh: refreshToken });
                    if (response.status === 200) {
                        localStorage.setItem('accessToken', response.data.access);
                        localStorage.setItem('refreshToken', response.data.refresh);
                        // Retry the original request
                        return api.request(error.config);
                    }
                } catch (refreshError) {
                    console.error('Refresh token failed:', refreshError);
                }
            }
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)

export default api;