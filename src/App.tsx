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
import CaseWorkerDashboard from "./pages/caseworker/CaseWorkerDashboard";
import ReviewQueue from "./pages/caseworker/ReviewQueue";
import PlacementManagement from "./pages/caseworker/PlacementManagement";
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
                <Route path="messages" element={<Messages />} />
                <Route path="payments" element={<Payments />} />
              </Route>

              {/* Case Worker Routes */}
              <Route path="/caseworker" element={
                <ProtectedRoute allowedRoles={['caseworker']}>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<CaseWorkerDashboard />} />
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
