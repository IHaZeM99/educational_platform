import api from './api';

export const auth = {
    login: async (Credential) => {
        const response = await api.post('/auth/login', Credential);
        return response.data;
    },

    register: async (Credential) => {
        const response = await api.post('/auth/register', Credential);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
}