import {
  LayoutDashboard,
  Settings,
  Globe,
  FileShield,
  MapPin,
  UserCheck,
  Shield,
  School,
  Database,
  Calendar,
  BarChart3,
  Eye,
  Server,
  FileText,
  Users,
  Building2,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  LogOut
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useAuth } from "@/contexts/AuthContext"
import { NavLink } from "react-router-dom"

interface NavItem {
  title: string
  url: string
  icon: any
}

interface NavSection {
  title: string
  items: NavItem[]
}

export function AppSidebar() {
  const { user, logout } = useAuth();

  const getNavigationItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          {
            title: "System Overview",
            items: [
              { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
              { title: "System Health", url: "/admin/system-health", icon: Server },
              { title: "System Analytics", url: "/admin/analytics", icon: BarChart3 }
            ]
          },
          {
            title: "Configuration",
            items: [
              { title: "Global Settings", url: "/admin/global-settings", icon: Settings },
              { title: "Feature Management", url: "/admin/feature-management", icon: Globe },
              { title: "Policy Configuration", url: "/admin/policy-config", icon: FileShield },
              { title: "Placement Windows", url: "/admin/placement-windows", icon: Calendar }
            ]
          },
          {
            title: "Management",
            items: [
              { title: "District Oversight", url: "/admin/districts", icon: MapPin },
              { title: "Municipality Users", url: "/admin/users", icon: UserCheck },
              { title: "Role Templates", url: "/admin/role-templates", icon: Shield },
              { title: "Kindergarten Registry", url: "/admin/kindergarten-registry", icon: School }
            ]
          },
          {
            title: "Integration & Security",
            items: [
              { title: "Data Integration", url: "/admin/integrations", icon: Database },
              { title: "Security & Audit", url: "/admin/security-audit", icon: Eye },
              { title: "Compliance", url: "/admin/compliance", icon: FileShield }
            ]
          }
        ];

      case 'guardian':
        return [
          {
            title: "Guardian Portal",
            items: [
              { title: "Dashboard", url: "/guardian", icon: LayoutDashboard },
              { title: "Applications", url: "/guardian/applications", icon: FileText },
              { title: "Children", url: "/guardian/children", icon: Users },
              { title: "Communication", url: "/guardian/communication", icon: Building2 },
              { title: "Documents", url: "/guardian/documents", icon: FileText },
              { title: "Payments", url: "/guardian/payments", icon: Clock }
            ]
          }
        ];

      case 'caseworker':
        return [
          {
            title: "Caseworker Dashboard",
            items: [
              { title: "Dashboard", url: "/caseworker", icon: LayoutDashboard },
              { title: "Applications", url: "/caseworker/applications", icon: FileText },
              { title: "Capacity", url: "/caseworker/capacity", icon: CheckCircle },
              { title: "Communication", url: "/caseworker/communication", icon: Building2 },
              { title: "Children", url: "/caseworker/children", icon: Users },
              { title: "Reports", url: "/caseworker/reports", icon: FileText }
            ]
          }
        ];

      case 'staff':
        return [
          {
            title: "Staff Portal",
            items: [
              { title: "Dashboard", url: "/staff", icon: LayoutDashboard },
              { title: "Attendance", url: "/staff/attendance", icon: Clock },
              { title: "Children", url: "/staff/children", icon: Users },
              { title: "Communication", url: "/staff/communication", icon: Building2 },
              { title: "Reports", url: "/staff/reports", icon: FileText }
            ]
          }
        ];

      case 'partner':
        return [
          {
            title: "Partner Portal",
            items: [
              { title: "Dashboard", url: "/partner", icon: LayoutDashboard },
              { title: "Applications", url: "/partner/applications", icon: FileText },
              { title: "Capacity", url: "/partner/capacity", icon: CheckCircle },
              { title: "Finance", url: "/partner/finance", icon: Clock },
              { title: "Communication", url: "/partner/communication", icon: Building2 }
            ]
          }
        ];

      case 'district-admin':
        return [
          {
            title: "District Administration",
            items: [
              { title: "Dashboard", url: "/district-admin", icon: LayoutDashboard },
              { title: "Kindergartens", url: "/district-admin/kindergartens", icon: School },
              { title: "Users", url: "/district-admin/users", icon: Users },
              { title: "Placement Calendar", url: "/district-admin/placement-calendar", icon: Calendar },
              { title: "Policies", url: "/district-admin/policies", icon: FileText },
              { title: "Self-Service", url: "/district-admin/self-service", icon: Settings },
              { title: "Analytics", url: "/district-admin/analytics", icon: BarChart3 },
              { title: "Audit Logs", url: "/district-admin/audit-logs", icon: Eye }
            ]
          }
        ];

      case 'educator':
        return [
          {
            title: "Educator Portal",
            items: [
              { title: "Dashboard", url: "/educator", icon: LayoutDashboard },
              { title: "Attendance", url: "/educator/attendance", icon: Clock },
              { title: "Activities", url: "/educator/activities", icon: Calendar },
              { title: "Communication", url: "/educator/communication", icon: Building2 },
              { title: "Children", url: "/educator/children", icon: Users }
            ]
          }
        ];

      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="flex flex-col h-full space-y-4 py-4">
      <div className="px-3 py-2 text-center">
        <h1 className="font-bold text-lg">Kindergarten System</h1>
        <p className="text-sm text-muted-foreground">
          {user?.name} ({user?.role})
        </p>
      </div>
      <div className="flex-1">
        {navigationItems.map((section, index) => (
          <Accordion type="single" collapsible className="w-full" key={index}>
            <AccordionItem value={`section-${index}`}>
              <AccordionTrigger className="px-3 py-2 font-medium hover:underline">
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                <nav className="grid gap-1">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.title}
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary hover:text-secondary-foreground ${
                          isActive ? "bg-secondary text-secondary-foreground font-medium" : "text-muted-foreground"
                        }`
                      }
                    >
                      <item.icon className="w-4 h-4" />
                      {item.title}
                    </NavLink>
                  ))}
                </nav>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
      <div className="p-3">
        <button
          onClick={logout}
          className="w-full rounded-md bg-red-500 text-white px-4 py-2 hover:bg-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2 inline-block" />
          Logout
        </button>
      </div>
    </div>
  );
}
