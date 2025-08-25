import { useInstractor } from "../context/InstractorContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CreatedCourseCard } from "../components/CreatedCourseCard.jsx";

export const InstructorDashboard = () => {
  const { createdCourses, isLoading } = useInstractor();
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
      <h1 className="text-2xl font-bold mb-4 text-center w-full max-w-6xl bg-base-200 rounded-2xl py-8">
        Welcome, {user?.user.username}!
      </h1>
      <div className="flex items-center justify-between w-full max-w-6xl my-5">
        <div className="flex-1"></div>
        <h2 className="text-xl font-semibold flex-1 text-center">Your Courses:</h2>
        <div className="flex-1 flex justify-end">
          <button className="btn btn-primary" onClick={() => navigate("/create-course")}>
            Create Course
          </button>
        </div>
      </div>
      
      <div className="bg-base-300 rounded-lg mx-4 p-6 w-full max-w-6xl">
        {createdCourses.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {createdCourses.map((createdCourse) => (
              <li key={createdCourse.id}>
                <CreatedCourseCard createdCourse={createdCourse} />
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <p className="text-gray-500 text-center">You didn't create any courses.</p>
          </div>
        )}
      </div>
    </div>
  );
};
