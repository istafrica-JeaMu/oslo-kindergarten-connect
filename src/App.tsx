
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import LoginPage from "./pages/auth/LoginPage";
import GuardianDashboard from "./pages/guardian/GuardianDashboard";
import NewApplication from "./pages/guardian/NewApplication";
import ApplicationStatus from "./pages/guardian/ApplicationStatus";
import Messages from "./pages/guardian/Messages";
import Payments from "./pages/guardian/Payments";
import DailySchedule from "./pages/guardian/DailySchedule";
import AbsenceReporting from "./pages/guardian/AbsenceReporting";
import AttendanceTracking from "./pages/guardian/AttendanceTracking";
import ChildLocation from "./pages/guardian/ChildLocation";
import PickupAuthorization from "./pages/guardian/PickupAuthorization";
import TeacherMeetings from "./pages/guardian/TeacherMeetings";
import Consents from "./pages/guardian/Consents";
import Documents from "./pages/guardian/Documents";
import NoticeBoard from "./pages/guardian/NoticeBoard";
import LivingArrangements from "./pages/guardian/LivingArrangements";
import HolidayRegistration from "./pages/guardian/HolidayRegistration";
import CaseWorkerDashboard from "./pages/caseworker/CaseWorkerDashboard";
import ReviewQueue from "./pages/caseworker/ReviewQueue";
import PlacementManagement from "./pages/caseworker/PlacementManagement";
import ManualApplication from "./pages/caseworker/ManualApplication";
import ApplicationsInProgress from "./pages/caseworker/ApplicationsInProgress";
import ApplicationsSubmitted from "./pages/caseworker/ApplicationsSubmitted";
import ApplicationsFollowUp from "./pages/caseworker/ApplicationsFollowUp";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Reports from "./pages/admin/Reports";
import SystemSettings from "./pages/admin/SystemSettings";
import StaffDashboard from "./pages/staff/StaffDashboard";
import PartnerDashboard from "./pages/partner/PartnerDashboard";
import KindergartenDashboard from "./pages/kindergarten/KindergartenDashboard";
import KindergartenAttendance from "./pages/kindergarten/KindergartenAttendance";
import KindergartenReports from "./pages/kindergarten/KindergartenReports";
import DistrictAdminDashboard from "./pages/district-admin/DistrictAdminDashboard";
import NotFound from "./pages/NotFound";
import './i18n';
import PublicKindergartenDashboard from "./pages/staff/PublicKindergartenDashboard";
import PrivateKindergartenDashboard from "./pages/staff/PrivateKindergartenDashboard";
import ChildrenManagement from "./pages/staff/ChildrenManagement";
import EducatorAttendance from "./pages/staff/EducatorAttendance";
import EducatorDashboard from "./pages/educator/EducatorDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              
              {/* Guardian Routes */}
              <Route path="/guardian" element={
                <ProtectedRoute allowedRoles={['guardian']}>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<GuardianDashboard />} />
                <Route path="new-application" element={<NewApplication />} />
                <Route path="application-status" element={<ApplicationStatus />} />
                <Route path="daily-schedule" element={<DailySchedule />} />
                <Route path="absence" element={<AbsenceReporting />} />
                <Route path="attendance" element={<AttendanceTracking />} />
                <Route path="location" element={<ChildLocation />} />
                <Route path="pickup" element={<PickupAuthorization />} />
                <Route path="messages" element={<Messages />} />
                <Route path="meetings" element={<TeacherMeetings />} />
                <Route path="consents" element={<Consents />} />
                <Route path="documents" element={<Documents />} />
                <Route path="notice-board" element={<NoticeBoard />} />
                <Route path="living-arrangements" element={<LivingArrangements />} />
                <Route path="holiday-registration" element={<HolidayRegistration />} />
                <Route path="payments" element={<Payments />} />
              </Route>

              {/* Case Worker Routes */}
              <Route path="/caseworker" element={
                <ProtectedRoute allowedRoles={['caseworker']}>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<CaseWorkerDashboard />} />
                <Route path="manual-application" element={<ManualApplication />} />
                <Route path="applications/in-progress" element={<ApplicationsInProgress />} />
                <Route path="applications/submitted" element={<ApplicationsSubmitted />} />
                <Route path="applications/follow-up" element={<ApplicationsFollowUp />} />
                <Route path="review-queue" element={<ReviewQueue />} />
                <Route path="placement-management" element={<PlacementManagement />} />
                <Route path="messages" element={<Messages />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<SystemSettings />} />
              </Route>

              {/* Educator Routes */}
              <Route path="/educator" element={
                <ProtectedRoute allowedRoles={['educator']}>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<EducatorDashboard />} />
                <Route path="attendance" element={<EducatorAttendance />} />
                <Route path="children" element={<ChildrenManagement />} />
                <Route path="messages" element={<Messages />} />
                <Route path="reports" element={<KindergartenReports />} />
              </Route>

              {/* Staff Routes (Legacy) */}
              <Route path="/staff" element={
                <ProtectedRoute allowedRoles={['staff']}>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<StaffDashboard />} />
                <Route path="educator-attendance" element={<EducatorAttendance />} />
              </Route>

              {/* Partner Routes (Legacy) */}
              <Route path="/partner" element={
                <ProtectedRoute allowedRoles={['partner']}>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<PartnerDashboard />} />
                <Route path="educator-attendance" element={<EducatorAttendance />} />
              </Route>

              {/* Kindergarten Routes (Public & Private Staff) */}
              <Route path="/kindergarten" element={
                <ProtectedRoute allowedRoles={['staff', 'partner']}>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<KindergartenDashboard />} />
                <Route path="public" element={<PublicKindergartenDashboard />} />
                <Route path="private" element={<PrivateKindergartenDashboard />} />
                <Route path="children" element={<ChildrenManagement />} />
                <Route path="attendance" element={<KindergartenAttendance />} />
                <Route path="educator-attendance" element={<EducatorAttendance />} />
                <Route path="reports" element={<KindergartenReports />} />
                <Route path="messages" element={<Messages />} />
              </Route>

              {/* District Admin Routes */}
              <Route path="/district-admin" element={
                <ProtectedRoute allowedRoles={['district-admin']}>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<DistrictAdminDashboard />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
