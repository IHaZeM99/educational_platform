

import api from './api';

export const enrollmentServices = {
    enrollInCourse: async (courseId) => {
        const response = await api.post(`courses/${courseId}/enrollments/create/`);
        return response.data;
    },

    getEnrolledCourses: async () => {
        const response = await api.get('enrollments/');
        return response.data;
    },

    withdrawFromCourse: async (courseId) => {
        const response = await api.delete(`courses/${courseId}/enrollments/delete/`);
        return response.data;
    }
}
