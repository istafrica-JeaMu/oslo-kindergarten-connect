import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertCircle, MessageSquare, Calendar, Phone, CloudSun } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickActionsCard = () => {
  const quickActions = [
    {
      title: 'Report Absence',
      description: 'Quick absence notification',
      icon: AlertCircle,
      url: '/guardian/attendance-tracking',
      variant: 'destructive' as const,
      urgent: true
    },
    {
      title: 'Message Teacher',
      description: 'Send direct message',
      icon: MessageSquare,
      url: '/guardian/messages',
      variant: 'default' as const,
      urgent: false
    },
    {
      title: 'View Schedule',
      description: 'Check daily activities',
      icon: Calendar,
      url: '/guardian/daily-schedule',
      variant: 'outline' as const,
      urgent: false
    },
    {
      title: 'Child Profile',
      description: 'Manage child information',
      icon: Phone,
      url: '/guardian/child-profile',
      variant: 'outline' as const,
      urgent: false
    },
    {
      title: 'Notice Board',
      description: 'Latest updates and news',
      icon: CloudSun,
      url: '/guardian/notice-board',
      variant: 'outline' as const,
      urgent: false
    }
  ];

  const getButtonClassName = (action: typeof quickActions[0]) => {
    const baseClasses = "w-full h-auto p-3 flex items-center gap-3 text-left hover:scale-[1.02] transition-all duration-300 min-h-[60px] shadow-lg hover:shadow-xl rounded-lg";
    
    if (action.variant === 'destructive') {
      return `${baseClasses} bg-red-100 hover:bg-red-200 text-red-700 border border-red-200 hover:border-red-300`;
    } else if (action.variant === 'default') {
      return `${baseClasses} bg-gradient-to-r from-oslo-blue to-blue-700 hover:from-oslo-blue/90 hover:to-blue-700/90 text-white border border-oslo-blue`;
    } else {
      return `${baseClasses} border-2 border-oslo-blue text-oslo-blue bg-white hover:bg-gradient-to-r hover:from-oslo-blue hover:to-blue-700 hover:text-white`;
    }
  };

  return (
    <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50/30 to-green-100/20" />
      <CardHeader className="relative pb-3">
        <CardTitle className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Quick Actions</h3>
            <p className="text-sm text-slate-600 font-normal mt-0.5">Common tasks for busy parents</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative flex-1 flex flex-col">
        <TooltipProvider>
          <div className="space-y-2 flex-1">
            {quickActions.map((action) => (
              <Tooltip key={action.title}>
                <TooltipTrigger asChild>
                  <Link to={action.url} className="group block">
                    <button
                      className={getButtonClassName(action)}
                    >
                      <action.icon className={`h-5 w-5 flex-shrink-0 ${action.urgent ? 'animate-pulse' : ''}`} />
                      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                        <div className="font-semibold text-sm leading-tight">{action.title}</div>
                        <div className="text-xs opacity-90 leading-tight">{action.description}</div>
                      </div>
                    </button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">{action.title}</p>
                  <p className="text-sm text-slate-600">{action.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
