
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertCircle, MessageSquare, Calendar, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickActionsCard = () => {
  const quickActions = [
    {
      title: 'Report Absence',
      description: 'Quick absence notification',
      icon: AlertCircle,
      url: '/guardian/absence-reporting',
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
      title: 'Schedule Meeting',
      description: 'Book teacher meeting',
      icon: Calendar,
      url: '/guardian/teacher-meetings',
      variant: 'outline' as const,
      urgent: false
    },
    {
      title: 'Emergency Contact',
      description: 'Manage emergency contacts',
      icon: Phone,
      url: '/guardian/emergency-contacts',
      variant: 'destructive' as const,
      urgent: true
    }
  ];

  return (
    <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50/30 to-green-100/20" />
      <CardHeader className="relative pb-4">
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
      <CardContent className="relative">
        <TooltipProvider>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Tooltip key={action.title}>
                <TooltipTrigger asChild>
                  <Link to={action.url} className="group">
                    <Button
                      variant={action.variant}
                      className={`w-full h-auto p-3 flex items-center gap-3 text-left hover:scale-105 transition-all duration-300 min-h-[60px] ${
                        action.urgent ? 'shadow-lg hover:shadow-xl' : ''
                      }`}
                    >
                      <action.icon className={`h-5 w-5 flex-shrink-0 ${action.urgent ? 'animate-pulse' : ''}`} />
                      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                        <div className="font-semibold text-sm leading-tight truncate">{action.title}</div>
                        <div className="text-xs opacity-90 leading-tight truncate">{action.description}</div>
                      </div>
                    </Button>
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
