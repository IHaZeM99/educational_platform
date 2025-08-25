import api from './api';

export const courseServices = {
    getAllCourses: async () => {
        const response = await api.get('/courses/');
        return response.data;
    },

    getCourseById: async (id) => {
        const response = await api.get(`/courses/${id}/`);
        return response.data;
    },

    createCourse: async (courseData) => {
        const response = await api.post('/courses/create/', courseData);
        return response.data;
    },

    editCourse: async (id, courseData) => {
        const response = await api.put(`/courses/${id}/update/`, courseData);
        return response.data;
    },

    deleteCourse: async (id) => {
        const response = await api.delete(`/courses/${id}/delete/`);
        return response.data;
    },

    getCreatedCourses: async () => {
        const response = await api.get('/courses/created/');
        return response.data;
    }
}