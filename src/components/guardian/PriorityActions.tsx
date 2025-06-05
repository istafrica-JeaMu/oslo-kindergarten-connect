
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Clock, 
  FileText, 
  CreditCard, 
  MessageSquare,
  ArrowRight,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PriorityActions = () => {
  const { t } = useTranslation();

  // Mock priority actions data - in real app this would come from API
  const priorityActions = [
    {
      id: 1,
      type: 'urgent',
      title: 'Application Response Required',
      description: 'Løvenskiold Kindergarten offer expires in 3 days',
      dueDate: '2024-03-21',
      icon: AlertTriangle,
      action: 'Respond Now',
      link: '/guardian/application-status',
      color: 'red'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Due Soon',
      description: 'Monthly fee payment due in 5 days',
      dueDate: '2024-03-23',
      icon: CreditCard,
      action: 'Pay Now',
      link: '/guardian/payments',
      color: 'amber'
    },
    {
      id: 3,
      type: 'message',
      title: 'Unread Important Message',
      description: 'New message from your child\'s teacher',
      dueDate: '2024-03-18',
      icon: MessageSquare,
      action: 'Read Message',
      link: '/guardian/messages',
      color: 'blue'
    },
    {
      id: 4,
      type: 'document',
      title: 'Document Signature Required',
      description: 'Health consent form needs your signature',
      dueDate: '2024-03-25',
      icon: FileText,
      action: 'Sign Document',
      link: '/guardian/documents',
      color: 'violet'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'red':
        return {
          bg: 'bg-gradient-to-br from-red-50 to-red-100',
          border: 'border-red-200',
          icon: 'bg-red-100 text-red-600',
          badge: 'bg-red-100 text-red-700 border-red-200',
          button: 'bg-red-600 hover:bg-red-700'
        };
      case 'amber':
        return {
          bg: 'bg-gradient-to-br from-amber-50 to-amber-100',
          border: 'border-amber-200',
          icon: 'bg-amber-100 text-amber-600',
          badge: 'bg-amber-100 text-amber-700 border-amber-200',
          button: 'bg-amber-600 hover:bg-amber-700'
        };
      case 'blue':
        return {
          bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
          border: 'border-blue-200',
          icon: 'bg-blue-100 text-blue-600',
          badge: 'bg-blue-100 text-blue-700 border-blue-200',
          button: 'bg-blue-600 hover:bg-blue-700'
        };
      case 'violet':
        return {
          bg: 'bg-gradient-to-br from-violet-50 to-violet-100',
          border: 'border-violet-200',
          icon: 'bg-violet-100 text-violet-600',
          badge: 'bg-violet-100 text-violet-700 border-violet-200',
          button: 'bg-violet-600 hover:bg-violet-700'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-slate-50 to-slate-100',
          border: 'border-slate-200',
          icon: 'bg-slate-100 text-slate-600',
          badge: 'bg-slate-100 text-slate-700 border-slate-200',
          button: 'bg-slate-600 hover:bg-slate-700'
        };
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (priorityActions.length === 0) {
    return (
      <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">All Caught Up!</h3>
            <p className="text-slate-600">You have no urgent actions at this time.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-6 border-b border-slate-200/50">
        <CardTitle className="flex items-center gap-4 text-2xl">
          <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Priority Actions</h2>
            <p className="text-base text-slate-600 font-normal mt-1">
              {priorityActions.length} item{priorityActions.length > 1 ? 's' : ''} need your attention
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {priorityActions.map((action) => {
            const colors = getColorClasses(action.color);
            const daysUntil = getDaysUntilDue(action.dueDate);
            const IconComponent = action.icon;

            return (
              <div key={action.id} className="group">
                <div className={`relative p-6 rounded-2xl border-2 ${colors.border} ${colors.bg} hover:shadow-lg transition-all duration-300`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-12 h-12 ${colors.icon} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="flex items-start justify-between">
                          <h4 className="font-bold text-slate-900 text-lg">{action.title}</h4>
                          <Badge className={`${colors.badge} font-semibold flex items-center gap-1.5`}>
                            <Clock className="w-3 h-3" />
                            {daysUntil === 0 ? 'Today' : 
                             daysUntil === 1 ? 'Tomorrow' : 
                             daysUntil < 0 ? 'Overdue' : 
                             `${daysUntil} days`}
                          </Badge>
                        </div>
                        <p className="text-slate-700 font-medium">{action.description}</p>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {action.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    <Link to={action.link}>
                      <Button 
                        className={`${colors.button} text-white shadow-lg hover:shadow-xl ml-4 gap-2`}
                        size="sm"
                      >
                        {action.action}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PriorityActions;
