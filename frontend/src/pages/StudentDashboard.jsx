

import { useEnrollment } from '../context/EnrollmentContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { EnrolledCoursesCard } from '../components/EnrolledCoursesCard.jsx';

export const StudentDashboard = () => {
    
    const { enrolledCourses, isLoading } = useEnrollment();
    const { user } = useAuth();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-xl"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col gap-4 justify-center items-center">
            <h1 className="text-2xl font-bold mb-4 text-center w-full max-w-6xl bg-base-200 rounded-2xl py-8">Welcome, {user?.user.username}!</h1>
            <h2 className="text-xl font-semibold mb-2">Your Enrolled Courses:</h2>
            <div className="bg-base-300 rounded-lg mx-4 p-6 w-full max-w-6xl">
                {enrolledCourses.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrolledCourses.map((enrolledCourse) => (
                        <li key={enrolledCourse.id}>
                            <EnrolledCoursesCard enrolledCourse={enrolledCourse} />
                        </li>
                    ))}
                </ul>
            ) : (
                <>
                    <p className="text-gray-500">You are not enrolled in any courses.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/')}>Browse Courses</button>
                </>
            )}
            </div>
            
        </div>
    );
};
