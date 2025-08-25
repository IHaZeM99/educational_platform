import { useNavigate } from "react-router-dom";
import { useEnrollment } from "../context/EnrollmentContext";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

export const EnrolledCoursesCard = ({ enrolledCourse }) => {
  const navigate = useNavigate();
  const { withdrawFromCourse, isEnrolled } = useEnrollment();

  const onWithdraw = async (courseId) => {
    // if (!isEnrolled(courseId)) return;
    const result = await withdrawFromCourse(courseId);
    if (result.success) {
      Swal.fire({
        title: "Withdrawal Successful",
        text: "You have been withdrawn from the course.",
        icon: "success",
        timer: 3000,
      });
    } else {
      Swal.fire({
        title: "Withdrawal Failed",
        text: "There was an error withdrawing you from the course.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="card-body">
        <h2 className="card-title">{enrolledCourse.course.title}</h2>
        <p className="text-sm text-base-content/70">
          by {enrolledCourse.course.instructor.username}
        </p>
        <p className="text-sm">{enrolledCourse.course.description}</p>

        <div className="card-actions justify-end mt-4 items-center">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate(`/courses/${enrolledCourse.course.id}`)}
          >
            View Details
          </button>

          <button className="btn btn-outline btn-error btn-sm" onClick={() => onWithdraw(enrolledCourse.course.id)}>Withdraw</button>
        </div>
      </div>
    </div>
  );
};
