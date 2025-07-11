
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Import existing pages
import LoginPage from '@/pages/auth/LoginPage';
import GuardianDashboard from '@/pages/guardian/GuardianDashboard';
import CaseWorkerDashboard from '@/pages/caseworker/CaseWorkerDashboard';
import MunicipalityAdminDashboard from '@/pages/admin/MunicipalityAdminDashboard';
import EducatorDashboard from '@/pages/educator/EducatorDashboard';
import PublicKindergartenDashboard from '@/pages/staff/PublicKindergartenDashboard';
import PrivateKindergartenDashboard from '@/pages/staff/PrivateKindergartenDashboard';
import DistrictAdminDashboard from '@/pages/district-admin/DistrictAdminDashboard';

// Guardian pages - existing
import DailySchedule from '@/pages/guardian/DailySchedule';
import AttendanceTracking from '@/pages/guardian/AttendanceTracking';
import Messages from '@/pages/guardian/Messages';
import NoticeBoard from '@/pages/guardian/NoticeBoard';
import ApplicationStatus from '@/pages/guardian/ApplicationStatus';
import ChildProfileDetail from '@/pages/guardian/ChildProfileDetail';
import Payments from '@/pages/guardian/Payments';
import Documents from '@/pages/guardian/Documents';

// Import ChildrenList component
import ChildrenList from '@/pages/guardian/ChildrenList';

// Caseworker pages
import ReviewQueue from '@/pages/caseworker/ReviewQueue';
import PlacementManagement from '@/pages/caseworker/PlacementManagement';
import CaseworkerMessages from '@/pages/caseworker/Messages';
import ManualApplication from '@/pages/caseworker/ManualApplication';
import ApplicationsInProgress from '@/pages/caseworker/ApplicationsInProgress';
import ApplicationsSubmitted from '@/pages/caseworker/ApplicationsSubmitted';
import ApplicationsFollowUp from '@/pages/caseworker/ApplicationsFollowUp';

// Admin pages
import ApplicationForms from '@/pages/admin/ApplicationForms';
import Approve from '@/pages/admin/Approve';
import ChildcareMember from '@/pages/admin/ChildcareMember';
import DebtManagement from '@/pages/admin/DebtManagement';
import GuaranteeList from '@/pages/admin/GuaranteeList';
import ManageChildinfoCategories from '@/pages/admin/ManageChildinfoCategories';
import ModifiedApplications from '@/pages/admin/ModifiedApplications';
import QueueHandling from '@/pages/admin/QueueHandling';
import QueueException from '@/pages/admin/QueueException';
import StayRequestJob from '@/pages/admin/StayRequestJob';
import SuggestedAdmissions from '@/pages/admin/SuggestedAdmissions';
import UnitChildrenOverview from '@/pages/admin/UnitChildrenOverview';
import ActivityPlans from '@/pages/admin/ActivityPlans';
import ParentTeacherMeeting from '@/pages/admin/ParentTeacherMeeting';
import Organization from '@/pages/admin/Organization';
import Schools from '@/pages/admin/Schools';
import Staff from '@/pages/admin/Staff';
import AdmissionsManagement from '@/pages/admin/AdmissionsManagement';
import PersonRegister from '@/pages/admin/PersonRegister';
import ReportsExport from '@/pages/admin/ReportsExport';
import Communications from '@/pages/admin/Communications';
import Settings from '@/pages/admin/Settings';
import Logs from '@/pages/admin/Logs';
import Applications from '@/pages/admin/Applications';
import AdminPlacementManagement from '@/pages/admin/PlacementManagement';
import UserTemplates from '@/pages/admin/UserTemplates';

// Educator pages - add missing imports
import EducatorAttendance from '@/pages/educator/EducatorAttendance';
import EducatorChildren from '@/pages/educator/EducatorChildren';
import EducatorMessages from '@/pages/educator/EducatorMessages';
import EducatorReports from '@/pages/educator/EducatorReports';
import EducatorCalendar from '@/pages/educator/EducatorCalendar';
import EducatorAppointments from '@/pages/educator/EducatorAppointments';
import EducatorBulletinBoard from '@/pages/educator/EducatorBulletinBoard';
import EducatorNotes from '@/pages/educator/EducatorNotes';
import EducatorLocationTracker from '@/pages/educator/EducatorLocationTracker';
import EducatorTeamCollab from '@/pages/educator/EducatorTeamCollab';

