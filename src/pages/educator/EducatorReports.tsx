
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BarChart3, 
  Download,
  Calendar,
  Users,
  Clock,
  TrendingUp,
  FileText,
  Filter
} from 'lucide-react';

const EducatorReports = () => {
  const { user } = useAuth();

  const reportTypes = [
    {
      title: 'Daily Attendance Report',
      description: 'Daily check-in/out summary with timestamps',
      icon: Clock,
      frequency: 'Daily',
      lastGenerated: '2 hours ago'
    },
    {
      title: 'Weekly Activity Summary',
      description: 'Child participation and development notes',
      icon: Users,
      frequency: 'Weekly',
      lastGenerated: '1 day ago'
    },
    {
      title: 'Monthly Progress Report',
      description: 'Comprehensive development assessment',
      icon: TrendingUp,
      frequency: 'Monthly',
      lastGenerated: '1 week ago'
    },
    {
      title: 'Incident Reports',
      description: 'Safety incidents and medical events',
      icon: FileText,
      frequency: 'As needed',
      lastGenerated: '3 days ago'
    }
  ];

  const quickStats = [
    {
      label: 'This Week\'s Attendance',
      value: '95%',
      trend: '+2%',
      color: 'text-green-600'
    },
    {
      label: 'Active Children',
      value: '24',
      trend: '+1',
      color: 'text-blue-600'
    },
    {
      label: 'Reports Generated',
      value: '12',
      trend: '+3',
      color: 'text-purple-600'
    },
    {
      label: 'Avg. Daily Present',
      value: '22',
      trend: '0',
      color: 'text-slate-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-slate-600 mt-1">Generate and view educational reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    stat.trend.startsWith('+') ? 'text-green-600' : 
                    stat.trend.startsWith('-') ? 'text-red-600' : 'text-slate-600'
                  }`}>
                    {stat.trend !== '0' && stat.trend}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Available Reports
          </CardTitle>
          <CardDescription>Generate and download various educational reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {reportTypes.map((report) => (
              <Card key={report.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-oslo-blue/10 rounded-lg">
                        <report.icon className="w-6 h-6 text-oslo-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{report.title}</h3>
                        <p className="text-sm text-slate-600">{report.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{report.frequency}</Badge>
                      <span className="text-xs text-slate-500">
                        Last: {report.lastGenerated}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Calendar className="w-3 h-3 mr-1" />
                        Schedule
                      </Button>
                      <Button size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        Generate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Your recently generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Daily Attendance - January 10, 2025', date: '2 hours ago', size: '2.1 MB' },
              { name: 'Weekly Activity Summary - Week 2', date: '1 day ago', size: '4.5 MB' },
              { name: 'Incident Report - Minor Accident', date: '3 days ago', size: '0.8 MB' },
              { name: 'Monthly Progress - December 2024', date: '1 week ago', size: '12.3 MB' }
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-slate-500" />
                  <div>
                    <p className="font-medium text-slate-900">{report.name}</p>
                    <p className="text-sm text-slate-500">{report.date} • {report.size}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">View</Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-3 h-3" />
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

export default EducatorReports;
