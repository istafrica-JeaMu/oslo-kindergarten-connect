
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, MessageSquare, Calendar, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickActionsCard = () => {
  const quickActions = [
    {
      title: 'Report Absence',
      description: 'Quick absence notification',
      icon: AlertCircle,
      url: '/guardian/absence',
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
      url: '/guardian/meetings',
      variant: 'outline' as const,
      urgent: false
    },
    {
      title: 'Emergency Contact',
      description: 'Urgent contact needed',
      icon: Phone,
      url: '/guardian/emergency',
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
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link key={action.title} to={action.url} className="group">
              <Button
                variant={action.variant}
                className={`w-full h-auto p-3 flex flex-col items-center gap-2 text-center hover:scale-105 transition-all duration-300 min-h-[100px] ${
                  action.urgent ? 'shadow-lg hover:shadow-xl' : ''
                }`}
              >
                <action.icon className={`h-5 w-5 flex-shrink-0 ${action.urgent ? 'animate-pulse' : ''}`} />
                <div className="flex flex-col gap-1 text-center">
                  <div className="font-semibold text-xs leading-tight">{action.title}</div>
                  <div className="text-xs opacity-90 leading-tight">{action.description}</div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
