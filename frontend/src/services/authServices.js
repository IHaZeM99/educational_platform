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
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
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