// Kindergarten pages - add missing imports for staff role
import KindergartenDashboard from '@/pages/kindergarten/KindergartenDashboard';
import ChildrenManagement from '@/pages/staff/ChildrenManagement';
import KindergartenAttendance from '@/pages/kindergarten/KindergartenAttendance';
import KindergartenReports from '@/pages/kindergarten/KindergartenReports';
import StaffMessages from '@/pages/staff/StaffMessages';
import PrivateKindergartenApplications from '@/pages/staff/PrivateKindergartenApplications';
import PrivateKindergartenCapacity from '@/pages/staff/PrivateKindergartenCapacity';

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              
              <Route path="/" element={<Layout />}>
                {/* Guardian Routes */}
                <Route path="/guardian" element={
                  <ProtectedRoute allowedRoles={['guardian']}>
                    <GuardianDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/guardian/daily-schedule" element={
                  <ProtectedRoute allowedRoles={['guardian']}>
                    <DailySchedule />
                  </ProtectedRoute>
                } />
                <Route path="/guardian/attendance-tracking" element={
                  <ProtectedRoute allowedRoles={['guardian']}>
                    <AttendanceTracking />
                  </ProtectedRoute>
                } />
                <Route path="/guardian/messages" element={
                  <ProtectedRoute allowedRoles={['guardian']}>
                    <Messages />
                  </ProtectedRoute>
                } />
                <Route path="/guardian/notice-board" element={
                  <ProtectedRoute allowedRoles={['guardian']}>
                    <NoticeBoard />
                  </ProtectedRoute>
                } />
                <Route path="/guardian/application-status" element={
                  <ProtectedRoute allowedRoles={['guardian']}>
                    <ApplicationStatus />
                  </ProtectedRoute>
                } />
                <Route path="/guardian/children" element={
                  <ProtectedRoute allowedRoles={['guardian']}>
                    <ChildrenList />
                  </ProtectedRoute>
                } />
                <Route path="/guardian/child-profile/:id" element={
                  <ProtectedRoute allowedRoles={['guardian']}>
                    <ChildProfileDetail />
                  </ProtectedRoute>
                } />
                <Route path="/guardian/child-profile" element={
                  <ProtectedRoute allowedRoles={['guardian']}>
                    <ChildrenList />
                  </ProtectedRoute>
                } />
                <Route path="/guardian/payments" element={
                  <ProtectedRoute allowedRoles={['guardian']}>
                    <Payments />
                  </ProtectedRoute>
                } />
                <Route path="/guardian/documents" element={
                  <ProtectedRoute allowedRoles={['guardian']}>
                    <Documents />
                  </ProtectedRoute>
                } />
                
                {/* Caseworker Routes */}
                <Route path="/caseworker" element={
                  <ProtectedRoute allowedRoles={['caseworker']}>
                    <CaseWorkerDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/caseworker/review-queue" element={
                  <ProtectedRoute allowedRoles={['caseworker']}>
                    <ReviewQueue />
                  </ProtectedRoute>
                } />
                <Route path="/caseworker/placement-management" element={
                  <ProtectedRoute allowedRoles={['caseworker']}>
                    <PlacementManagement />
                  </ProtectedRoute>
                } />
                <Route path="/caseworker/messages" element={
                  <ProtectedRoute allowedRoles={['caseworker']}>
                    <CaseworkerMessages />
                  </ProtectedRoute>
                } />
                <Route path="/caseworker/manual-application" element={
                  <ProtectedRoute allowedRoles={['caseworker']}>
                    <ManualApplication />
                  </ProtectedRoute>
                } />
                <Route path="/caseworker/applications/in-progress" element={
                  <ProtectedRoute allowedRoles={['caseworker']}>
                    <ApplicationsInProgress />
                  </ProtectedRoute>
                } />
                <Route path="/caseworker/applications/submitted" element={
                  <ProtectedRoute allowedRoles={['caseworker']}>
                    <ApplicationsSubmitted />
                  </ProtectedRoute>
                } />
                <Route path="/caseworker/applications/follow-up" element={
                  <ProtectedRoute allowedRoles={['caseworker']}>
                    <ApplicationsFollowUp />
                  </ProtectedRoute>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MunicipalityAdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/user-templates" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <UserTemplates />
                  </ProtectedRoute>
                } />
                <Route path="/admin/application-forms" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ApplicationForms />
                  </ProtectedRoute>
                } />
                <Route path="/admin/approve" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Approve />
                  </ProtectedRoute>
                } />
                <Route path="/admin/placement-management" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminPlacementManagement />
                  </ProtectedRoute>
                } />
                <Route path="/admin/childcare-member" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ChildcareMember />
                  </ProtectedRoute>
                } />
                <Route path="/admin/debt-management" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <DebtManagement />
                  </ProtectedRoute>
                } />
                <Route path="/admin/guarantee-list" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <GuaranteeList />
                  </ProtectedRoute>
                } />
                <Route path="/admin/logs" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Logs />
                  </ProtectedRoute>
                } />
                <Route path="/admin/manage-childinfo-categories" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ManageChildinfoCategories />
                  </ProtectedRoute>
                } />
                <Route path="/admin/modified-applications" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ModifiedApplications />
                  </ProtectedRoute>
                } />
                <Route path="/admin/queue-handling" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <QueueHandling />
                  </ProtectedRoute>
                } />
                <Route path="/admin/queue-exception" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <QueueException />
                  </ProtectedRoute>
                } />
                <Route path="/admin/stay-request-job" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <StayRequestJob />
                  </ProtectedRoute>
                } />
                <Route path="/admin/suggested-admissions" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <SuggestedAdmissions />
                  </ProtectedRoute>
                } />
                <Route path="/admin/unit-children-overview" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <UnitChildrenOverview />
                  </ProtectedRoute>
                } />
                <Route path="/admin/activity-plans" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ActivityPlans />
                  </ProtectedRoute>
                } />
                <Route path="/admin/parent-teacher-meeting" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ParentTeacherMeeting />
                  </ProtectedRoute>
                } />
                <Route path="/admin/organization" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Organization />
                  </ProtectedRoute>
                } />
                <Route path="/admin/schools" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Schools />
                  </ProtectedRoute>
                } />
                <Route path="/admin/staff" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Staff />
                  </ProtectedRoute>
                } />
                <Route path="/admin/applications" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Applications />
                  </ProtectedRoute>
                } />
                <Route path="/admin/admissions-management" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdmissionsManagement />
                  </ProtectedRoute>
                } />
                <Route path="/admin/person-register" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <PersonRegister />
                  </ProtectedRoute>
                } />
                <Route path="/admin/reports-export" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ReportsExport />
                  </ProtectedRoute>
                } />
                <Route path="/admin/communications" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Communications />
                  </ProtectedRoute>
                } />
                <Route path="/admin/settings" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Settings />
                  </ProtectedRoute>
                } />
                
                {/* Educator Routes */}
                <Route path="/educator" element={
                  <ProtectedRoute allowedRoles={['educator']}>
                    <EducatorDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/educator/attendance" element={
                  <ProtectedRoute allowedRoles={['educator']}>
                    <EducatorAttendance />
                  </ProtectedRoute>
                } />
                <Route path="/educator/children" element={
                  <ProtectedRoute allowedRoles={['educator']}>
                    <EducatorChildren />
                  </ProtectedRoute>
                } />
                <Route path="/educator/messages" element={
                  <ProtectedRoute allowedRoles={['educator']}>
                    <EducatorMessages />
                  </ProtectedRoute>
                } />
                <Route path="/educator/reports" element={
                  <ProtectedRoute allowedRoles={['educator']}>
                    <EducatorReports />
                  </ProtectedRoute>
                } />
                <Route path="/educator/calendar" element={
                  <ProtectedRoute allowedRoles={['educator']}>
                    <EducatorCalendar />
                  </ProtectedRoute>
                } />
                <Route path="/educator/appointments" element={
                  <ProtectedRoute allowedRoles={['educator']}>
                    <EducatorAppointments />
                  </ProtectedRoute>
                } />
                <Route path="/educator/bulletin-board" element={
                  <ProtectedRoute allowedRoles={['educator']}>
                    <EducatorBulletinBoard />
                  </ProtectedRoute>
                } />
                <Route path="/educator/notes" element={
                  <ProtectedRoute allowedRoles={['educator']}>
                    <EducatorNotes />
                  </ProtectedRoute>
                } />
                <Route path="/educator/location-tracker" element={
                  <ProtectedRoute allowedRoles={['educator']}>
                    <EducatorLocationTracker />
                  </ProtectedRoute>
                } />
                <Route path="/educator/team-collaboration" element={
                  <ProtectedRoute allowedRoles={['educator']}>
                    <EducatorTeamCollab />
                  </ProtectedRoute>
                } />
                
                {/* Staff Routes - Public Kindergarten */}
                <Route path="/staff" element={
                  <ProtectedRoute allowedRoles={['staff']}>
                    <PublicKindergartenDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/kindergarten" element={
                  <ProtectedRoute allowedRoles={['staff']}>
                    <KindergartenDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/kindergarten/children" element={
                  <ProtectedRoute allowedRoles={['staff']}>
                    <ChildrenManagement />
                  </ProtectedRoute>
                } />
                <Route path="/kindergarten/attendance" element={
                  <ProtectedRoute allowedRoles={['staff']}>
                    <KindergartenAttendance />
                  </ProtectedRoute>
                } />
                <Route path="/kindergarten/reports" element={
                  <ProtectedRoute allowedRoles={['staff']}>
                    <KindergartenReports />
                  </ProtectedRoute>
                } />
                <Route path="/kindergarten/messages" element={
                  <ProtectedRoute allowedRoles={['staff']}>
                    <StaffMessages />
                  </ProtectedRoute>
                } />
                
                {/* Partner Routes - Private Kindergarten */}
                <Route path="/partner" element={
                  <ProtectedRoute allowedRoles={['partner']}>
                    <PrivateKindergartenDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/kindergarten/applications" element={
                  <ProtectedRoute allowedRoles={['partner']}>
                    <PrivateKindergartenApplications />
                  </ProtectedRoute>
                } />
                <Route path="/kindergarten/capacity" element={
                  <ProtectedRoute allowedRoles={['partner']}>
                    <PrivateKindergartenCapacity />
                  </ProtectedRoute>
                } />
                
                {/* District Admin Routes */}
                <Route path="/district-admin" element={
                  <ProtectedRoute allowedRoles={['district-admin']}>
                    <DistrictAdminDashboard />
                  </ProtectedRoute>
                } />
                
                {/* Default redirect based on role */}
                <Route index element={<Navigate to="/admin" replace />} />
              </Route>
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
