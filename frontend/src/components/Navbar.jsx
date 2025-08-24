import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a onClick={() => navigate('/')} className="btn btn-ghost text-xl">Educational Platform</a>
      </div>
      <div className="flex-none">
        {isAuthenticated ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-8 rounded-full bg-primary text-primary-content flex items-center justify-center ">
                <span className="text-sm font-medium text-center flex items-center justify-center">
                  {user?.user.username?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li className="menu-title">
                <span>Hello, {user?.user.username}</span>
              </li>
              <div className="divider"></div>
              {user?.user.user_type === 'student' ? (
                <li>
                  <a onClick={() => navigate('/dashboard')} className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Student Dashboard
                  </a>
                </li>
              ) : (
                <li>
                  <a onClick={() => navigate('/instructor')} className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Instructor Dashboard
                  </a>
                </li>
              )}
              <div className="divider"></div>
              <li>
                <a onClick={logout} className="flex items-center gap-2 text-error">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <ul className="menu menu-horizontal px-1">
            <li>
              <a onClick={() => navigate('/login')} className="btn btn-ghost">Login</a>
            </li>
            <li>
              <a onClick={() => navigate('/register')} className="btn btn-outline btn-primary">Register</a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
