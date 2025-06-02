
import {
  Home,
  FileText,
  Clock,
  MessageSquare,
  CreditCard,
  Users,
  Settings,
  BarChart3,
  FolderOpen
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
} from '@/components/ui/sidebar';

import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useLocation } from 'react-router-dom';

export function AppSidebar() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  const getMenuItems = () => {
    const baseUrl = `/${user?.role}`;
    
    switch (user?.role) {
      case 'guardian':
        return [
          {
            title: t('nav.dashboard'),
            url: baseUrl,
            icon: Home,
          },
          {
            title: t('nav.newApplication'),
            url: `${baseUrl}/new-application`,
            icon: FileText,
          },
          {
            title: t('nav.applicationStatus'),
            url: `${baseUrl}/application-status`,
            icon: Clock,
          },
          {
            title: t('nav.messages'),
            url: `${baseUrl}/messages`,
            icon: MessageSquare,
          },
          {
            title: t('nav.payments'),
            url: `${baseUrl}/payments`,
            icon: CreditCard,
          },
        ];
      
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
      
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar className="border-r bg-white">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-oslo-blue font-semibold">
            {user?.role === 'guardian' && 'Foresatte'}
            {user?.role === 'caseworker' && 'Saksbehandler'}
            {user?.role === 'admin' && 'Administrator'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
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
