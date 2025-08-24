
import {useAuth} from '../context/AuthContext.jsx';
import {useNavigate} from 'react-router-dom'

export const LoginPage = () => {
    const { login , isAuthenticated } = useAuth();
    const navigate = useNavigate();
    if(isAuthenticated) {
        navigate('/'); // Redirect to home if already authenticated
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = e.target.elements;
        try {
            await login({ username: username.value, password: password.value });
            navigate('/'); // Redirect to home after successful login
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-xs *:mt-10 p-6 border rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
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
                    <button className="btn btn-primary w-full" type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}