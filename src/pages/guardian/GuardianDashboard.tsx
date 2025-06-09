
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TodaysStatusCard from '@/components/guardian/TodaysStatusCard';
import NoticeBoardPreviewCard from '@/components/guardian/NoticeBoardPreviewCard';
import QuickActionsCard from '@/components/guardian/QuickActionsCard';
import ApplicationsSummaryCard from '@/components/guardian/ApplicationsSummaryCard';
import WelcomeHeader from '@/components/guardian/WelcomeHeader';
import RecentMessages from '@/components/guardian/RecentMessages';

const GuardianDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Mock data for demonstration
  const messages = [
    {
      id: 1,
      from: 'Løvenskiold Kindergarten',
      subject: 'Welcome to our kindergarten',
      date: '2024-03-18',
      unread: true,
      type: 'welcome'
    },
    {
      id: 2,
      from: 'Oslo Municipality',
      subject: 'Application status update',
      date: '2024-03-16',
      unread: false,
      type: 'update'
    }
  ];

  const handleNewApplication = () => {
    navigate('/guardian/new-application');
  };

  if (isLoading) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div className="space-y-4">
            <Skeleton className="h-12 w-96 bg-gradient-to-r from-slate-200 to-slate-300" />
            <Skeleton className="h-6 w-80 bg-gradient-to-r from-slate-200 to-slate-300" />
            <Skeleton className="h-5 w-32 bg-gradient-to-r from-slate-200 to-slate-300" />
          </div>
          <Skeleton className="h-14 w-48 bg-gradient-to-r from-oslo-blue/20 to-blue-300/20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="xl:col-span-4">
              <Skeleton className="h-80 w-full rounded-xl" />
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Skeleton className="h-96 w-full rounded-xl" />
            <Skeleton className="h-96 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Enhanced Header Section */}
      <WelcomeHeader 
        userName={user?.name} 
        onNewApplication={handleNewApplication} 
      />

      {/* Priority Cards - Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6">
        {/* Today's Status */}
        <div className="xl:col-span-3">
          <TodaysStatusCard />
        </div>
        
        {/* Quick Actions */}
        <div className="xl:col-span-3">
          <QuickActionsCard />
        </div>
        
        {/* Notice Board - Takes remaining space on xl screens */}
        <div className="md:col-span-2 xl:col-span-6">
          <NoticeBoardPreviewCard />
        </div>
      </div>

      {/* Secondary Priority Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Applications Summary */}
        <ApplicationsSummaryCard />

        {/* Recent Messages */}
        <RecentMessages messages={messages} />
      </div>
    </div>
  );
};

export default GuardianDashboard;
