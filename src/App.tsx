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
import PlacementManagement from '@/pages/admin/PlacementManagement';

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
                
                {/* Caseworker Routes */}
                <Route path="/caseworker" element={
                  <ProtectedRoute allowedRoles={['caseworker']}>
                    <CaseWorkerDashboard />
                  </ProtectedRoute>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MunicipalityAdminDashboard />
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
                    <PlacementManagement />
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
                
                {/* Staff Routes */}
                <Route path="/staff" element={
                  <ProtectedRoute allowedRoles={['staff']}>
                    <PublicKindergartenDashboard />
                  </ProtectedRoute>
                } />
                
                {/* Partner Routes */}
                <Route path="/partner" element={
                  <ProtectedRoute allowedRoles={['partner']}>
                    <PrivateKindergartenDashboard />
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
