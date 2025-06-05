
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
      title: 'Dagsplan',
      url: '/guardian/daily-schedule',
      icon: Calendar,
      description: 'Daglig timeplan',
    },
    {
      title: 'Fravær',
      url: '/guardian/absence',
      icon: UserCheck,
      description: 'Rapporter fravær',
    },
    {
      title: 'Oppmøte',
      url: '/guardian/attendance',
      icon: CheckCircle,
      description: 'Se sjekk inn/ut',
    },
    {
      title: 'Plassering',
      url: '/guardian/location',
      icon: MapPin,
      description: 'Hvor er barnet',
    },
    {
      title: 'Henting',
      url: '/guardian/pickup',
      icon: Users,
      description: 'Administrer henting',
    },
    {
      title: 'Boordning',
      url: '/guardian/living-arrangements',
      icon: HouseIcon,
      description: 'Administrer bosted',
    },
    {
      title: 'Ferieplaner',
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
      title: 'Møter',
      url: '/guardian/meetings',
      icon: BookOpen,
      description: 'Book lærersamtaler',
    },
    {
      title: 'Oppslagstavle',
      url: '/guardian/notice-board',
      icon: Image,
      description: 'Se bilder og planer',
    },
    {
      title: 'Samtykker',
      url: '/guardian/consents',
      icon: FileCheck,
      description: 'Håndter samtykker',
    },
    {
      title: 'Dokumenter',
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
