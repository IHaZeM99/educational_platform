
import {useAuth} from '../context/AuthContext.jsx';
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2';

export const RegisterPage = () => {
    const { register , isAuthenticated } = useAuth();
    const navigate = useNavigate();
    if(isAuthenticated) {
        navigate('/'); // Redirect to home if already authenticated
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password , email, user_type } = e.target.elements;
        try {
            await register({ username: username.value, password: password.value, email: email.value, user_type: user_type.value });
            await Swal.fire({
                icon: 'success',
                title: 'Registration Successful',
                text: 'You can now log in with your credentials.',
                timer: 2000
            });
            navigate('/login'); // Redirect to login after successful registration
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: error.response?.data?.message || 'Registration failed',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-xs *:mt-10 p-6 border rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="input input-bordered w-full"
                            type="text"
                            id="username"
                            name="username"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="input input-bordered w-full"
                            type="email"
                            id="email"
                            name="email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="input input-bordered w-full"
                            type="password"
                            id="password"
                            name="password"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            User Type
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="user_type" 
                                    value="student"
                                    className="radio radio-primary" 
                                    defaultChecked 
                                />
                                <span>Student</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="user_type" 
                                    value="instructor"
                                    className="radio radio-primary" 
                                />
                                <span>Instructor</span>
                            </label>
                        </div>
                    </div>
                    <button className="btn btn-primary w-full" type="submit">
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}