import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {Toaster} from "react-hot-toast";
import PrivateRoute from "./utils/PrivateRoute";

import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CourseDetailsPage from "./pages/CourseDetailPage";
import CreateCoursePage from "./pages/CreateCoursePage";
import EditCoursePage from "./pages/EditCoursePage";
import InstructorDashboard from "./pages/InstructorDashboard";
import StudentDashboard from "./pages/StudentDashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} exact />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/courses/:id" element={<CourseDetailsPage />} />

            {/*Private Routes*/}
            <PrivateRoute
              path="/create-course"
              element={<CreateCoursePage />}
            />
            <PrivateRoute
              path="/instructor"
              element={<InstructorDashboard />}
            />
            <PrivateRoute path="/dashboard" element={<StudentDashboard />} />
            <PrivateRoute path="/edit-course" element={<EditCoursePage />} />
          </Routes>
        </Layout>
        <Toaster position="top-right" />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
