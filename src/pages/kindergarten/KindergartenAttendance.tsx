
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Calendar,
  Download,
  BarChart3,
  TrendingUp,
  Users
} from 'lucide-react';
import AttendanceManager from '@/components/attendance/AttendanceManager';

const KindergartenAttendance = () => {
  const { user } = useAuth();

  const monthlyStats = [
    {
      title: 'Average Daily Attendance',
      value: '87%',
      change: '+2.3%',
      trend: 'up',
      description: 'This month vs last month'
    },
    {
      title: 'Perfect Attendance',
      value: '12',
      change: '+3',
      trend: 'up',
      description: 'Children with 100% attendance'
    },
    {
      title: 'Late Arrivals (Avg)',
      value: '4.2',
      change: '-0.8',
      trend: 'down',
      description: 'Per day this month'
    },
    {
      title: 'Early Pickups (Avg)',
      value: '2.1',
      change: '+0.3',
      trend: 'up',
      description: 'Per day this month'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Attendance Management
          </h1>
          <p className="text-slate-600 mt-2">
            Real-time attendance tracking and management • {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={user?.role === 'staff' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-purple-100 text-purple-800 border-purple-200'}>
            {user?.role === 'staff' ? 'Public Kindergarten' : 'Private Kindergarten'}
          </Badge>
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            View Reports
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Monthly Statistics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {monthlyStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Common attendance management tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-16 flex-col space-y-2 bg-green-600 hover:bg-green-700">
              <Users className="w-6 h-6" />
              <span>Bulk Check-In</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2 border-blue-300 text-blue-700 hover:bg-blue-50">
              <Users className="w-6 h-6" />
              <span>Bulk Check-Out</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <Calendar className="w-6 h-6" />
              <span>Attendance History</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <Download className="w-6 h-6" />
              <span>Daily Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Attendance Manager */}
      <AttendanceManager />
    </div>
  );
};

export default KindergartenAttendance;
