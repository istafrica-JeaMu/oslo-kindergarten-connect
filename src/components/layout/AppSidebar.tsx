import {
  Home,
  FileText,
  Clock,
  MessageSquare,
  CreditCard,
  Users,
  Settings,
  BarChart3,
  FolderOpen,
  GraduationCap,
  ClipboardList,
  Calendar
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';

import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useLocation } from 'react-router-dom';
import { useGuardianNavigation } from '@/components/guardian/navigation/GuardianNavigation';

export function AppSidebar() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const guardianNavItems = useGuardianNavigation();

  const getMenuItems = () => {
    const baseUrl = `/${user?.role}`;
    
    switch (user?.role) {
      case 'guardian':
        return guardianNavItems;
      
      case 'caseworker':
        return [
          {
            title: t('nav.dashboard'),
            url: baseUrl,
            icon: Home,
          },
          {
            title: t('nav.reviewQueue'),
            url: `${baseUrl}/review-queue`,
            icon: FolderOpen,
          },
          {
            title: t('nav.placementManagement'),
            url: `${baseUrl}/placement-management`,
            icon: Users,
          },
          {
            title: t('nav.messages'),
            url: `${baseUrl}/messages`,
            icon: MessageSquare,
          },
        ];
      
      case 'admin':
        return [
          {
            title: t('nav.dashboard'),
            url: baseUrl,
            icon: Home,
          },
          {
            title: t('nav.reports'),
            url: `${baseUrl}/reports`,
            icon: BarChart3,
          },
          {
            title: t('nav.settings'),
            url: `${baseUrl}/settings`,
            icon: Settings,
          },
        ];

      case 'educator':
        return [
          {
            title: 'Dashboard',
            url: baseUrl,
            icon: Home,
          },
          {
            title: 'Daily Attendance',
            url: `${baseUrl}/attendance`,
            icon: ClipboardList,
          },
          {
            title: 'Children',
            url: `${baseUrl}/children`,
            icon: Users,
          },
          {
            title: 'Messages',
            url: `${baseUrl}/messages`,
            icon: MessageSquare,
          },
          {
            title: 'Reports',
            url: `${baseUrl}/reports`,
            icon: BarChart3,
          },
          {
            title: 'Calendar',
            url: `${baseUrl}/calendar`,
            icon: Calendar,
          },
        ];

      case 'staff':
      case 'partner':
        return [
          {
            title: 'Dashboard',
            url: '/kindergarten',
            icon: Home,
          },
          {
            title: 'Children',
            url: '/kindergarten/children',
            icon: Users,
          },
          {
            title: 'Attendance',
            url: '/kindergarten/attendance',
            icon: Clock,
          },
          {
            title: 'Reports',
            url: '/kindergarten/reports',
            icon: BarChart3,
          },
          {
            title: 'Messages',
            url: '/kindergarten/messages',
            icon: MessageSquare,
          },
          ...(user?.role === 'partner' ? [
            {
              title: 'Applications',
              url: '/kindergarten/applications',
              icon: FileText,
            },
            {
              title: 'Capacity',
              url: '/kindergarten/capacity',
              icon: Settings,
            }
          ] : [])
        ];

      case 'district-admin':
        return [
          {
            title: t('nav.dashboard'),
            url: baseUrl,
            icon: Home,
          },
        ];
      
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  const getSidebarTitle = () => {
    switch (user?.role) {
      case 'guardian':
        return 'Guardian Portal';
      case 'caseworker':
        return 'Case Worker Dashboard';
      case 'admin':
        return 'Administrator Panel';
      case 'educator':
        return 'Educator Portal';
      case 'staff':
        return 'Public Kindergarten';
      case 'partner':
        return 'Private Kindergarten';
      case 'district-admin':
        return 'District Administration';
      default:
        return 'Platform';
    }
  };

  return (
    <Sidebar className="border-r border-slate-200 bg-white">
      <SidebarHeader className="border-b border-slate-200 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-oslo-blue to-blue-700 rounded-xl flex items-center justify-center shadow-md">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-oslo-blue">IST Platform</h2>
            <p className="text-xs text-slate-600 -mt-1">Oslo Municipality</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-oslo-blue font-semibold text-sm mb-3 px-3">
            {getSidebarTitle()}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="rounded-lg hover:bg-oslo-blue/10 data-[active=true]:bg-oslo-blue data-[active=true]:text-white transition-colors duration-200"
                  >
                    <Link to={item.url} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
