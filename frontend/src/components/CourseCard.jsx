
import { useNavigate } from 'react-router-dom';
import { useEnrollment } from '../context/EnrollmentContext';
import { useAuth } from '../context/AuthContext'
import Swal from 'sweetalert2';

export const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { enrollInCourse, isEnrolled } = useEnrollment();
  const { isAuthenticated } = useAuth();

  const onEnroll = async(courseId) => {
    if(!isAuthenticated) {
      Swal.fire({
        title: 'Unauthorized',
        text: 'You need to be logged in to enroll in a course.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    const result = await enrollInCourse(courseId);
    
    if (result.success) {
      Swal.fire({
        title: 'Enrollment Successful',
        text: 'You have been enrolled in the course.',
        icon: 'success',
        timer: 3000
      });
    } else {
      Swal.fire({
        title: 'Enrollment Failed',
        text: 'There was an error enrolling you in the course.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="card-body">
        <h2 className="card-title">{course.title}</h2>
        <p className="text-sm text-base-content/70">
          by {course.instructor.username}
        </p>
        <p className="text-sm">{course.description}</p>
          
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-ghost btn-sm" onClick={() => navigate(`/courses/${course.id}`)}>
            View Details
          </button>

          {!isEnrolled(course.id) && (
            <button className="btn btn-primary btn-sm" onClick={() => onEnroll(course.id)}>
              Enroll
            </button>
          )}

          {isEnrolled(course.id) && (
            <button className="btn btn-secondary btn-sm" disabled>
              Enrolled
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
