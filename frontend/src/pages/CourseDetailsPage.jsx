import { useParams , useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { courseServices } from "../services/courseServices";
import { lessonServices } from "../services/lessonServices"
import { useState } from "react";
import { useEnrollment } from "../context/EnrollmentContext.jsx";
import { useAuth } from "../context/AuthContext.jsx"

export const CourseDetailsPage = () => {
  const { id } = useParams(); 
  const [selectedLesson, setSelectedLesson] = useState(null);
  const { isEnrolled } = useEnrollment();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: course,
    isLoading: courseLoading,
    error: courseError,
  } = useQuery({
    queryKey: ["course", id],
    queryFn: () => courseServices.getCourseById(id),
  });

  const {
    data: lessons,
    isLoading: lessonsLoading,
    error: lessonsError,
  } = useQuery({
    queryKey: ["lessons", id],
    queryFn: () => lessonServices.getByCourseId(id),
    enabled: !!id && !!course && (
      (user && isEnrolled(id)) || 
      (user && course.instructor.id === user.user.id) ||
      !user
    ), // Only fetch lessons if user has access
  });

  if (courseLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (courseError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="alert alert-error">
          <span>{courseError.message}</span>
        </div>
      </div>
    );
  }

  if (user && course && !isEnrolled(id) && course.instructor.id !== user.user.id) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="alert alert-error">
          <span>You are not enrolled in this course and you are not the instructor.</span>
          <button className="btn btn-primary" onClick={() => navigate("/")}>Go to Courses</button>
        </div>
      </div>
    );
  }
  console.log(lessons);

  return (
    <div className="container mx-auto px-4 py-8">
      
      <div className="hero bg-base-200 rounded-lg mb-8">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">{course?.title}</h1>
            {/* <p className="text-lg mb-4">{course?.description}</p>
            <div className="flex justify-center items-center gap-4 text-sm">
              <span>by {course?.instructor?.username}</span>
            </div> */}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Details */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Course Overview</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Description</h3>
                  <p className="text-base-content/80">{course?.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg">Instructor</h3>
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-primary text-primary-content rounded-full w-12 text-center">
                        <span>{course?.instructor?.username?.charAt(0).toUpperCase()}</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{course?.instructor?.username}</p>
                      <p className="text-sm text-base-content/60">{course?.instructor?.bio || "Instructor"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <h2 className="card-title mb-4">Course Lessons</h2>
                {user.user.user_type === 'instructor' && (
                  <button className="btn btn-primary btn-sm" onClick={() => navigate(`/add-lesson/${id}`)}>Add Lesson</button>
                )}
              </div>

              {lessonsLoading ? (
                <div className="flex justify-center">
                  <span className="loading loading-spinner"></span>
                </div>
              ) : lessonsError ? (
                <div className="alert alert-warning">
                  <span>Failed to load lessons</span>
                </div>
              ) : lessons && lessons.length > 0 ? (
                <div className="space-y-2">
                  <div className="dropdown dropdown-end w-full">
                    <div tabIndex={0} role="button" className="btn btn-outline w-full">
                      {selectedLesson ? selectedLesson.title : "Select a Lesson"}
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full max-h-60 overflow-y-auto">
                      {lessons.map((lesson, index) => (
                        <li key={lesson.id}>
                          <a 
                            onClick={() => setSelectedLesson(lesson)}
                            className={selectedLesson?.id === lesson.id ? "active" : ""}
                          >
                            <span className="badge badge-sm mr-2">{index + 1}</span>
                            {lesson.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Selected Lesson Details */}
                  {selectedLesson && (
                    <div className="mt-4 p-4 bg-base-200 rounded-lg">
                      <h4 className="font-semibold mb-2">{selectedLesson.title}</h4>
                      <p className="text-sm text-base-content/70 mb-3">{selectedLesson.content}</p>
                      {selectedLesson.videoUrl && (
                        <a 
                          href={selectedLesson.videoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-primary btn-sm"
                        >
                          Watch Video
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-base-content/60">
                  <p>No lessons available for this course yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
