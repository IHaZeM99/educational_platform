
import { useParams } from 'react-router-dom';
import { useInstractor } from "../context/InstractorContext";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

export const AddLessonPage = () => {
  const { addLesson } = useInstractor();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const lessonData = Object.fromEntries(formData);
    try{
        await addLesson(id, lessonData);
        Swal.fire({
          title: 'Success!',
          text: 'Lesson added successfully. Redirecting to dashboard in 3 seconds...',
          icon: 'success',
          timer: 3000,
          showConfirmButton: false,
          timerProgressBar: true
        });
        
        // Navigate after 3 seconds
        setTimeout(() => {
          navigate(`/courses/${id}`);
        }, 3000);
    } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to create course.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-xs *:mt-10 p-6 border rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Add Lesson</h1>
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
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="videoUrl"
            >
              Video URL
            </label>
            <input
              className="input input-bordered w-full"
              type="text"
              id="videoUrl"
              name="videoUrl"
              required
            />
          </div>
          <button className="btn btn-primary w-full" type="submit">
            Add Lesson
          </button>
        </form>
      </div>
    </div>
  );
};
