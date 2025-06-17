
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  UserPlus, 
  RefreshCw, 
  Replace, 
  Edit, 
  Calendar, 
  Mail,
  Users,
  User,
  Clock
} from 'lucide-react';

interface BulkActionsPanelProps {
  selectedCount: number;
  onBulkAction: (actionType: string, data?: any) => void;
}

const BulkActionsPanel = ({ selectedCount, onBulkAction }: BulkActionsPanelProps) => {
  const bulkActions = [
    {
      id: 'create_addons',
      label: 'Create addons',
      icon: Plus,
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Add supplementary services'
    },
    {
      id: 'enrollment',
      label: 'Enrollment',
      icon: UserPlus,
      color: 'bg-green-600 hover:bg-green-700',
      description: 'Process new enrollments'
    },
    {
      id: 'request_replace',
      label: 'Request replace',
      icon: RefreshCw,
      color: 'bg-orange-600 hover:bg-orange-700',
      description: 'Request placement replacement'
    },
    {
      id: 'replace',
      label: 'Replace',
      icon: Replace,
      color: 'bg-purple-600 hover:bg-purple-700',
      description: 'Execute placement replacement'
    },
    {
      id: 'change_admission',
      label: 'Change admission',
      icon: Edit,
      color: 'bg-teal-600 hover:bg-teal-700',
      description: 'Modify admission details'
    },
    {
      id: 'change_admission_events',
      label: 'Change admission events',
      icon: Calendar,
      color: 'bg-indigo-600 hover:bg-indigo-700',
      description: 'Track admission modifications'
    },
    {
      id: 'send_email',
      label: 'Send e-mail',
      icon: Mail,
      color: 'bg-red-600 hover:bg-red-700',
      description: 'Send communications'
    }
  ];

  const individualActions = [
    {
      id: 'work_with_selection',
      label: 'Work with a selection',
      icon: Users,
      description: 'Batch process selected items'
    },
    {
      id: 'manage_child_info',
      label: 'Manage child info',
      icon: User,
      description: 'Access child profiles'
    },
    {
      id: 'schedule_termination',
      label: 'Schedule termination',
      icon: Clock,
      description: 'Plan placement endings'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Bulk Actions Row */}
      <div className="flex flex-wrap gap-2 justify-end">
        {bulkActions.map((action) => (
          <Button
            key={action.id}
            onClick={() => onBulkAction(action.id)}
            disabled={selectedCount === 0}
            className={`${action.color} text-white disabled:opacity-50 disabled:bg-gray-400`}
            size="sm"
            title={action.description}
          >
            <action.icon className="w-4 h-4 mr-2" />
            {action.label}
          </Button>
        ))}
      </div>

      {/* Individual Actions Row */}
      <div className="flex flex-wrap gap-2 justify-end">
        {individualActions.map((action) => (
          <Button
            key={action.id}
            onClick={() => onBulkAction(action.id)}
            variant="outline"
            size="sm"
            title={action.description}
          >
            <action.icon className="w-4 h-4 mr-2" />
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BulkActionsPanel;
