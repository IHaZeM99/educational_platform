import api from './api';

export const authServices = {
    login: async (Credential) => {
        const response = await api.post('/auth/login/', Credential);
        return response.data;
    },

    register: async (Credential) => {
        const response = await api.post('/auth/register/', Credential);
        return response.data;
    },

    logout: () => {
        // Clear all auth-related data from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        
        // Clear any other cached auth data
        localStorage.removeItem('user');
        
        // Clear session storage as well (if any)
        sessionStorage.clear();
    },

    refresh: async () => {
        const response = await api.post('/auth/refresh/');
        return response.data;
    },

    getUser: async () => {
        const response = await api.get('/auth/user/');
        return response.data;
    }
}