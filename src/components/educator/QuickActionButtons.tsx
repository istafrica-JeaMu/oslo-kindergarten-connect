
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  MessageSquare, 
  Calendar,
  Clock,
  AlertTriangle
} from 'lucide-react';

interface QuickActionButtonsProps {
  onAction: (action: string) => void;
}

const QuickActionButtons = ({ onAction }: QuickActionButtonsProps) => {
  const quickActions = [
    {
      id: 'send-reminders',
      label: 'Send Reminders',
      icon: MessageSquare,
      className: 'bg-orange-600 hover:bg-orange-700 text-white',
      description: 'Consent & pickup reminders'
    },
    {
      id: 'attendance-report',
      label: 'Daily Report',
      icon: Calendar,
      className: 'bg-purple-600 hover:bg-purple-700 text-white',
      description: 'Generate attendance summary'
    },
    {
      id: 'emergency-contact',
      label: 'Emergency',
      icon: AlertTriangle,
      className: 'bg-red-600 hover:bg-red-700 text-white',
      description: 'Quick emergency protocols'
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="w-5 h-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              onClick={() => onAction(action.id)}
              className={`h-20 flex-col space-y-1 ${action.className}`}
              size="lg"
            >
              <action.icon className="w-6 h-6" />
              <div className="text-center">
                <div className="font-medium text-sm">{action.label}</div>
                <div className="text-xs opacity-90">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionButtons;
