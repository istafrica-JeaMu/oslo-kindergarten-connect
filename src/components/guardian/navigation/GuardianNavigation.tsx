
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
  FolderOpen
} from 'lucide-react';

export const useGuardianNavigation = () => {
  const { t } = useLanguage();
  
  return {
    primary: [
      {
        title: t('nav.dashboard', 'Dashboard'),
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
        url: '/guardian/attendance-tracking',
        icon: UserCheck,
        description: "Check-in status and absence reporting"
      },
      {
        title: t('nav.messages', 'Messages'),
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
        url: '/guardian/application-status',
        icon: FileText,
        description: "Application status and new applications"
      },
      {
        title: 'Child Profile',
        url: '/guardian/living-arrangements',
        icon: User,
        description: "Living arrangements and pickup settings"
      },
      {
        title: t('nav.payments', 'Payments'),
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
    ]
  };
};
