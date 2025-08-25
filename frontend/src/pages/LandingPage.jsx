import { useQuery } from "@tanstack/react-query";
import { courseServices } from "../services/courseServices";
import { CourseCard } from "../components/CourseCard";

const fetchCourses = () => {
  return courseServices.getAllCourses();
};

export const LandingPage = () => {
  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
    keepPreviousData: true,
  });
  if (isLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }
  if (error) {
    return <span className="text-error">{error.message}</span>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="hero bg-base-200 rounded-lg mb-8">
        <div className="hero-content text-center">
          <div className="max-w-md py-5">
            <h1 className="text-5xl font-bold">Learn Anything</h1>
            <p className="py-6">
              Discover thousands of courses from expert instructors
            </p>
          </div>
        </div>
      </div>
      <div className="bg-base-300 rounded-lg p-6 w-full">
        {courses?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        ) : (
          <>
            <p className="text-gray-500 text-center">No courses available.</p>
          </>
        )}
      </div>
    </div>
  );
};
