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
  Calendar,
  AlertCircle,
  ClipboardCheck,
  UserCheck,
  Plus,
  Zap,
  Search
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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export function AppSidebar() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const guardianNavigation = useGuardianNavigation();

  const getMenuItems = () => {
    const baseUrl = `/${user?.role}`;
    
    switch (user?.role) {
      case 'guardian':
        return guardianNavigation;
      
      case 'caseworker':
        return {
          primary: [
            {
              title: t('nav.dashboard'),
              url: baseUrl,
              icon: Home,
              description: 'Overview and daily tasks'
            },
            {
              title: 'Applications',
              url: `${baseUrl}/applications/in-progress`,
              icon: ClipboardCheck,
              description: 'Manage all applications',
              badge: 56,
              badgeVariant: 'default'
            },
            {
              title: t('nav.reviewQueue'),
              url: `${baseUrl}/review-queue`,
              icon: FolderOpen,
              description: 'Pending reviews',
              badge: 23,
              badgeVariant: 'destructive'
            },
            {
              title: t('nav.placementManagement'),
              url: `${baseUrl}/placement-management`,
              icon: Users,
              description: 'Manage placements',
              badge: 8
            }
          ],
          secondary: [
            {
              title: t('nav.messages'),
              url: `${baseUrl}/messages`,
              icon: MessageSquare,
              badge: 12
            },
            {
              title: 'Reports',
              url: `${baseUrl}/reports`,
              icon: BarChart3
            }
          ],
          quickActions: [
            {
              title: 'New Manual Application',
              url: `${baseUrl}/manual-application`,
              icon: Plus,
              description: 'For guardians without e-ID',
              isHighlight: true
            },
            {
              title: 'Quick Search',
              url: `${baseUrl}/search`,
              icon: Search,
              description: 'Find applications quickly'
            }
          ],
          applications: [
            {
              title: 'In Progress',
              url: `${baseUrl}/applications/in-progress`,
              icon: Clock,
              badge: 8,
              badgeColor: 'bg-blue-500'
            },
            {
              title: 'Submitted',
              url: `${baseUrl}/applications/submitted`,
              icon: ClipboardCheck,
              badge: 45,
              badgeColor: 'bg-green-500'
            },
            {
              title: 'Needs Follow-up',
              url: `${baseUrl}/applications/follow-up`,
              icon: AlertCircle,
              badge: 3,
              badgeColor: 'bg-red-500'
            }
          ]
        };
      
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

  const isGuardianNavigation = (items: any): items is { primary: any[], secondary: any[] } => {
    return items && typeof items === 'object' && 'primary' in items && 'secondary' in items;
  };

  const isCaseworkerNavigation = (items: any): items is { primary: any[], secondary: any[], quickActions: any[], applications: any[] } => {
    return items && typeof items === 'object' && 'primary' in items && 'quickActions' in items;
  };

  const renderGuardianNavigation = () => {
    const guardianMenuItems = guardianNavigation;
    
    if (!isGuardianNavigation(guardianMenuItems)) return null;

    return (
      <>
        {/* Primary Navigation - Daily Essentials */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-oslo-blue font-semibold text-xs mb-2 px-3">
            Daily Essentials
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {guardianMenuItems.primary?.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="rounded-lg hover:bg-oslo-blue/10 data-[active=true]:bg-oslo-blue data-[active=true]:text-white transition-colors duration-200 min-h-[52px]"
                  >
                    <Link to={item.url} className="flex items-center gap-3 px-3 py-2 w-full">
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-sm block">{item.title}</span>
                        {item.description && (
                          <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                        )}
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-3" />

        {/* Secondary Navigation - Administrative */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-600 font-medium text-xs mb-2 px-3">
            Administrative
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {guardianMenuItems.secondary?.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="rounded-lg hover:bg-slate-100 data-[active=true]:bg-slate-200 data-[active=true]:text-slate-900 transition-colors duration-200 min-h-[44px]"
                  >
                    <Link to={item.url} className="flex items-center gap-3 px-3 py-2 w-full">
                      <item.icon className="h-4 w-4 text-slate-600 flex-shrink-0" />
                      <span className="font-medium text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </>
    );
  };

  const renderCaseworkerNavigation = (items: any) => {
    if (!isCaseworkerNavigation(items)) return null;

    return (
      <>
        {/* Quick Actions Section */}
        <SidebarGroup className="mb-2">
          <SidebarGroupLabel className="text-oslo-blue font-semibold text-xs mb-3 px-3 flex items-center gap-2">
            <Zap className="h-3 w-3" />
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.quickActions?.map((action) => (
                <SidebarMenuItem key={action.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === action.url}
                    className={`rounded-lg transition-all duration-200 min-h-[48px] ${
                      action.isHighlight 
                        ? 'bg-gradient-to-r from-oslo-blue/10 to-blue-50 border border-oslo-blue/20 hover:from-oslo-blue/20 hover:to-blue-100 data-[active=true]:from-oslo-blue data-[active=true]:to-blue-600 data-[active=true]:text-white font-medium' 
                        : 'hover:bg-slate-100 data-[active=true]:bg-oslo-blue data-[active=true]:text-white'
                    }`}
                  >
                    <Link to={action.url} className="flex items-center gap-3 px-3 py-2 w-full">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        action.isHighlight ? 'bg-oslo-blue text-white shadow-md' : 'bg-slate-100'
                      }`}>
                        <action.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-sm block">{action.title}</span>
                        {action.description && (
                          <p className="text-xs text-slate-500 mt-0.5 truncate">{action.description}</p>
                        )}
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-4" />

        {/* Main Navigation */}
        <SidebarGroup className="mb-2">
          <SidebarGroupLabel className="text-oslo-blue font-semibold text-xs mb-3 px-3">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.primary?.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="rounded-lg hover:bg-oslo-blue/10 data-[active=true]:bg-oslo-blue data-[active=true]:text-white transition-colors duration-200 min-h-[52px]"
                  >
                    <Link to={item.url} className="flex items-center gap-3 px-3 py-2 w-full">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-sm block">{item.title}</span>
                        {item.description && (
                          <p className="text-xs text-slate-500 mt-0.5 truncate">{item.description}</p>
                        )}
                      </div>
                      {item.badge && (
                        <Badge 
                          variant={item.badgeVariant || "secondary"}
                          className="ml-2 font-bold text-xs min-w-[20px] h-5 flex items-center justify-center"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-4" />

        {/* Application Types */}
        <SidebarGroup className="mb-2">
          <SidebarGroupLabel className="text-slate-600 font-medium text-xs mb-3 px-3">
            Application Status
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.applications?.map((app) => (
                <SidebarMenuItem key={app.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === app.url}
                    className="rounded-lg hover:bg-slate-100 data-[active=true]:bg-slate-200 data-[active=true]:text-slate-900 transition-colors duration-200 min-h-[44px]"
                  >
                    <Link to={app.url} className="flex items-center gap-3 px-3 py-2 w-full">
                      <app.icon className="h-4 w-4 text-slate-600 flex-shrink-0" />
                      <span className="font-medium text-sm flex-1">{app.title}</span>
                      {app.badge && (
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${app.badgeColor || 'bg-slate-500'}`}>
                          {app.badge}
                        </div>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-4" />

        {/* Secondary Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-600 font-medium text-xs mb-3 px-3">
            Tools & Communication
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.secondary?.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="rounded-lg hover:bg-slate-100 data-[active=true]:bg-slate-200 data-[active=true]:text-slate-900 transition-colors duration-200 min-h-[44px]"
                  >
                    <Link to={item.url} className="flex items-center gap-3 px-3 py-2 w-full">
                      <item.icon className="h-4 w-4 text-slate-600 flex-shrink-0" />
                      <span className="font-medium text-sm flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge variant="outline" className="ml-2 font-semibold text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </>
    );
  };

  const renderStandardNavigation = (items: any[]) => (
    <SidebarGroup>
      <SidebarGroupLabel className="text-oslo-blue font-semibold text-sm mb-3 px-3">
        {getSidebarTitle()}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-1">
          {items.map((item) => (
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
  );

  return (
    <Sidebar className="border-r border-slate-200 bg-white">
      <SidebarHeader className="border-b border-slate-200 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-oslo-blue to-blue-700 rounded-xl flex items-center justify-center shadow-md">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold text-oslo-blue truncate">IST Platform</h2>
            <p className="text-xs text-slate-600 -mt-1 truncate">Oslo Municipality</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        {user?.role === 'guardian' 
          ? renderGuardianNavigation() 
          : user?.role === 'caseworker'
          ? renderCaseworkerNavigation(menuItems)
          : renderStandardNavigation(Array.isArray(menuItems) ? menuItems : [])}
      </SidebarContent>
    </Sidebar>
  );
}
