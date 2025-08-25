import React, { createContext, useContext, useState, useEffect } from 'react';
import { enrollmentServices } from '../services/enrollmentsServices';
import { useAuth } from './AuthContext';
import Swal from 'sweetalert2';

const EnrollmentContext = createContext();

export const EnrollmentProvider = ({ children }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchEnrolledCourses = async () => {
    if (isAuthenticated) {
      setIsLoading(true);
      try {
        const courses = await enrollmentServices.getEnrolledCourses();
        setEnrolledCourses(courses || []);
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        setEnrolledCourses([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setEnrolledCourses([]);
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, [isAuthenticated]);

  const enrollInCourse = async (courseId) => {
    try {
      await enrollmentServices.enrollInCourse(courseId);
      // Refresh enrolled courses after successful enrollment
      await fetchEnrolledCourses();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const withdrawFromCourse = async (courseId) => {
    try {
      await enrollmentServices.withdrawFromCourse(courseId);
      // Refresh enrolled courses after successful withdrawal
      await fetchEnrolledCourses();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const isEnrolled = (courseId) => {
    return enrolledCourses.some(enrollment => enrollment.course.id === parseInt(courseId));
  };

  const value = {
    enrolledCourses,
    setEnrolledCourses,
    isLoading,
    enrollInCourse,
    isEnrolled,
    fetchEnrolledCourses,
    withdrawFromCourse
  };

  return (
    <EnrollmentContext.Provider value={value}>
      {children}
    </EnrollmentContext.Provider>
  );
};

export function useEnrollment() {
  const context = useContext(EnrollmentContext);
  if (!context) {
    throw new Error('useEnrollment must be used within an EnrollmentProvider');
  }
  return context;
}
