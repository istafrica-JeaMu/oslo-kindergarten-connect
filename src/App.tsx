
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/layout/Layout';
import Index from './pages/Index';
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
import ChildrenList from './pages/guardian/ChildrenList';
import ChildProfileDetail from './pages/guardian/ChildProfileDetail';
import GuardianPayments from './pages/guardian/Payments';
import GuardianDocuments from './pages/guardian/Documents';
import GuardianNewApplication from './pages/guardian/NewApplication';
import GuardianLivingArrangements from './pages/guardian/LivingArrangements';
import PostDetail from './pages/guardian/PostDetail';
import CaseWorkerDashboard from './pages/caseworker/CaseWorkerDashboard';
import ReviewQueue from './pages/caseworker/ReviewQueue';
import PlacementManagement from './pages/caseworker/PlacementManagement';
import CaseWorkerMessages from './pages/caseworker/Messages';
import ManualApplication from './pages/caseworker/ManualApplication';
import ApplicationsInProgress from './pages/caseworker/ApplicationsInProgress';
import ApplicationsSubmitted from './pages/caseworker/ApplicationsSubmitted';
import ApplicationsFollowUp from './pages/caseworker/ApplicationsFollowUp';
import ApplicationView from './pages/caseworker/ApplicationView';
import AdminDashboard from './pages/admin/AdminDashboard';
import Reports from './pages/admin/Reports';
import SystemSettings from './pages/admin/SystemSettings';
import StaffDashboard from './pages/staff/StaffDashboard';
import PartnerDashboard from './pages/partner/PartnerDashboard';
import DistrictAdminDashboard from './pages/district-admin/DistrictAdminDashboard';
import KindergartenDashboard from './pages/kindergarten/KindergartenDashboard';
import KindergartenAttendance from './pages/kindergarten/KindergartenAttendance';
import KindergartenReports from './pages/kindergarten/KindergartenReports';
import LoginPage from './pages/auth/LoginPage';
import NotFound from './pages/NotFound';

function AppRoutes() {
  function PrivateRoute({ children }: { children: JSX.Element }) {
    const { user, isLoading } = useAuth();
    
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      );
    }
    
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
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<LoginPage />} />

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
        <Route path="notice-board/post/:id" element={<PostDetail />} />
        <Route path="application-status" element={<GuardianApplicationStatus />} />
        <Route path="child-profile" element={<GuardianChildProfile />} />
        <Route path="children" element={<ChildrenList />} />
        <Route path="child-profile/:childId" element={<ChildProfileDetail />} />
        <Route path="child-profile/:childId/application-details" element={<ChildProfileDetail />} />
        <Route path="child-profile/:childId/attendance" element={<ChildProfileDetail />} />
        <Route path="child-profile/:childId/consents" element={<ChildProfileDetail />} />
        <Route path="child-profile/:childId/living-arrangements" element={<ChildProfileDetail />} />
        <Route path="child-profile/:childId/documents" element={<ChildProfileDetail />} />
        <Route path="child-profile/:childId/contacts" element={<ChildProfileDetail />} />
        <Route path="payments" element={<GuardianPayments />} />
        <Route path="documents" element={<GuardianDocuments />} />
        <Route path="new-application" element={<GuardianNewApplication />} />
        <Route path="living-arrangements" element={<GuardianLivingArrangements />} />
      </Route>

      {/* Caseworker Routes */}
      <Route
        path="/caseworker"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<CaseWorkerDashboard />} />
        <Route path="review-queue" element={<ReviewQueue />} />
        <Route path="placement-management" element={<PlacementManagement />} />
        <Route path="messages" element={<CaseWorkerMessages />} />
        <Route path="manual-application" element={<ManualApplication />} />
        <Route path="application/:id" element={<ApplicationView />} />
        <Route path="applications/in-progress" element={<ApplicationsInProgress />} />
        <Route path="applications/submitted" element={<ApplicationsSubmitted />} />
        <Route path="applications/follow-up" element={<ApplicationsFollowUp />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<SystemSettings />} />
      </Route>

      {/* Staff Routes */}
      <Route
        path="/staff"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<StaffDashboard />} />
      </Route>

      {/* Partner Routes */}
      <Route
        path="/partner"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<PartnerDashboard />} />
      </Route>

      {/* District Admin Routes */}
      <Route
        path="/district-admin"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<DistrictAdminDashboard />} />
      </Route>

      {/* Kindergarten Routes (for staff and partners) */}
      <Route
        path="/kindergarten"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<KindergartenDashboard />} />
        <Route path="attendance" element={<KindergartenAttendance />} />
        <Route path="reports" element={<KindergartenReports />} />
      </Route>

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

      {/* Living Arrangements - Available to all authenticated users */}
      <Route
        path="/living-arrangements"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<GuardianLivingArrangements />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
