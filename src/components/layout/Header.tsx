
import { Bell, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import { AnimatedAvatar } from '@/components/ui/animated-avatar';

const Header = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'guardian':
        return t('roles.guardian');
      case 'caseworker':
        return t('roles.caseworker');
      case 'admin':
        return t('roles.admin');
      default:
        return role;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'guardian':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'caseworker':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'admin':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-oslo-blue">
            {user?.role === 'guardian' && t('header.guardianPortal')}
            {user?.role === 'caseworker' && t('header.caseworkerDashboard')}
            {user?.role === 'admin' && t('header.adminPanel')}
          </h1>
          {user?.district && (
            <Badge variant="outline" className="text-slate-600 border-slate-300">
              {user.district}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-4">
          <LanguageToggle />
          
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 hover:bg-oslo-blue/10">
                <AnimatedAvatar
                  name={user?.name || 'User'}
                  role={user?.role === 'caseworker' ? 'Case Worker' : user?.role || 'Guardian'}
                  size="sm"
                  context="header"
                  enableAnimation={true}
                />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <Badge variant="outline" className={getRoleBadgeColor(user?.role || '')}>
                    {getRoleDisplayName(user?.role || '')}
                  </Badge>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-lg">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>{t('header.profile')}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t('header.logout')}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
