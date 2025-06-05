
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User } from 'lucide-react';

interface ActionLogProps {
  lastAction: any;
}

const ActionLog = ({ lastAction }: ActionLogProps) => {
  // In a real app, this would come from a proper action log store
  const recentActions = [
    {
      id: '1',
      action: 'Check-in',
      child: 'Emma Larsen',
      educator: 'Sarah Johnson',
      timestamp: '09:15',
      type: 'check-in'
    },
    {
      id: '2',
      action: 'Location Update',
      child: 'Lucas Berg',
      educator: 'Sarah Johnson',
      timestamp: '09:12',
      type: 'location'
    },
    {
      id: '3',
      action: 'Message Sent',
      child: 'Maja Andersen',
      educator: 'Sarah Johnson',
      timestamp: '09:08',
      type: 'message'
    },
    {
      id: '4',
      action: 'Check-out',
      child: 'Oliver Hansen',
      educator: 'Sarah Johnson',
      timestamp: '08:45',
      type: 'check-out'
    }
  ];

  const getActionBadge = (type: string) => {
    switch (type) {
      case 'check-in':
        return <Badge className="bg-green-100 text-green-800">Check-in</Badge>;
      case 'check-out':
        return <Badge className="bg-blue-100 text-blue-800">Check-out</Badge>;
      case 'location':
        return <Badge className="bg-purple-100 text-purple-800">Location</Badge>;
      case 'message':
        return <Badge className="bg-orange-100 text-orange-800">Message</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Recent Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {lastAction && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-green-800">Latest Action</span>
              <Badge className="bg-green-100 text-green-800">Just now</Badge>
            </div>
            <p className="text-sm text-green-700">{lastAction.action}</p>
            <p className="text-xs text-green-600">by {lastAction.educator}</p>
          </div>
        )}

        <div className="space-y-2">
          {recentActions.map((action) => (
            <div key={action.id} className="p-3 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">{action.action}</span>
                {getActionBadge(action.type)}
              </div>
              <p className="text-sm text-gray-600">{action.child}</p>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <User className="w-3 h-3" />
                  {action.educator}
                </div>
                <span className="text-xs text-gray-500">{action.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button className="text-sm text-blue-600 hover:text-blue-800">
            View Full Log
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionLog;
