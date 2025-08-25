
import React, { createContext, useContext, useState, useEffect } from 'react';
import { courseServices } from '../services/courseServices';
import { lessonServices } from '../services/lessonServices';
import { useAuth } from './AuthContext';
import Swal from 'sweetalert2';

const InstractorContext = createContext();


export const InstractorProvider = ({ children }) => {
  const [createdCourses, setCreatedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchCreatedCourses = async () => {
    if (isAuthenticated) {
      setIsLoading(true);
      try {
        const courses = await courseServices.getCreatedCourses();
        setCreatedCourses(courses || []);
      } catch (error) {
        console.error('Error fetching created courses:', error);
        setCreatedCourses([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setCreatedCourses([]);
    }
  };

  useEffect(() => {
    fetchCreatedCourses();
  }, [isAuthenticated]);

  const createCourse = async (courseData) => {
    try {
      await courseServices.createCourse(courseData);
      // Refresh created courses after successful creation
      await fetchCreatedCourses();
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };
  const deleteCourse = async(courseId) => {
    try{
        await courseServices.deleteCourse(courseId);
        // Refresh created courses after successful deletion
        await fetchCreatedCourses();
    } catch (error) {
        console.error('Error deleting course:', error);
    }
  }

  const editCourse = async(courseId, updatedData) => {
    try {
      await courseServices.editCourse(courseId, updatedData);
      // Refresh created courses after successful edit
      await fetchCreatedCourses();
    } catch (error) {
      console.error('Error editing course:', error);
    }
  };

  const isCreated = (courseId) => {
    return createdCourses.some(course => course.id === courseId);
  };

  const addLesson = async (courseId, lessonData) => {
    try {
      await lessonServices.create(courseId, lessonData);
      // Refresh created courses after successful addition
      await fetchCreatedCourses();
    } catch (error) {
      console.error('Error adding lesson:', error);
    }
  };

  const value = {
    createdCourses,
    setCreatedCourses,
    isLoading,
    createCourse,
    deleteCourse,
    editCourse,
    addLesson,
    isCreated,
    fetchCreatedCourses
  };

  return (
    <InstractorContext.Provider value={value}>
      {children}
    </InstractorContext.Provider>
  );
};

export function useInstractor() {
  const context = useContext(InstractorContext);
  if (!context) {
    throw new Error('useInstractor must be used within an InstractorProvider');
  }
  return context;
}