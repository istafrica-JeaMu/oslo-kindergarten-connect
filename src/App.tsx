import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Layout from '@/components/layout/Layout';

// Import all pages
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import LoginPage from '@/pages/auth/LoginPage';

// Guardian pages
import GuardianDashboard from '@/pages/guardian/GuardianDashboard';
import NewApplication from '@/pages/guardian/NewApplication';
import ApplicationStatus from '@/pages/guardian/ApplicationStatus';
import Documents from '@/pages/guardian/Documents';
import Messages from '@/pages/guardian/Messages';
import DailySchedule from '@/pages/guardian/DailySchedule';
import AttendanceTracking from '@/pages/guardian/AttendanceTracking';
import AbsenceReporting from '@/pages/guardian/AbsenceReporting';
import EmergencyContacts from '@/pages/guardian/EmergencyContacts';
import PickupAuthorization from '@/pages/guardian/PickupAuthorization';
import Payments from '@/pages/guardian/Payments';
import TeacherMeetings from '@/pages/guardian/TeacherMeetings';
import HolidayRegistration from '@/pages/guardian/HolidayRegistration';
import LivingArrangements from '@/pages/guardian/LivingArrangements';
import Consents from '@/pages/guardian/Consents';
import ChildLocation from '@/pages/guardian/ChildLocation';
import NoticeBoard from '@/pages/guardian/NoticeBoard';
import PostDetail from '@/pages/guardian/PostDetail';

// Caseworker pages
import CaseWorkerDashboard from '@/pages/caseworker/CaseWorkerDashboard';
import ApplicationsInProgress from '@/pages/caseworker/ApplicationsInProgress';
import ApplicationsSubmitted from '@/pages/caseworker/ApplicationsSubmitted';
import ApplicationsFollowUp from '@/pages/caseworker/ApplicationsFollowUp';
import ManualApplication from '@/pages/caseworker/ManualApplication';
import ApplicationView from '@/pages/caseworker/ApplicationView';
import ApplicationEdit from '@/pages/caseworker/ApplicationEdit';
import PlacementManagement from '@/pages/caseworker/PlacementManagement';
import ReviewQueue from '@/pages/caseworker/ReviewQueue';

// Educator pages
import EducatorDashboard from '@/pages/educator/EducatorDashboard';
import EducatorAttendance from '@/pages/educator/EducatorAttendance';
import EducatorChildren from '@/pages/educator/EducatorChildren';
import EducatorMessages from '@/pages/educator/EducatorMessages';
import EducatorReports from '@/pages/educator/EducatorReports';
import EducatorCalendar from '@/pages/educator/EducatorCalendar';

// Other role pages
import StaffDashboard from '@/pages/staff/StaffDashboard';
import PrivateKindergartenDashboard from '@/pages/staff/PrivateKindergartenDashboard';
import PublicKindergartenDashboard from '@/pages/staff/PublicKindergartenDashboard';
import ChildrenManagement from '@/pages/staff/ChildrenManagement';
import KindergartenDashboard from '@/pages/kindergarten/KindergartenDashboard';
import KindergartenAttendance from '@/pages/kindergarten/KindergartenAttendance';
import KindergartenReports from '@/pages/kindergarten/KindergartenReports';
import DistrictAdminDashboard from '@/pages/district-admin/DistrictAdminDashboard';
import PartnerDashboard from '@/pages/partner/PartnerDashboard';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import Reports from '@/pages/admin/Reports';
import SystemSettings from '@/pages/admin/SystemSettings';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              
              <Route element={<ProtectedRoute allowedRoles={['guardian', 'caseworker', 'admin', 'staff', 'partner', 'district-admin', 'educator']}><Layout /></ProtectedRoute>}>
                {/* Guardian Routes */}
                <Route path="/guardian" element={<GuardianDashboard />} />
                <Route path="/guardian/new-application" element={<NewApplication />} />
                <Route path="/guardian/application-status" element={<ApplicationStatus />} />
                <Route path="/guardian/documents" element={<Documents />} />
                <Route path="/guardian/messages" element={<Messages />} />
                <Route path="/guardian/daily-schedule" element={<DailySchedule />} />
                <Route path="/guardian/attendance" element={<AttendanceTracking />} />
                <Route path="/guardian/absence-reporting" element={<AbsenceReporting />} />
                <Route path="/guardian/emergency-contacts" element={<EmergencyContacts />} />
                <Route path="/guardian/pickup-authorization" element={<PickupAuthorization />} />
                <Route path="/guardian/payments" element={<Payments />} />
                <Route path="/guardian/teacher-meetings" element={<TeacherMeetings />} />
                <Route path="/guardian/holiday-registration" element={<HolidayRegistration />} />
                <Route path="/guardian/living-arrangements" element={<LivingArrangements />} />
                <Route path="/guardian/consents" element={<Consents />} />
                <Route path="/guardian/child-location" element={<ChildLocation />} />
                <Route path="/guardian/notice-board" element={<NoticeBoard />} />
                <Route path="/guardian/notice-board/:id" element={<PostDetail />} />

                {/* Caseworker Routes */}
                <Route path="/caseworker" element={<CaseWorkerDashboard />} />
                <Route path="/caseworker/applications/in-progress" element={<ApplicationsInProgress />} />
                <Route path="/caseworker/applications/submitted" element={<ApplicationsSubmitted />} />
                <Route path="/caseworker/applications/follow-up" element={<ApplicationsFollowUp />} />
                <Route path="/caseworker/manual-application" element={<ManualApplication />} />
                <Route path="/caseworker/manual-application/:id/edit" element={<ApplicationEdit />} />
                <Route path="/caseworker/application/:id/view" element={<ApplicationView />} />
                <Route path="/caseworker/placement-management" element={<PlacementManagement />} />
                <Route path="/caseworker/review-queue" element={<ReviewQueue />} />

                {/* Educator Routes */}
                <Route path="/educator" element={<EducatorDashboard />} />
                <Route path="/educator/attendance" element={<EducatorAttendance />} />
                <Route path="/educator/children" element={<EducatorChildren />} />
                <Route path="/educator/messages" element={<EducatorMessages />} />
                <Route path="/educator/reports" element={<EducatorReports />} />
                <Route path="/educator/calendar" element={<EducatorCalendar />} />

                {/* Other Role Routes */}
                <Route path="/staff" element={<StaffDashboard />} />
                <Route path="/staff/private-kindergarten" element={<PrivateKindergartenDashboard />} />
                <Route path="/staff/public-kindergarten" element={<PublicKindergartenDashboard />} />
                <Route path="/staff/children" element={<ChildrenManagement />} />
                <Route path="/staff/educator-attendance" element={<EducatorAttendance />} />
                <Route path="/kindergarten" element={<KindergartenDashboard />} />
                <Route path="/kindergarten/attendance" element={<KindergartenAttendance />} />
                <Route path="/kindergarten/reports" element={<KindergartenReports />} />
                <Route path="/district-admin" element={<DistrictAdminDashboard />} />
                <Route path="/partner" element={<PartnerDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/reports" element={<Reports />} />
                <Route path="/admin/system-settings" element={<SystemSettings />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </Router>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
