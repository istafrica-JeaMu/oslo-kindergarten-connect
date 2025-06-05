
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import LanguageToggle from '@/components/LanguageToggle';
import { User, LogOut, Settings, GraduationCap, CheckCircle, Shield } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();

  const getRoleLabel = (role?: string) => {
    switch(role) {
      case 'guardian': return 'Guardian';
      case 'caseworker': return 'Case Worker';
      case 'admin': return 'Administrator';
      case 'staff': return 'Public Kindergarten Staff';
      case 'partner': return 'Private Kindergarten Staff';
      case 'district-admin': return 'District Administrator';
      default: return '';
    }
  };

  const getRoleSpecificContent = () => {
    if (user?.role === 'caseworker') {
      return {
        title: `Welcome, ${user?.name}`,
        subtitle: 'Case Worker Dashboard',
        description: 'Manage applications and support families in their kindergarten journey',
        badges: [
          { 
            text: user?.district || 'Oslo District', 
            variant: 'default' as const,
            icon: <GraduationCap className="w-3 h-3 mr-1" />,
            className: 'bg-gradient-to-r from-oslo-blue to-blue-600 text-white border-0 shadow-md'
          },
          { 
            text: 'Active Session', 
            variant: 'default' as const,
            icon: <CheckCircle className="w-3 h-3 mr-1" />,
            className: 'bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-md'
          },
          { 
            text: 'Certified', 
            variant: 'outline' as const,
            icon: <Shield className="w-3 h-3 mr-1" />,
            className: 'border-oslo-blue/30 text-oslo-blue bg-oslo-blue/5 backdrop-blur-sm'
          }
        ]
      };
    }
    
    // Default for other roles
    return {
      title: `Welcome, ${user?.name}`,
      subtitle: 'Dashboard',
      description: 'Manage your account and access services',
      badges: [
        { 
          text: user?.district || 'Oslo District', 
          variant: 'outline' as const,
          className: 'text-oslo-blue border-oslo-blue/30 bg-white/10 backdrop-blur-sm'
        }
      ]
    };
  };

  const content = getRoleSpecificContent();

  return (
    <header className="flex h-20 shrink-0 items-center gap-2 border-b border-slate-200 px-4 bg-gradient-to-r from-white via-white to-oslo-blue/5 shadow-sm">
      <SidebarTrigger className="-ml-1 text-oslo-blue hover:bg-oslo-blue/10" />
      
      <div className="flex items-center gap-4 ml-2">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-oslo-blue to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          {user?.role === 'caseworker' && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-md">
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        <div className="hidden md:block">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl font-bold text-oslo-blue leading-none">{content.title}</h1>
            <div className="flex items-center gap-2">
              {content.badges.map((badge, index) => (
                <Badge 
                  key={index} 
                  variant={badge.variant}
                  className={`text-xs font-semibold shadow-sm ${badge.className || ''}`}
                >
                  {badge.icon}
                  {badge.text}
                </Badge>
              ))}
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-tight">{content.description}</p>
        </div>
      </div>
      
      <div className="flex-1" />
      
      <div className="flex items-center gap-4">
        <LanguageToggle />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 text-oslo-blue hover:bg-oslo-blue/10 h-12">
              <div className="w-9 h-9 bg-gradient-to-br from-oslo-blue/10 to-oslo-blue/20 rounded-full flex items-center justify-center shadow-sm">
                <User className="h-5 w-5 text-oslo-blue" />
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="font-semibold text-sm leading-tight">{user?.name}</span>
                <span className="text-xs text-slate-600">{getRoleLabel(user?.role)}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white border border-slate-200 shadow-lg z-50 rounded-lg">
            <DropdownMenuItem className="gap-2 cursor-pointer hover:bg-oslo-blue/5 rounded-md">
              <Settings className="h-4 w-4 text-slate-600" />
              <span className="text-slate-700">Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={logout}
              className="gap-2 cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
