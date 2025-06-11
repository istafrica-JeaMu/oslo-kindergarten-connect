
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppSidebar } from '@/components/layout/AppSidebar';

// Import existing pages
import DistrictAdminDashboard from '@/pages/district-admin/DistrictAdminDashboard';
import KindergartenManagement from '@/pages/district-admin/KindergartenManagement';
import UserManagement from '@/pages/district-admin/UserManagement';
import PlacementCalendar from '@/pages/district-admin/PlacementCalendar';
import PolicyConfiguration from '@/pages/district-admin/PolicyConfiguration';
import SelfServiceFeatures from '@/pages/district-admin/SelfServiceFeatures';
import Analytics from '@/pages/district-admin/Analytics';
import AuditLogs from '@/pages/district-admin/AuditLogs';
import MunicipalityAdminDashboard from '@/pages/admin/MunicipalityAdminDashboard';

// Create a QueryClient instance
const queryClient = new QueryClient();

// Simple placeholder components for missing pages
const LandingPage = () => <div className="p-8"><h1 className="text-2xl font-bold">Landing Page</h1></div>;
const LoginPage = () => <div className="p-8"><h1 className="text-2xl font-bold">Login Page</h1></div>;

// Simple AppLayout component
const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-screen">
    <div className="w-64 bg-white border-r">
      <AppSidebar />
    </div>
    <div className="flex-1 overflow-auto p-8">
      {children}
    </div>
  </div>
);

// Simple ProtectedRoute component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
  return <>{children}</>;
};

// Placeholder components for missing pages
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold">{title}</h1>
    <p className="text-slate-600 mt-2">This page is under development.</p>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
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
                      <Route index element={<PlaceholderPage title="Guardian Dashboard" />} />
                      <Route path="applications" element={<PlaceholderPage title="Application Dashboard" />} />
                      <Route path="applications/new" element={<PlaceholderPage title="Application Form" />} />
                      <Route path="children" element={<PlaceholderPage title="Children Overview" />} />
                      <Route path="communication" element={<PlaceholderPage title="Communication Center" />} />
                      <Route path="documents" element={<PlaceholderPage title="Document Center" />} />
                      <Route path="payments" element={<PlaceholderPage title="Payment Center" />} />
                    </Routes>
                  </AppLayout>
                </ProtectedRoute>
              } />

              {/* Caseworker Routes */}
              <Route path="/caseworker/*" element={
                <ProtectedRoute allowedRoles={['caseworker']}>
                  <AppLayout>
                    <Routes>
                      <Route index element={<PlaceholderPage title="Caseworker Dashboard" />} />
                      <Route path="applications" element={<PlaceholderPage title="Application Management" />} />
                      <Route path="capacity" element={<PlaceholderPage title="Capacity Management" />} />
                      <Route path="communication" element={<PlaceholderPage title="Communication Hub" />} />
                      <Route path="children" element={<PlaceholderPage title="Child Records" />} />
                      <Route path="reports" element={<PlaceholderPage title="Reports Dashboard" />} />
                    </Routes>
                  </AppLayout>
                </ProtectedRoute>
              } />

              {/* Staff Routes */}
              <Route path="/staff/*" element={
                <ProtectedRoute allowedRoles={['staff']}>
                  <AppLayout>
                    <Routes>
                      <Route index element={<PlaceholderPage title="Staff Dashboard" />} />
                      <Route path="attendance" element={<PlaceholderPage title="Attendance Page" />} />
                      <Route path="children" element={<PlaceholderPage title="Children Page" />} />
                      <Route path="communication" element={<PlaceholderPage title="Communication Page" />} />
                      <Route path="reports" element={<PlaceholderPage title="Reports Page" />} />
                    </Routes>
                  </AppLayout>
                </ProtectedRoute>
              } />

              {/* Partner Routes */}
              <Route path="/partner/*" element={
                <ProtectedRoute allowedRoles={['partner']}>
                  <AppLayout>
                    <Routes>
                      <Route index element={<PlaceholderPage title="Partner Dashboard" />} />
                      <Route path="applications" element={<PlaceholderPage title="Partner Applications" />} />
                      <Route path="capacity" element={<PlaceholderPage title="Partner Capacity" />} />
                      <Route path="finance" element={<PlaceholderPage title="Partner Finance" />} />
                      <Route path="communication" element={<PlaceholderPage title="Partner Communication" />} />
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
                      <Route index element={<PlaceholderPage title="Educator Dashboard" />} />
                      <Route path="attendance" element={<PlaceholderPage title="Attendance Manager" />} />
                      <Route path="activities" element={<PlaceholderPage title="Activity Planning" />} />
                      <Route path="communication" element={<PlaceholderPage title="Parent Communication" />} />
                      <Route path="children" element={<PlaceholderPage title="Child Profiles" />} />
                    </Routes>
                  </AppLayout>
                </ProtectedRoute>
              } />

              {/* Catch all route */}
              <Route path="*" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">404 - Page Not Found</h1></div>} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
