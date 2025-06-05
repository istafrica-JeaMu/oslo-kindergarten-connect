
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  FileText, 
  DollarSign, 
  CheckCircle,
  Building,
  Calendar,
  Star,
  TrendingUp
} from 'lucide-react';

const PartnerDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Active Enrollments',
      value: '42',
      change: '+3',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Applications',
      value: '18',
      change: '+7',
      trend: 'up',
      icon: FileText,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Monthly Revenue',
      value: '€24,850',
      change: '+12%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Capacity Used',
      value: '84%',
      change: '+5%',
      trend: 'up',
      icon: CheckCircle,
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {user?.name}
          </h1>
          <p className="text-slate-600 mt-2">
            Partner Dashboard - {user?.organization}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-purple-100 text-purple-800 border-purple-200">
            <Building className="w-3 h-3 mr-1" />
            Private Partner
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Star className="w-3 h-3 mr-1" />
            Premium
          </Badge>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Recent Applications
            </CardTitle>
            <CardDescription>
              New applications to your kindergarten
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Sofia Kristensen', age: '3 years', status: 'New Application', date: '2024-01-15', priority: 'High' },
                { name: 'Noah Pettersen', age: '4 years', status: 'Interview Scheduled', date: '2024-01-14', priority: 'Medium' },
                { name: 'Liam Eriksen', age: '2 years', status: 'Documents Pending', date: '2024-01-13', priority: 'Low' },
              ].map((application, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {application.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{application.name}</p>
                      <p className="text-sm text-slate-600">{application.age} • Applied {application.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      application.priority === 'High' ? 'destructive' : 
                      application.priority === 'Medium' ? 'default' : 'secondary'
                    }>
                      {application.priority}
                    </Badge>
                    <Badge variant="outline">{application.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Business Insights & Actions */}
        <div className="space-y-6">
          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Occupancy Rate</span>
                  <span className="font-medium">84%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Parent Satisfaction</span>
                  <span className="font-medium">4.8/5</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Staff Ratio</span>
                  <span className="font-medium">1:4</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full p-3 text-left border rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-slate-900">Review Applications</p>
                    <p className="text-sm text-slate-600">18 pending</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full p-3 text-left border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-slate-900">Schedule Tours</p>
                    <p className="text-sm text-slate-600">5 families interested</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full p-3 text-left border rounded-lg hover:bg-green-50 hover:border-green-200 transition-colors">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-slate-900">Financial Reports</p>
                    <p className="text-sm text-slate-600">Monthly summary</p>
                  </div>
                </div>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
