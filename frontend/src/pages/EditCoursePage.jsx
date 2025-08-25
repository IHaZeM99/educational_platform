
import { useParams } from 'react-router-dom';
import { useInstractor } from "../context/InstractorContext";
import { courseServices } from "../services/courseServices";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const EditCoursePage = () => {
  const { editCourse } = useInstractor();
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    const fetchCourse = async () => {
      const courseData = await courseServices.getCourseById(id);
      setCourse(courseData);
      setFormData({
        title: courseData.title,
        description: courseData.description
      });
    };
    fetchCourse();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!course) {
    return <div className="flex justify-center items-center "><span className="loading loading-spinner loading-xl"></span></div>;
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
        await editCourse(id, formData);
        Swal.fire({
          title: 'Success!',
          text: 'Course updated successfully. Redirecting to dashboard in 3 seconds...',
          icon: 'success',
          timer: 3000,
          showConfirmButton: false,
          timerProgressBar: true
        });
        
        // Navigate after 3 seconds
        setTimeout(() => {
          navigate('/instructor');
        }, 3000);
    } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update course.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-xs *:mt-10 p-6 border rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Course</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="input input-bordered w-full"
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              className="input input-bordered w-full"
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <button className="btn btn-primary w-full" type="submit">
            Update Course
          </button>
        </form>
      </div>
    </div>
  );
};
