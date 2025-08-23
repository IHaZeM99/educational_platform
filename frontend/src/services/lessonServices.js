
import api from './api';

export const lesson = {
  create: async (courseId, data) => {
    const response = await api.post(`courses/${courseId}/lessons/create/`, data);
    return response.data;
  },
  getByCourseId: async (courseId) => {
    const response = await api.get(`courses/${courseId}/lessons/`);
    return response.data;
  },
  getById: async (lessonId, courseId) => {
    const response = await api.get(`courses/${courseId}/lessons/${lessonId}/`);
    return response.data;
  },
  update: async (lessonId, courseId, data) => {
    const response = await api.put(`courses/${courseId}/lessons/${lessonId}/update/`, data);
    return response.data;
  },
  delete: async (lessonId, courseId) => {
    const response = await api.delete(`courses/${courseId}/lessons/${lessonId}/delete/`);
    return response.data;
  },
}
