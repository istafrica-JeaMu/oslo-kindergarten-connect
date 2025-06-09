
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Home,
  Calendar,
  UserCheck,
  MessageSquare,
  Image,
  FileText,
  User,
  CreditCard,
  FolderOpen,
  AlertCircle,
  Phone
} from 'lucide-react';

export const useGuardianNavigation = () => {
  const { t } = useLanguage();
  
  return {
    primary: [
      {
        title: t('nav.dashboard'),
        url: '/guardian',
        icon: Home,
        description: "Overview of today's activities"
      },
      {
        title: 'Daily Schedule',
        url: '/guardian/daily-schedule',
        icon: Calendar,
        description: "Today's timetable and activities"
      },
      {
        title: 'Attendance',
        url: '/guardian/attendance',
        icon: UserCheck,
        description: "Check-in status and absence reporting"
      },
      {
        title: t('nav.messages'),
        url: '/guardian/messages',
        icon: MessageSquare,
        description: "Chat with teachers and staff"
      },
      {
        title: 'Notice Board',
        url: '/guardian/notice-board',
        icon: Image,
        description: "Latest posts and announcements"
      }
    ],
    secondary: [
      {
        title: 'Applications',
        url: '/guardian/applications',
        icon: FileText,
        description: "New applications and status tracking"
      },
      {
        title: 'Child Profile',
        url: '/guardian/child-profile',
        icon: User,
        description: "Living arrangements and pickup settings"
      },
      {
        title: t('nav.payments'),
        url: '/guardian/payments',
        icon: CreditCard,
        description: "Billing and payment status"
      },
      {
        title: 'Documents',
        url: '/guardian/documents',
        icon: FolderOpen,
        description: "Consents and important documents"
      }
    ],
    quickActions: [
      {
        title: 'Report Absence',
        url: '/guardian/absence',
        icon: AlertCircle,
        urgent: true,
        description: "Quick absence reporting"
      },
      {
        title: 'Emergency Contact',
        url: '/guardian/emergency',
        icon: Phone,
        urgent: true,
        description: "Emergency contact information"
      }
    ]
  };
};
