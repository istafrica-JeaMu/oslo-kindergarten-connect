
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LogOut, Globe } from 'lucide-react';

export const Header = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="border-b bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <img 
              src="/oslo-logo.svg" 
              alt="Oslo Kommune" 
              className="h-8 w-8"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <h1 className="text-xl font-semibold text-oslo-blue">
              Barnehage Oslo
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Select value={language} onValueChange={(value: 'nb' | 'en') => setLanguage(value)}>
            <SelectTrigger className="w-32">
              <Globe className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nb">Norsk</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">{user?.name}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500 capitalize">{user?.role}</span>
          </div>

          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            {t('auth.logout')}
          </Button>
        </div>
      </div>
    </header>
  );
};
