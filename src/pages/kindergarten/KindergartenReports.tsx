
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BarChart3, 
  FileText, 
  Download,
  Calendar,
  Users,
  TrendingUp,
  PieChart,
  FileBarChart,
  Clock,
  UserCheck,
  DollarSign
} from 'lucide-react';

const KindergartenReports = () => {
  const { user } = useAuth();

  const reportCategories = [
    {
      title: 'Attendance Reports',
      description: 'Daily, weekly, and monthly attendance statistics',
      icon: UserCheck,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      reports: [
        { name: 'Daily Attendance Summary', lastGenerated: '2024-03-18', type: 'PDF' },
        { name: 'Weekly Attendance Trends', lastGenerated: '2024-03-15', type: 'Excel' },
        { name: 'Monthly Attendance Report', lastGenerated: '2024-03-01', type: 'PDF' }
      ]
    },
    {
      title: 'Child Development',
      description: 'Progress reports and developmental milestones',
      icon: TrendingUp,
      color: 'bg-green-50 text-green-600 border-green-200',
      reports: [
        { name: 'Individual Progress Reports', lastGenerated: '2024-03-10', type: 'PDF' },
        { name: 'Group Development Summary', lastGenerated: '2024-03-05', type: 'PDF' },
        { name: 'Milestone Tracking Report', lastGenerated: '2024-02-28', type: 'Excel' }
      ]
    },
    {
      title: 'Financial Reports',
      description: 'Fee collection, payments, and financial summaries',
      icon: DollarSign,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      reports: [
        { name: 'Monthly Fee Collection', lastGenerated: '2024-03-01', type: 'Excel' },
        { name: 'Outstanding Payments', lastGenerated: '2024-03-18', type: 'PDF' },
        { name: 'Financial Summary Report', lastGenerated: '2024-02-29', type: 'PDF' }
      ],
      private: true
    },
    {
      title: 'Operational Reports',
      description: 'Staff schedules, capacity, and operational metrics',
      icon: BarChart3,
      color: 'bg-orange-50 text-orange-600 border-orange-200',
      reports: [
        { name: 'Capacity Utilization Report', lastGenerated: '2024-03-15', type: 'Excel' },
        { name: 'Staff Schedule Summary', lastGenerated: '2024-03-18', type: 'PDF' },
        { name: 'Activity Participation Report', lastGenerated: '2024-03-12', type: 'PDF' }
      ]
    }
  ];

  const quickStats = [
    {
      title: 'Reports Generated',
      value: '24',
      period: 'This Month',
      icon: FileText,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Data Points',
      value: '1,847',
      period: 'Last 30 Days',
      icon: BarChart3,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Export Downloads',
      value: '156',
      period: 'This Week',
      icon: Download,
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  const recentReports = [
    { name: 'Daily Attendance - March 18', type: 'Attendance', generated: '2024-03-18T08:30:00', size: '2.4 MB' },
    { name: 'Weekly Progress Summary', type: 'Development', generated: '2024-03-17T16:45:00', size: '1.8 MB' },
    { name: 'Capacity Report - Week 11', type: 'Operational', generated: '2024-03-15T14:20:00', size: '924 KB' },
    { name: 'Fee Collection - February', type: 'Financial', generated: '2024-03-01T09:15:00', size: '3.2 MB' }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredCategories = reportCategories.filter(category => 
    !category.private || user?.role === 'partner'
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Reports & Analytics
          </h1>
          <p className="text-slate-600 mt-2">
            Generate and download comprehensive reports for your kindergarten
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={user?.role === 'staff' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-purple-100 text-purple-800 border-purple-200'}>
            {user?.role === 'staff' ? 'Public Kindergarten' : 'Private Kindergarten'}
          </Badge>
          <Button>
            <FileBarChart className="w-4 h-4 mr-2" />
            Create Custom Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500 mt-1">{stat.period}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Categories */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredCategories.map((category, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${category.color}`}>
                  <category.icon className="w-5 h-5" />
                </div>
                {category.title}
              </CardTitle>
              <CardDescription>
                {category.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.reports.map((report, reportIndex) => (
                  <div key={reportIndex} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50">
                    <div>
                      <p className="font-medium text-slate-900">{report.name}</p>
                      <p className="text-sm text-slate-600">
                        Last generated: {report.lastGenerated} • {report.type}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button size="sm">
                        Generate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recently Generated Reports
          </CardTitle>
          <CardDescription>
            Your latest report downloads and generations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{report.name}</p>
                    <p className="text-sm text-slate-600">
                      {report.type} • Generated {formatDate(report.generated)} • {report.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{report.type}</Badge>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KindergartenReports;
