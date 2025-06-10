import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import UpdateProfile from './pages/UpdateProfile';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSettings from './pages/admin/AdminSettings';
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
import GuardianProfile from './pages/guardian/GuardianProfile';
import GuardianMessages from './pages/guardian/GuardianMessages';
import GuardianBilling from './pages/guardian/GuardianBilling';
import GuardianDailySchedule from './pages/guardian/DailySchedule';
import GuardianChildProfile from './pages/guardian/GuardianChildProfile';
import GuardianEmergencyContacts from './pages/guardian/GuardianEmergencyContacts';
import GuardianConsents from './pages/guardian/GuardianConsents';
import GuardianTransportation from './pages/guardian/GuardianTransportation';
import LanguageProvider from './contexts/LanguageContext';

function App() {
  function PrivateRoute({ children }: { children: JSX.Element }) {
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to="/login" />;
  }

  function AdminRoute({ children }: { children: JSX.Element }) {
    const { currentUser } = useAuth();
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    // Check if the user has admin role (you might need to fetch user role from an API)
    const isAdmin = currentUser.email === 'admin@example.com'; // Example: checking for admin email
    return isAdmin ? children : <Navigate to="/" />;
  }

  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Private Routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="update-profile" element={<UpdateProfile />} />
            </Route>

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Layout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Educator Routes */}
            <Route path="/educator" element={<Layout />}>
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
            <Route path="/guardian" element={<Layout />}>
              <Route index element={<GuardianDashboard />} />
              <Route path="profile" element={<GuardianProfile />} />
              <Route path="messages" element={<GuardianMessages />} />
              <Route path="billing" element={<GuardianBilling />} />
              <Route path="daily-schedule" element={<GuardianDailySchedule />} />
              <Route path="child-profile" element={<GuardianChildProfile />} />
              <Route path="emergency-contacts" element={<GuardianEmergencyContacts />} />
              <Route path="consents" element={<GuardianConsents />} />
              <Route path="transportation" element={<GuardianTransportation />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
