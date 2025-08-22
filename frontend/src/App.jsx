import {BrowserRouter as Router , Route , Routes} from 'react-router-dom';
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />

          {/*Private Routes*/}
          
          <Route path="/create-course" element={<CreateCoursePage />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App

