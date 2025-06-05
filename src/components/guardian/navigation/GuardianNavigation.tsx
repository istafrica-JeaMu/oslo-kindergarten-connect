
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Home,
  FileText,
  Clock,
  MessageSquare,
  CreditCard,
  Calendar,
  UserCheck,
  MapPin,
  Users,
  BookOpen,
  FileCheck,
  FolderOpen,
  CheckCircle,
  HouseIcon,
  Flag,
  MessageCircle,
  Image
} from 'lucide-react';

export const useGuardianNavigation = () => {
  const { t } = useLanguage();
  
  return [
    {
      title: t('nav.dashboard'),
      url: '/guardian',
      icon: Home,
    },
    {
      title: t('nav.newApplication'),
      url: '/guardian/new-application',
      icon: FileText,
    },
    {
      title: t('nav.applicationStatus'),
      url: '/guardian/application-status',
      icon: Clock,
    },
    {
      title: t('nav.dailySchedule'),
      url: '/guardian/daily-schedule',
      icon: Calendar,
      description: t('guardian.dailySchedule.description'),
    },
    {
      title: t('nav.absence'),
      url: '/guardian/absence',
      icon: UserCheck,
      description: t('guardian.absence.description'),
    },
    {
      title: t('nav.attendance'),
      url: '/guardian/attendance',
      icon: CheckCircle,
      description: t('guardian.attendance.description'),
    },
    {
      title: t('nav.location'),
      url: '/guardian/location',
      icon: MapPin,
      description: t('guardian.location.description'),
    },
    {
      title: t('nav.pickup'),
      url: '/guardian/pickup',
      icon: Users,
      description: t('guardian.pickup.description'),
    },
    {
      title: t('nav.livingArrangements'),
      url: '/guardian/living-arrangements',
      icon: HouseIcon,
      description: 'Administrer bosted',
    },
    {
      title: t('nav.holidayRegistration'),
      url: '/guardian/holiday-registration',
      icon: Flag,
      description: 'Registrer ferier',
    },
    {
      title: t('nav.messages'),
      url: '/guardian/messages',
      icon: MessageSquare,
    },
    {
      title: t('nav.meetings'),
      url: '/guardian/meetings',
      icon: BookOpen,
      description: 'Book lærersamtaler',
    },
    {
      title: t('nav.noticeBoard'),
      url: '/guardian/notice-board',
      icon: Image,
      description: 'Se bilder og planer',
    },
    {
      title: t('nav.consents'),
      url: '/guardian/consents',
      icon: FileCheck,
      description: 'Håndter samtykker',
    },
    {
      title: t('nav.documents'),
      url: '/guardian/documents',
      icon: FolderOpen,
      description: 'Offisielle dokumenter',
    },
    {
      title: t('nav.payments'),
      url: '/guardian/payments',
      icon: CreditCard,
    },
  ];
};
