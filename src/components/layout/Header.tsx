
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import LanguageToggle from '@/components/LanguageToggle';
import { User, LogOut, Settings, GraduationCap } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-200 px-4 bg-white shadow-sm">
      <SidebarTrigger className="-ml-1 text-oslo-blue hover:bg-oslo-blue/10" />
      
      <div className="flex items-center gap-3 ml-2">
        <div className="w-8 h-8 bg-gradient-to-br from-oslo-blue to-blue-700 rounded-lg flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <div className="hidden md:block">
          <h1 className="text-lg font-bold text-oslo-blue">IST Platform</h1>
          <p className="text-xs text-slate-600 -mt-1">Kindergarten Management</p>
        </div>
      </div>
      
      <div className="flex-1" />
      
      <div className="flex items-center gap-4">
        <LanguageToggle />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 text-oslo-blue hover:bg-oslo-blue/10">
              <div className="w-8 h-8 bg-oslo-blue/10 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-oslo-blue" />
              </div>
              <span className="hidden md:inline font-medium">{user?.name}</span>
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
