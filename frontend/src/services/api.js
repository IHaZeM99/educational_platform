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
            if(localStorage.getItem('refresh')) {
                const refreshToken = JSON.parse(localStorage.getItem('refresh'));
                try {
                    const response = await api.post('/auth/refresh', { token: refreshToken });
                    if (response.status === 200) {
                        localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
                        localStorage.setItem('refreshToken', JSON.stringify(response.data.refreshToken));
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