import {
  LayoutDashboard,
  FileText,
  Users,
  CheckCircle,
  Baby,
  CreditCard,
  Shield,
  Tags,
  Edit,
  Clock,
  AlertTriangle,
  Briefcase,
  UserCheck,
  Calendar,
  MessageSquare,
  Building,
  GraduationCap,
  UserSearch,
  Download,
  Mail,
  Settings,
  FileCheck,
  UserMinus,
  Grid3X3,
  Package
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge: string | null;
}

interface MenuSection {
  primary: MenuItem[];
  administration: MenuItem[];
  admissions: MenuItem[];
  other: MenuItem[];
  accessRights: MenuItem[];
}

export function AppSidebar() {
  const { userRole, logout } = useAuth();
  const navigate = useNavigate();

  const getMenuItems = () => {
    switch (userRole) {
      case 'admin':
        return {
          primary: [
            { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, badge: null },
            { name: 'Applications', href: '/admin/applications', icon: FileText, badge: '23' },
            { name: 'Placement Management', href: '/admin/placement-management', icon: Users, badge: null },
            { name: 'Application Forms', href: '/admin/application-forms', icon: FileText, badge: null },
            { name: 'Approve', href: '/admin/approve', icon: CheckCircle, badge: '5' },
            { name: 'Childcare Member', href: '/admin/childcare-member', icon: Baby, badge: null },
            { name: 'Debt Management', href: '/admin/debt-management', icon: CreditCard, badge: '12' },
            { name: 'Guarantee List', href: '/admin/guarantee-list', icon: Shield, badge: null },
            { name: 'Manage Childinfo Categories', href: '/admin/manage-childinfo-categories', icon: Tags, badge: null },
            { name: 'Modified Applications', href: '/admin/modified-applications', icon: Edit, badge: '3' },
            { name: 'Queue Handling', href: '/admin/queue-handling', icon: Clock, badge: '8' },
            { name: 'Queue Exception', href: '/admin/queue-exception', icon: AlertTriangle, badge: '2' },
            { name: 'Stay Request Job', href: '/admin/stay-request-job', icon: Briefcase, badge: null },
            { name: 'Suggested Admissions', href: '/admin/suggested-admissions', icon: UserCheck, badge: '15' },
            { name: 'Unit Children Overview', href: '/admin/unit-children-overview', icon: Users, badge: null },
            { name: 'Activity Plans', href: '/admin/activity-plans', icon: Calendar, badge: null },
            { name: 'Parent Teacher Meeting', href: '/admin/parent-teacher-meeting', icon: MessageSquare, badge: null }
          ],
          administration: [
            { name: 'Organization', href: '/admin/organization', icon: Building, badge: null },
            { name: 'Schools', href: '/admin/schools', icon: GraduationCap, badge: null },
            { name: 'Staff', href: '/admin/staff', icon: UserCheck, badge: null },
            { name: 'Admissions Management', href: '/admin/admissions-management', icon: FileCheck, badge: null },
            { name: 'Person Register', href: '/admin/person-register', icon: UserSearch, badge: null },
            { name: 'Reports Export', href: '/admin/reports-export', icon: Download, badge: null },
            { name: 'Communications', href: '/admin/communications', icon: Mail, badge: null },
            { name: 'Settings', href: '/admin/settings', icon: Settings, badge: null },
            { name: 'Logs', href: '/admin/logs', icon: FileText, badge: null }
          ],
          admissions: [
            { name: 'Applications', href: '/admin/applications', icon: FileText, badge: '23' },
            { name: 'Placement Management', href: '/admin/placement-management', icon: Users, badge: null },
            { name: 'Approve', href: '/admin/approve', icon: CheckCircle, badge: '5' },
            { name: 'Suggested Admissions', href: '/admin/suggested-admissions', icon: UserCheck, badge: '15' }
          ],
          other: [
            { name: 'Activity Plans', href: '/admin/activity-plans', icon: Calendar, badge: null },
            { name: 'Parent Teacher Meeting', href: '/admin/parent-teacher-meeting', icon: MessageSquare, badge: null },
            { name: 'Communications', href: '/admin/communications', icon: Mail, badge: null }
          ],
          accessRights: [
            { name: 'Roles', href: '/admin/user-templates', icon: Users, badge: null },
            { name: 'Limited Roles', href: '/admin/user-templates', icon: UserMinus, badge: null },
            { name: 'Module Groups', href: '/admin/user-templates', icon: Grid3X3, badge: null },
            { name: 'Modules', href: '/admin/user-templates', icon: Package, badge: null }
          ]
        };
        
      case 'caseworker':
        return {
          primary: [
            { name: 'Dashboard', href: '/caseworker', icon: LayoutDashboard, badge: null },
            { name: 'Applications', href: '/admin/applications', icon: FileText, badge: '23' },
          ],
          administration: [],
          admissions: [],
          other: [],
          accessRights: []
        };
      case 'guardian':
        return {
          primary: [
            { name: 'Dashboard', href: '/guardian', icon: LayoutDashboard, badge: null },
          ],
          administration: [],
          admissions: [],
          other: [],
          accessRights: []
        };
      case 'educator':
        return {
          primary: [
            { name: 'Dashboard', href: '/educator', icon: LayoutDashboard, badge: null },
          ],
          administration: [],
          admissions: [],
          other: [],
          accessRights: []
        };
      case 'staff':
      case 'partner':
        return {
          primary: [
            { name: 'Dashboard', href: '/staff', icon: LayoutDashboard, badge: null },
          ],
          administration: [],
          admissions: [],
          other: [],
          accessRights: []
        };
      case 'district-admin':
        return {
          primary: [
            { name: 'Dashboard', href: '/district-admin', icon: LayoutDashboard, badge: null },
          ],
          administration: [],
          admissions: [],
          other: [],
          accessRights: []
        };
      default:
        return { primary: [], administration: [], admissions: [], other: [], accessRights: [] };
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="flex flex-col h-full bg-gray-50 border-r py-4">
      <div className="px-6 mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <div className="flex items-center gap-3">
              <Avatar className="w-9 h-9">
                <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="font-semibold">
                {userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : 'User'}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {
              logout();
              navigate('/login');
            }}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav className="flex-1">
        {menuItems.primary.length > 0 && (
          <div className="mb-4">
            <h3 className="px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Primary
            </h3>
            <ul className="mt-2 space-y-1">
              {menuItems.primary.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name} {item.badge && <span className="ml-auto px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800">{item.badge}</span>}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {menuItems.administration.length > 0 && (
          <div className="mb-4">
            <h3 className="px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Administration
            </h3>
            <ul className="mt-2 space-y-1">
              {menuItems.administration.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name} {item.badge && <span className="ml-auto px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800">{item.badge}</span>}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {menuItems.admissions.length > 0 && (
          <div className="mb-4">
            <h3 className="px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Admissions
            </h3>
            <ul className="mt-2 space-y-1">
              {menuItems.admissions.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name} {item.badge && <span className="ml-auto px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800">{item.badge}</span>}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {menuItems.other.length > 0 && (
          <div className="mb-4">
            <h3 className="px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Other
            </h3>
            <ul className="mt-2 space-y-1">
              {menuItems.other.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name} {item.badge && <span className="ml-auto px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800">{item.badge}</span>}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {menuItems.accessRights.length > 0 && (
          <div className="mb-4">
            <h3 className="px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Access Rights
            </h3>
            <ul className="mt-2 space-y-1">
              {menuItems.accessRights.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name} {item.badge && <span className="ml-auto px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800">{item.badge}</span>}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}
