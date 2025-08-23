import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

import { Layout } from "./components/Layout";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { CourseDetailsPage } from "./pages/CourseDetailsPage";
import { CreateCoursePage } from "./pages/CreateCoursePage";
import { EditCoursePage } from "./pages/EditCoursePage";
import { InstructorDashboard } from "./pages/InstructorDashboard";
import { StudentDashboard } from "./pages/StudentDashboard";

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/courses/:id" element={<CourseDetailsPage />} />

      {/* Private Routes */}
      <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/create-course" element={<CreateCoursePage />} />
        <Route path="/instructor" element={<InstructorDashboard />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/edit-course" element={<EditCoursePage />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Layout>
            <AppRoutes />
          </Layout>
          <Toaster position="top-right" />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
