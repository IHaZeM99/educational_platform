import { useNavigate } from "react-router-dom";
import { useInstractor } from "../context/InstractorContext";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

export const CreatedCourseCard = ({ createdCourse }) => {
  const navigate = useNavigate();
  const {  deleteCourse, isCreated } = useInstractor();

  const onDelete = async (courseId) => {
    const result = await deleteCourse(courseId);
    if (result.success) {
      Swal.fire({
        title: "Deletion Successful",
        text: "The course has been deleted.",
        icon: "success",
        timer: 3000,
      });
    } else {
      Swal.fire({
        title: "Deletion Failed",
        text: "There was an error deleting the course.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="card-body">
        <h2 className="card-title">{createdCourse.title}</h2>
        <p className="text-sm text-base-content/70">
          by {createdCourse.instructor.username}
        </p>
        <p className="text-sm">{createdCourse.description}</p>

        <div className="card-actions justify-end mt-4 items-center">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate(`/courses/${createdCourse.id}`)}
          >
            View Details
          </button>
          <button
            className="btn btn-outline btn-primary btn-sm"
            onClick={() => navigate(`/edit-course/${createdCourse.id}`)}
          >
            Edit
          </button>

          <button
            className="btn btn-outline btn-error btn-sm"
            onClick={() => onDelete(createdCourse.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
