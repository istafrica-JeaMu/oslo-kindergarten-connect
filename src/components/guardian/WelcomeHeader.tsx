
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, GraduationCap, CheckCircle, Shield, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface WelcomeHeaderProps {
  userName?: string;
  onNewApplication: () => void;
}

const WelcomeHeader = ({ userName, onNewApplication }: WelcomeHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-oslo-blue/5 via-transparent to-oslo-green/5 rounded-3xl -z-10" />
      <div className="flex justify-between items-start p-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-oslo-blue via-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl">
                <GraduationCap className="w-9 h-9 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-oslo-green rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
                {t('guardian.dashboard.welcome')}, {userName}
              </h1>
              <p className="text-slate-600 text-xl font-medium mt-2">
                {t('guardian.dashboard.overview')}
              </p>
              <div className="flex items-center gap-3 mt-4">
                <Badge className="relative overflow-hidden bg-gradient-to-r from-slate-100 via-slate-50 to-white text-slate-700 border-2 border-slate-300 hover:border-oslo-blue/50 font-semibold px-3 py-1.5 shadow-md hover:shadow-lg transition-all duration-300 group cursor-default">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <Shield className="w-3.5 h-3.5 mr-2 text-slate-600 relative z-10 drop-shadow-sm" />
                  <span className="relative z-10 text-sm font-semibold tracking-wide">Guardian Account</span>
                </Badge>
                
                <Badge className="relative overflow-hidden bg-gradient-to-r from-oslo-green via-green-500 to-green-600 text-white border-2 border-green-400 font-semibold px-4 py-1.5 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-default transform hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full animate-pulse shadow-md border border-yellow-300"></div>
                  <Star className="w-3.5 h-3.5 mr-2 relative z-10 drop-shadow-md text-yellow-100" />
                  <span className="relative z-10 text-sm font-semibold tracking-wide drop-shadow-sm">✓ Verified</span>
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <Button 
          onClick={onNewApplication}
          size="lg"
          className="bg-gradient-to-r from-oslo-blue to-blue-700 hover:from-oslo-blue/90 hover:to-blue-700/90 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-6 text-lg font-semibold"
        >
          <Plus className="h-6 w-6 mr-3" />
          {t('guardian.dashboard.newApplication')}
        </Button>
      </div>
    </div>
  );
};

export default WelcomeHeader;
