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
  School,
  UserCheck,
  Shield,
  Eye,
  Globe,
  MapPin,
  Flag,
  Monitor,
  Database,
  Activity,
  Lock,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Baby,
  DollarSign,
  ListChecks,
  BookOpen,
  AlertTriangle,
  Briefcase,
  Building2,
  UserPlus,
  BarChart,
  Mail,
  Cog,
  UserMinus,
  Grid3X3,
  Package
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
import { ScrollArea } from '@/components/ui/scroll-area';
import ApplicationsSidebar from '@/components/caseworker/ApplicationsSidebar';
import { useState, useEffect } from 'react';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

export function AppSidebar() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const guardianNavigation = useGuardianNavigation();
  const [isSystemOverviewOpen, setIsSystemOverviewOpen] = useState(false);
  const [isAdministrationOpen, setIsAdministrationOpen] = useState(false);
  const [isAdmissionsOpen, setIsAdmissionsOpen] = useState(false);
  const [isAccessRightOpen, setIsAccessRightOpen] = useState(false);

  // Set initial state based on current route
  useEffect(() => {
    if (location.pathname.includes('/user-templates')) {
      setIsAccessRightOpen(true);
    }
  }, [location.pathname]);

  const getMenuItems = () => {
    const baseUrl = `/${user?.role}`;
    
    switch (user?.role) {
      case 'guardian':
        return guardianNavigation;
      
      case 'caseworker':
        return [
          {
            title: t('nav.dashboard', 'Dashboard'),
            url: baseUrl,
            icon: Home,
          },
          {
            title: t('nav.reviewQueue', 'Review Queue'),
            url: `${baseUrl}/review-queue`,
            icon: FolderOpen,
          },
          {
            title: t('nav.placementManagement', 'Placement Management'),
            url: `${baseUrl}/placement-management`,
            icon: Users,
          },
          {
            title: t('nav.messages', 'Messages'),
            url: `${baseUrl}/messages`,
            icon: MessageSquare,
          },
        ];
      
      case 'admin':
        return {
          primary: [
            {
              title: t('nav.dashboard', 'Dashboard'),
              url: baseUrl,
              icon: Home,
            }
          ],
          administration: [
            {
              title: 'Application forms',
              url: `${baseUrl}/application-forms`,
              icon: FileText,
            },
            {
              title: 'Approve',
              url: `${baseUrl}/approve`,
              icon: CheckCircle,
            },
            {
              title: 'ChildcareMember',
              url: `${baseUrl}/childcare-member`,
              icon: Baby,
            },
            {
              title: 'Debt management',
              url: `${baseUrl}/debt-management`,
              icon: DollarSign,
            },
            {
              title: 'Guarantee List',
              url: `${baseUrl}/guarantee-list`,
              icon: Shield,
            },
            {
              title: 'Logs',
              url: `${baseUrl}/logs`,
              icon: FileText,
            },
            {
              title: 'Manage childinfo catego...',
              url: `${baseUrl}/manage-childinfo-categories`,
              icon: ListChecks,
            },
            {
              title: 'Modified applications',
              url: `${baseUrl}/modified-applications`,
              icon: FileText,
            },
            {
              title: 'Queue handling',
              url: `${baseUrl}/queue-handling`,
              icon: Clock,
            },
            {
              title: 'Queueexception',
              url: `${baseUrl}/queue-exception`,
              icon: AlertTriangle,
            },
            {
              title: 'Stayrequest job',
              url: `${baseUrl}/stay-request-job`,
              icon: Briefcase,
            },
            {
              title: 'Suggested admissions',
              url: `${baseUrl}/suggested-admissions`,
              icon: UserPlus,
            },
            {
              title: 'Unit children overview',
              url: `${baseUrl}/unit-children-overview`,
              icon: Users,
            },
            {
              title: 'Activity plans',
              url: `${baseUrl}/activity-plans`,
              icon: ClipboardList,
            },
            {
              title: 'Parent teacher meeting',
              url: `${baseUrl}/parent-teacher-meeting`,
              icon: MessageSquare,
            },
            {
              title: 'Organization',
              url: `${baseUrl}/organization`,
              icon: Building2,
            },
            {
              title: 'Schools',
              url: `${baseUrl}/schools`,
              icon: School,
            },
            {
              title: 'Staff',
              url: `${baseUrl}/staff`,
              icon: Users,
            }
          ],
          accessRight: [
            {
              title: 'Roles',
              url: `${baseUrl}/user-templates?tab=roles`,
              icon: UserCheck,
            },
            {
              title: 'Limited Roles',
              url: `${baseUrl}/user-templates?tab=limited-roles`,
              icon: UserMinus,
            },
            {
              title: 'Module Groups',
              url: `${baseUrl}/user-templates?tab=module-groups`,
              icon: Grid3X3,
            },
            {
              title: 'Modules',
              url: `${baseUrl}/user-templates?tab=modules`,
              icon: Package,
            }
          ],
          admissions: [
            {
              title: 'Applications',
              url: `${baseUrl}/applications`,
              icon: FileText,
            },
            {
              title: 'Admissions',
              url: `${baseUrl}/admissions-management`,
              icon: UserCheck,
            },
            {
              title: 'Person register',
              url: `${baseUrl}/person-register`,
              icon: Users,
            },
            {
              title: 'Report & export data',
              url: `${baseUrl}/reports-export`,
              icon: BarChart,
            }
          ],
          other: [
            {
              title: 'Communication',
              url: `${baseUrl}/communications`,
              icon: Mail,
            },
            {
              title: 'Settings',
              url: `${baseUrl}/settings`,
              icon: Cog,
            }
          ]
        };

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
            title: t('nav.dashboard', 'Dashboard'),
            url: baseUrl,
            icon: Home,
          },
          {
            title: 'Kindergarten Management',
            url: `${baseUrl}/kindergartens`,
            icon: School,
          },
          {
            title: 'User Management',
            url: `${baseUrl}/users`,
            icon: UserCheck,
          },
          {
            title: 'Placement Calendar',
            url: `${baseUrl}/placement-calendar`,
            icon: Calendar,
          },
          {
            title: 'Policy Configuration',
            url: `${baseUrl}/policies`,
            icon: Settings,
          },
          {
            title: 'Self-Service Features',
            url: `${baseUrl}/self-service`,
            icon: Shield,
          },
          {
            title: 'Analytics',
            url: `${baseUrl}/analytics`,
            icon: BarChart3,
          },
          {
            title: 'Audit Logs',
            url: `${baseUrl}/audit-logs`,
            icon: Eye,
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
        return 'Municipality Administration';
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

  const isAdminNavigation = (items: any): items is { primary: any[], administration: any, accessRight: any, admissions: any, other: any } => {
    return items && typeof items === 'object' && 'primary' in items && 'administration' in items && 'admissions' in items && 'other' in items && 'accessRight' in items;
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

  const renderAdminNavigation = (items: any) => {
    if (!isAdminNavigation(items)) return null;

    return (
      <>
        {/* Dashboard - Primary Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0">
              {items.primary?.map((item: any) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="rounded-lg hover:bg-oslo-blue/10 data-[active=true]:bg-oslo-blue data-[active=true]:text-white transition-colors duration-200 min-h-[40px]"
                  >
                    <Link to={item.url} className="flex items-center gap-3 px-3 py-1.5">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-2" />

        {/* Administration Dropdown */}
        <SidebarGroup>
          <SidebarGroupContent>
            <Collapsible open={isAdministrationOpen} onOpenChange={setIsAdministrationOpen}>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between hover:bg-slate-100 data-[state=open]:bg-slate-100 transition-colors duration-200 min-h-[40px] rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Settings className="h-4 w-4 text-slate-600" />
                    <span className="font-semibold text-slate-700">Administration</span>
                  </div>
                  {isAdministrationOpen ? (
                    <ChevronDown className="h-4 w-4 text-slate-600" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-slate-600" />
                  )}
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="overflow-hidden">
                <ScrollArea className="h-auto max-h-[60vh]">
                  <div className="space-y-0 ml-2 mt-1 pb-1">
                    <SidebarMenu className="space-y-0">
                      {items.administration?.map((item: any) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton 
                            asChild 
                            isActive={location.pathname === item.url}
                            className="rounded-lg hover:bg-slate-100 data-[active=true]:bg-oslo-blue data-[active=true]:text-white transition-colors duration-200 ml-2 min-h-[32px]"
                          >
                            <Link to={item.url} className="flex items-center gap-3 px-3 py-1">
                              <item.icon className="h-4 w-4 flex-shrink-0" />
                              <span className="font-medium text-sm truncate">{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </div>
                </ScrollArea>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-2" />

        {/* Access Right Dropdown */}
        <SidebarGroup>
          <SidebarGroupContent>
            <Collapsible open={isAccessRightOpen} onOpenChange={setIsAccessRightOpen}>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between hover:bg-slate-100 data-[state=open]:bg-slate-100 transition-colors duration-200 min-h-[40px] rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4 text-slate-600" />
                    <span className="font-semibold text-slate-700">Access Right</span>
                  </div>
                  {isAccessRightOpen ? (
                    <ChevronDown className="h-4 w-4 text-slate-600" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-slate-600" />
                  )}
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="overflow-hidden">
                <div className="space-y-0 ml-2 mt-1 pb-1">
                  <SidebarMenu className="space-y-0">
                    {items.accessRight?.map((item: any) => {
                      const tabParam = new URLSearchParams(item.url.split('?')[1]).get('tab');
                      const currentTab = new URLSearchParams(location.search).get('tab');
                      const isActive = location.pathname.includes('/user-templates') && currentTab === tabParam;
                      
                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton 
                            asChild 
                            isActive={isActive}
                            className="rounded-lg hover:bg-slate-100 data-[active=true]:bg-oslo-blue data-[active=true]:text-white transition-colors duration-200 ml-2 min-h-[32px]"
                          >
                            <Link to={item.url} className="flex items-center gap-3 px-3 py-1">
                              <item.icon className="h-4 w-4 flex-shrink-0" />
                              <span className="font-medium text-sm truncate">{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-2" />

        {/* Admissions Dropdown */}
        <SidebarGroup>
          <SidebarGroupContent>
            <Collapsible open={isAdmissionsOpen} onOpenChange={setIsAdmissionsOpen}>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between hover:bg-slate-100 data-[state=open]:bg-slate-100 transition-colors duration-200 min-h-[40px] rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-slate-600" />
                    <span className="font-semibold text-slate-700">Admissions</span>
                  </div>
                  {isAdmissionsOpen ? (
                    <ChevronDown className="h-4 w-4 text-slate-600" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-slate-600" />
                  )}
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="overflow-hidden">
                <div className="space-y-0 ml-2 mt-1 pb-1">
                  <SidebarMenu className="space-y-0">
                    {items.admissions?.filter((item: any) => !['Person register', 'Report & export data'].includes(item.title)).map((item: any) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          isActive={location.pathname === item.url}
                          className="rounded-lg hover:bg-slate-100 data-[active=true]:bg-oslo-blue data-[active=true]:text-white transition-colors duration-200 ml-2 min-h-[32px]"
                        >
                          <Link to={item.url} className="flex items-center gap-3 px-3 py-1">
                            <item.icon className="h-4 w-4 flex-shrink-0" />
                            <span className="font-medium text-sm truncate">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-2" />

        {/* Standalone Items */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0">
              {/* Person register */}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === '/admin/person-register'}
                  className="rounded-lg hover:bg-slate-100 data-[active=true]:bg-oslo-blue data-[active=true]:text-white transition-colors duration-200 min-h-[40px]"
                >
                  <Link to="/admin/person-register" className="flex items-center gap-3 px-3 py-1.5">
                    <Users className="h-5 w-5 text-slate-600" />
                    <span className="font-medium">Person register</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {/* Report & export data */}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === '/admin/reports-export'}
                  className="rounded-lg hover:bg-slate-100 data-[active=true]:bg-oslo-blue data-[active=true]:text-white transition-colors duration-200 min-h-[40px]"
                >
                  <Link to="/admin/reports-export" className="flex items-center gap-3 px-3 py-1.5">
                    <BarChart className="h-5 w-5 text-slate-600" />
                    <span className="font-medium">Report & export data</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Logs */}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === '/admin/logs'}
                  className="rounded-lg hover:bg-slate-100 data-[active=true]:bg-oslo-blue data-[active=true]:text-white transition-colors duration-200 min-h-[40px]"
                >
                  <Link to="/admin/logs" className="flex items-center gap-3 px-3 py-1.5">
                    <FileText className="h-5 w-5 text-slate-600" />
                    <span className="font-medium">Logs</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Other items */}
              {items.other?.map((item: any) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="rounded-lg hover:bg-slate-100 data-[active=true]:bg-oslo-blue data-[active=true]:text-white transition-colors duration-200 min-h-[40px]"
                  >
                    <Link to={item.url} className="flex items-center gap-3 px-3 py-1.5">
                      <item.icon className="h-5 w-5 text-slate-600" />
                      <span className="font-medium">{item.title}</span>
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

  const renderCaseworkerNavigation = (items: any[]) => (
    <>
      {/* Main Navigation */}
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

      <Separator className="my-3" />

      {/* Applications Section */}
      <SidebarGroup>
        <SidebarGroupContent>
          <ApplicationsSidebar />
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );

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
          : user?.role === 'admin'
          ? renderAdminNavigation(menuItems)
          : user?.role === 'caseworker'
          ? renderCaseworkerNavigation(Array.isArray(menuItems) ? menuItems : [])
          : renderStandardNavigation(Array.isArray(menuItems) ? menuItems : [])}
      </SidebarContent>
    </Sidebar>
  );
}
