
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/layout/Layout';
import EducatorDashboard from './pages/educator/EducatorDashboard';
import EducatorAttendance from './pages/staff/EducatorAttendance';
import EducatorChildren from './pages/educator/EducatorChildren';
import EducatorMessages from './pages/educator/EducatorMessages';
import EducatorReports from './pages/educator/EducatorReports';
import EducatorCalendar from './pages/educator/EducatorCalendar';
import EducatorLocationTracker from './pages/educator/EducatorLocationTracker';
import EducatorAppointments from './pages/educator/EducatorAppointments';
import EducatorNotes from './pages/educator/EducatorNotes';
import EducatorBulletinBoard from './pages/educator/EducatorBulletinBoard';
import EducatorTeamCollab from './pages/educator/EducatorTeamCollab';
import GuardianDashboard from './pages/guardian/GuardianDashboard';
import GuardianMessages from './pages/guardian/Messages';
import GuardianDailySchedule from './pages/guardian/DailySchedule';
import GuardianAttendanceTracking from './pages/guardian/AttendanceTracking';
import GuardianNoticeBoard from './pages/guardian/NoticeBoard';
import GuardianApplicationStatus from './pages/guardian/ApplicationStatus';
import GuardianChildProfile from './pages/guardian/ChildProfile';
import GuardianPayments from './pages/guardian/Payments';
import GuardianDocuments from './pages/guardian/Documents';
import LoginPage from './pages/auth/LoginPage';
import NotFound from './pages/NotFound';

function App() {
  function PrivateRoute({ children }: { children: JSX.Element }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
  }

  function AdminRoute({ children }: { children: JSX.Element }) {
    const { user } = useAuth();
    if (!user) {
      return <Navigate to="/login" />;
    }
    // Check if the user has admin role
    const isAdmin = user.role === 'admin';
    return isAdmin ? children : <Navigate to="/" />;
  }

  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* Default redirect based on user role */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Navigate to="/educator" replace />
                </PrivateRoute>
              }
            />

            {/* Educator Routes */}
            <Route
              path="/educator"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route index element={<EducatorDashboard />} />
              <Route path="attendance" element={<EducatorAttendance />} />
              <Route path="children" element={<EducatorChildren />} />
              <Route path="messages" element={<EducatorMessages />} />
              <Route path="reports" element={<EducatorReports />} />
              <Route path="calendar" element={<EducatorCalendar />} />
              <Route path="location-tracker" element={<EducatorLocationTracker />} />
              <Route path="appointments" element={<EducatorAppointments />} />
              <Route path="notes" element={<EducatorNotes />} />
              <Route path="bulletin-board" element={<EducatorBulletinBoard />} />
              <Route path="team-collaboration" element={<EducatorTeamCollab />} />
            </Route>

            {/* Guardian Routes */}
            <Route
              path="/guardian"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route index element={<GuardianDashboard />} />
              <Route path="messages" element={<GuardianMessages />} />
              <Route path="daily-schedule" element={<GuardianDailySchedule />} />
              <Route path="attendance-tracking" element={<GuardianAttendanceTracking />} />
              <Route path="notice-board" element={<GuardianNoticeBoard />} />
              <Route path="application-status" element={<GuardianApplicationStatus />} />
              <Route path="child-profile" element={<GuardianChildProfile />} />
              <Route path="payments" element={<GuardianPayments />} />
              <Route path="documents" element={<GuardianDocuments />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
