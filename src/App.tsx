
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
import NotFound from "./pages/NotFound";
import './i18n';

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

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
