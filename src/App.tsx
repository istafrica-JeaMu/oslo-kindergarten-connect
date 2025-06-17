import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { QueryClient } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import Applications from '@/pages/Applications';
import ApplicationDetails from '@/pages/ApplicationDetails';
import ReviewQueue from '@/pages/caseworker/ReviewQueue';
import PlacementManagement from '@/pages/caseworker/PlacementManagement';
import Messages from '@/pages/Messages';
import Kindergartens from '@/pages/admin/Kindergartens';
import Users from '@/pages/admin/Users';
import PlacementCalendar from '@/pages/admin/PlacementCalendar';
import Policies from '@/pages/admin/Policies';
import SelfService from '@/pages/admin/SelfService';
import Analytics from '@/pages/admin/Analytics';
import AuditLogs from '@/pages/admin/AuditLogs';
import Attendance from '@/pages/educator/Attendance';
import Children from '@/pages/educator/Children';
import Reports from '@/pages/educator/Reports';
import Calendar from '@/pages/educator/Calendar';
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
import Logs from './pages/admin/Logs';

const ProtectedRoute = ({ allowedRoles, children }: { allowedRoles: string[], children: React.ReactNode }) => {
  const auth = localStorage.getItem('auth');
  const user = auth ? JSON.parse(auth) : null;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <QueryClient>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute allowedRoles={['guardian', 'caseworker', 'admin', 'educator', 'staff', 'partner', 'district-admin']}><Dashboard /></ProtectedRoute>} />
              <Route path="/application/:id" element={<ProtectedRoute allowedRoles={['guardian']}><ApplicationDetails /></ProtectedRoute>} />
              
              {/* Caseworker Routes */}
              <Route path="/caseworker" element={<ProtectedRoute allowedRoles={['caseworker']} />}>
                <Route index element={<Dashboard />} />
                <Route path="review-queue" element={<ReviewQueue />} />
                <Route path="placement-management" element={<PlacementManagement />} />
                <Route path="messages" element={<Messages />} />
              </Route>

              {/* Kindergarten Routes */}
              <Route path="/kindergarten" element={<ProtectedRoute allowedRoles={['staff', 'partner']} />}>
                <Route index element={<Dashboard />} />
                <Route path="children" element={<Children />} />
                <Route path="attendance" element={<Attendance />} />
                <Route path="reports" element={<Reports />} />
                <Route path="messages" element={<Messages />} />
                {/* Partner Specific Routes */}
                <Route path="applications" element={<Applications />} />
              </Route>

              {/* Educator Routes */}
               <Route path="/educator" element={<ProtectedRoute allowedRoles={['educator']} />}>
                <Route index element={<Dashboard />} />
                <Route path="attendance" element={<Attendance />} />
                <Route path="children" element={<Children />} />
                <Route path="messages" element={<Messages />} />
                <Route path="reports" element={<Reports />} />
                <Route path="calendar" element={<Calendar />} />
              </Route>

              {/* Guardian Routes */}
              <Route path="/guardian" element={<ProtectedRoute allowedRoles={['guardian']} />}>
                <Route index element={<Dashboard />} />
                <Route path="applications" element={<Applications />} />
              </Route>
              
              {/* District Admin Routes */}
              <Route path="/district-admin" element={<ProtectedRoute allowedRoles={['district-admin']} />}>
                <Route index element={<Dashboard />} />
                <Route path="kindergartens" element={<Kindergartens />} />
                <Route path="users" element={<Users />} />
                <Route path="placement-calendar" element={<PlacementCalendar />} />
                <Route path="policies" element={<Policies />} />
                <Route path="self-service" element={<SelfService />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="audit-logs" element={<AuditLogs />} />
              </Route>
              
              {/* Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route index element={<Dashboard />} />
                <Route path="application-forms" element={<ApplicationForms />} />
                <Route path="approve" element={<Approve />} />
                <Route path="childcare-member" element={<ChildcareMember />} />
                <Route path="debt-management" element={<DebtManagement />} />
                <Route path="guarantee-list" element={<GuaranteeList />} />
                <Route path="manage-childinfo-categories" element={<ManageChildinfoCategories />} />
                <Route path="modified-applications" element={<ModifiedApplications />} />
                <Route path="queue-handling" element={<QueueHandling />} />
                <Route path="queue-exception" element={<QueueException />} />
                <Route path="stay-request-job" element={<StayRequestJob />} />
                <Route path="suggested-admissions" element={<SuggestedAdmissions />} />
                <Route path="unit-children-overview" element={<UnitChildrenOverview />} />
                <Route path="activity-plans" element={<ActivityPlans />} />
                <Route path="parent-teacher-meeting" element={<ParentTeacherMeeting />} />
                <Route path="organization" element={<Organization />} />
                <Route path="schools" element={<Schools />} />
                <Route path="staff" element={<Staff />} />
                <Route path="admissions-management" element={<AdmissionsManagement />} />
                <Route path="person-register" element={<PersonRegister />} />
                <Route path="reports-export" element={<ReportsExport />} />
                <Route path="communications" element={<Communications />} />
                <Route path="settings" element={<Settings />} />
                <Route path="logs" element={<Logs />} />
              </Route>
              
              {/* Default Route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </QueryClient>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
