import { useNavigate } from "react-router-dom";
import { useEnrollment } from "../context/EnrollmentContext";
import { useAuth } from "../context/AuthContext";
import { useInstractor } from "../context/InstractorContext.jsx"
import Swal from "sweetalert2";

export const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { enrollInCourse, isEnrolled , withdrawFromCourse, enrolledCourses } = useEnrollment();
  const { isAuthenticated, user } = useAuth();
  const { isCreated } = useInstractor();
  const enrolled = isEnrolled(course.id);

  // Debug: 
  console.log("CourseCard - Course ID:", course.id);
  console.log("CourseCard - Is enrolled:", enrolled);
  console.log("CourseCard - Enrolled courses:", enrolledCourses);
  console.log("CourseCard - User:", user);
  console.log("CourseCard - Is authenticated:", isAuthenticated);

  const onEnroll = async (courseId) => {
    if (!isAuthenticated) {
      Swal.fire({
        title: "Unauthorized",
        text: "You need to be logged in to enroll in a course.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const result = await enrollInCourse(courseId);

    if (result.success) {
      Swal.fire({
        title: "Enrollment Successful",
        text: "You have been enrolled in the course.",
        icon: "success",
        timer: 3000,
      });
    } else {
      Swal.fire({
        title: "Enrollment Failed",
        text: "There was an error enrolling you in the course.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const onUnenroll = async(courseId) => {
    const result = await withdrawFromCourse(courseId);

    if (result.success) {
      Swal.fire({
        title: "Unenrollment Successful",
        text: "You have been unenrolled from the course.",
        icon: "success",
        timer: 3000,
      });
    } else {
      Swal.fire({
        title: "Unenrollment Failed",
        text: "There was an error unenrolling you from the course.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="card-body">
        <h2 className="card-title">{course.title}</h2>
        <p className="text-sm text-base-content/70">
          by {course.instructor.username}
        </p>
        <p className="text-sm">{course.description}</p>

        <div className="card-actions justify-end mt-4">
          {isAuthenticated && user?.user?.user_type === "student" ? (
            <>
              {!enrolled && (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => onEnroll(course.id)}
                >
                  Enroll
                </button>
              )}

              {enrolled && (
                <>
                  <button
                    className="btn btn-outline btn-primary btn-sm"
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    View Details
                  </button>
                  <button className="btn btn-outline btn-error btn-sm" onClick={() => onUnenroll(course.id)}>Unenroll</button>
                </>
              )}
            </>
          ) : isAuthenticated && user?.user?.user_type === "instructor" ? (
            <>
              {isCreated(course.id) && (
                <>
                  <button
                    className="btn btn-outline btn-primary btn-sm"
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    View Details
                  </button>
                </>
              )}
            </>
          ) : (
            // For non-authenticated users - always show view details
            null
          )}
        </div>
      </div>
    </div>
  );
};