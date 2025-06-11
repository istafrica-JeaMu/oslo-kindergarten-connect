
import { Card, CardContent } from '@/components/ui/card';
import { Users, UserCheck, AlertCircle, Shield } from 'lucide-react';

interface UserStatsCardsProps {
  users: any[];
}

const UserStatsCards = ({ users }: UserStatsCardsProps) => {
  const stats = [
    {
      label: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      valueColor: 'text-blue-900'
    },
    {
      label: 'Active Users',
      value: users.filter(u => u.status === 'Active').length,
      icon: UserCheck,
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      valueColor: 'text-green-900'
    },
    {
      label: 'Inactive Users',
      value: users.filter(u => u.status === 'Inactive').length,
      icon: AlertCircle,
      color: 'orange',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      valueColor: 'text-orange-900'
    },
    {
      label: 'Unique Roles',
      value: new Set(users.map(u => u.role)).size,
      icon: Shield,
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      valueColor: 'text-purple-900'
    }
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <Card key={stat.label} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center">
                <div className={`${stat.bgColor} p-4 flex items-center justify-center`}>
                  <IconComponent className={`w-8 h-8 ${stat.iconColor}`} />
                </div>
                <div className="p-4 flex-1">
                  <p className={`text-3xl font-bold ${stat.valueColor}`}>{stat.value}</p>
                  <p className="text-sm text-slate-600 mt-1">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default UserStatsCards;
