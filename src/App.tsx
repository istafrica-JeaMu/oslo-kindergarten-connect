import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import AppLayout from '@/components/layout/AppLayout';
import ProtectedRoute from '@/components/ProtectedRoute';

// Guardian Pages
import GuardianDashboard from '@/pages/guardian/GuardianDashboard';
import ApplicationDashboard from '@/pages/guardian/ApplicationDashboard';
import ApplicationForm from '@/pages/guardian/ApplicationForm';
import ChildrenOverview from '@/pages/guardian/ChildrenOverview';
import CommunicationCenter from '@/pages/guardian/CommunicationCenter';
import DocumentCenter from '@/pages/guardian/DocumentCenter';
import PaymentCenter from '@/pages/guardian/PaymentCenter';

// Caseworker Pages
import CaseworkerDashboard from '@/pages/caseworker/CaseworkerDashboard';
import ApplicationManagement from '@/pages/caseworker/ApplicationManagement';
import CapacityManagement from '@/pages/caseworker/CapacityManagement';
import CommunicationHub from '@/pages/caseworker/CommunicationHub';
import ChildRecords from '@/pages/caseworker/ChildRecords';
import ReportsDashboard from '@/pages/caseworker/ReportsDashboard';

// Staff Pages
import StaffDashboard from '@/pages/staff/StaffDashboard';
import AttendancePage from '@/pages/staff/AttendancePage';
import ChildrenPage from '@/pages/staff/ChildrenPage';
import CommunicationPage from '@/pages/staff/CommunicationPage';
import ReportsPage from '@/pages/staff/ReportsPage';

// Partner Pages
import PartnerDashboard from '@/pages/partner/PartnerDashboard';
import PartnerApplications from '@/pages/partner/PartnerApplications';
import PartnerCapacity from '@/pages/partner/PartnerCapacity';
import PartnerFinance from '@/pages/partner/PartnerFinance';
import PartnerCommunication from '@/pages/partner/PartnerCommunication';

// District Admin Pages
import DistrictAdminDashboard from '@/pages/district-admin/DistrictAdminDashboard';
import KindergartenManagement from '@/pages/district-admin/KindergartenManagement';
import UserManagement from '@/pages/district-admin/UserManagement';
import PlacementCalendar from '@/pages/district-admin/PlacementCalendar';
import PolicyConfiguration from '@/pages/district-admin/PolicyConfiguration';
import SelfServiceFeatures from '@/pages/district-admin/SelfServiceFeatures';
import Analytics from '@/pages/district-admin/Analytics';
import AuditLogs from '@/pages/district-admin/AuditLogs';

// Educator Pages
import EducatorDashboard from '@/pages/educator/EducatorDashboard';
import AttendanceManager from '@/pages/educator/AttendanceManager';
import ActivityPlanning from '@/pages/educator/ActivityPlanning';
import ParentCommunication from '@/pages/educator/ParentCommunication';
import ChildProfiles from '@/pages/educator/ChildProfiles';

import { QueryClient } from '@tanstack/react-query';
import MunicipalityAdminDashboard from '@/pages/admin/MunicipalityAdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <QueryClient>
          <div className="min-h-screen bg-background">
            <Routes>
              {/* Landing and Auth Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              
              {/* Municipality Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AppLayout>
                    <MunicipalityAdminDashboard />
                  </AppLayout>
                </ProtectedRoute>
              } />

              {/* Guardian Routes */}
              <Route path="/guardian/*" element={
                <ProtectedRoute allowedRoles={['guardian']}>
                  <AppLayout>
                    <Routes>
                      <Route index element={<GuardianDashboard />} />
                      <Route path="applications" element={<ApplicationDashboard />} />
                      <Route path="applications/new" element={<ApplicationForm />} />
                      <Route path="children" element={<ChildrenOverview />} />
                      <Route path="communication" element={<CommunicationCenter />} />
                      <Route path="documents" element={<DocumentCenter />} />
                      <Route path="payments" element={<PaymentCenter />} />
                    </Routes>
                  </AppLayout>
                </ProtectedRoute>
              } />

              {/* Caseworker Routes */}
              <Route path="/caseworker/*" element={
                <ProtectedRoute allowedRoles={['caseworker']}>
                  <AppLayout>
                    <Routes>
                      <Route index element={<CaseworkerDashboard />} />
                      <Route path="applications" element={<ApplicationManagement />} />
                      <Route path="capacity" element={<CapacityManagement />} />
                      <Route path="communication" element={<CommunicationHub />} />
                      <Route path="children" element={<ChildRecords />} />
                      <Route path="reports" element={<ReportsDashboard />} />
                    </Routes>
                  </AppLayout>
                </ProtectedRoute>
              } />

              {/* Staff Routes */}
              <Route path="/staff/*" element={
                <ProtectedRoute allowedRoles={['staff']}>
                  <AppLayout>
                    <Routes>
                      <Route index element={<StaffDashboard />} />
                      <Route path="attendance" element={<AttendancePage />} />
                      <Route path="children" element={<ChildrenPage />} />
                      <Route path="communication" element={<CommunicationPage />} />
                      <Route path="reports" element={<ReportsPage />} />
                    </Routes>
                  </AppLayout>
                </ProtectedRoute>
              } />

              {/* Partner Routes */}
              <Route path="/partner/*" element={
                <ProtectedRoute allowedRoles={['partner']}>
                  <AppLayout>
                    <Routes>
                      <Route index element={<PartnerDashboard />} />
                      <Route path="applications" element={<PartnerApplications />} />
                      <Route path="capacity" element={<PartnerCapacity />} />
                      <Route path="finance" element={<PartnerFinance />} />
                      <Route path="communication" element={<PartnerCommunication />} />
                    </Routes>
                  </AppLayout>
                </ProtectedRoute>
              } />

              {/* District Admin Routes */}
              <Route path="/district-admin/*" element={
                <ProtectedRoute allowedRoles={['district-admin']}>
                  <AppLayout>
                    <Routes>
                      <Route index element={<DistrictAdminDashboard />} />
                      <Route path="kindergartens" element={<KindergartenManagement />} />
                      <Route path="users" element={<UserManagement />} />
                      <Route path="placement-calendar" element={<PlacementCalendar />} />
                      <Route path="policies" element={<PolicyConfiguration />} />
                      <Route path="self-service" element={<SelfServiceFeatures />} />
                      <Route path="analytics" element={<Analytics />} />
                      <Route path="audit-logs" element={<AuditLogs />} />
                    </Routes>
                  </AppLayout>
                </ProtectedRoute>
              } />

              {/* Educator Routes */}
              <Route path="/educator/*" element={
                <ProtectedRoute allowedRoles={['educator']}>
                  <AppLayout>
                    <Routes>
                      <Route index element={<EducatorDashboard />} />
                      <Route path="attendance" element={<AttendanceManager />} />
                      <Route path="activities" element={<ActivityPlanning />} />
                      <Route path="communication" element={<ParentCommunication />} />
                      <Route path="children" element={<ChildProfiles />} />
                    </Routes>
                  </AppLayout>
                </ProtectedRoute>
              } />

              {/* Catch all route */}
              <Route path="*" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">404 - Page Not Found</h1></div>} />
            </Routes>
          </div>
        </QueryClient>
      </Router>
    </AuthProvider>
  );
}

export default App;
