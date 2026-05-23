import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Workout from './pages/Workout';
import Steps from './pages/Steps';
import Diet from './pages/Diet';
import BodyTracker from './pages/BodyTracker';
import ProgressPhotos from './pages/ProgressPhotos';
import AICoach from './pages/AICoach';
import Profile from './pages/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="workout" element={<Workout />} />
          <Route path="steps" element={<Steps />} />
          <Route path="diet" element={<Diet />} />
          <Route path="body" element={<BodyTracker />} />
          <Route path="photos" element={<ProgressPhotos />} />
          <Route path="ai" element={<AICoach />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
