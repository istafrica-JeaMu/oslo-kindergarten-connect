
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { 
  LogOut, 
  User, 
  Settings, 
  Bell, 
  Globe,
  Loader2
} from 'lucide-react';

export function Header() {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Simulate logout delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleLanguageChange = (newLanguage: 'nb' | 'en') => {
    setLanguage(newLanguage);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'caseworker':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'guardian':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'caseworker':
        return 'Case Worker';
      case 'guardian':
        return 'Guardian';
      default:
        return role;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="hover:bg-gray-100 transition-colors" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-oslo-blue rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
              </svg>
            </div>
            <div>
              <h1 className="font-semibold text-gray-900 text-lg">
                Kindergarten Portal
              </h1>
              <p className="text-xs text-gray-600">
                Oslo Municipality
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-10 w-10 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Change language"
              >
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel className="text-xs font-medium text-gray-500">
                Language
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => handleLanguageChange('en')}
                className={language === 'en' ? 'bg-oslo-blue/10 text-oslo-blue' : ''}
              >
                English
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleLanguageChange('nb')}
                className={language === 'nb' ? 'bg-oslo-blue/10 text-oslo-blue' : ''}
              >
                Norwegian
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-10 w-10 rounded-lg hover:bg-gray-100 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-10 pl-3 pr-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-oslo-blue rounded-lg flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-900">
                      {user?.name || 'User'}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs h-5 ${getRoleBadgeColor(user?.role || '')}`}
                    >
                      {getRoleDisplayName(user?.role || '')}
                    </Badge>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex flex-col">
                <span className="font-medium">{user?.name}</span>
                <span className="text-xs text-gray-500 font-normal">
                  {user?.email}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Preferences
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
              >
                {isLoggingOut ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing out...
                  </>
                ) : (
                  <>
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('auth.logout')}
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
