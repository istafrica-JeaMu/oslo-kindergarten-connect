
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  FileText, 
  Clock, 
  CheckCircle,
  Building2,
  Calendar,
  AlertTriangle,
  TrendingUp,
  MapPin,
  School
} from 'lucide-react';

const DistrictAdminDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Kindergartens',
      value: '23',
      change: '+2',
      trend: 'up',
      icon: School,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Total Children',
      value: '1,456',
      change: '+87',
      trend: 'up',
      icon: Users,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Pending Applications',
      value: '234',
      change: '-12',
      trend: 'down',
      icon: Clock,
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      title: 'Available Spots',
      value: '45',
      change: '+8',
      trend: 'up',
      icon: CheckCircle,
      color: 'bg-purple-50 text-purple-600'
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
            District Administrator - {user?.district}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">
            <MapPin className="w-3 h-3 mr-1" />
            District Admin
          </Badge>
          <Badge variant="outline">Microsoft Entra ID</Badge>
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
        {/* District Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Kindergarten Overview
            </CardTitle>
            <CardDescription>
              Performance and status across all kindergartens in your district
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Sentrum Barnehage', capacity: '120/125', status: 'Excellent', rating: 4.8, type: 'public' },
                { name: 'Nordre Barnehage', capacity: '98/110', status: 'Good', rating: 4.5, type: 'public' },
                { name: 'Private Kids AS', capacity: '85/90', status: 'Very Good', rating: 4.6, type: 'private' },
              ].map((kindergarten, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                      kindergarten.type === 'public' ? 'bg-blue-500' : 'bg-purple-500'
                    }`}>
                      {kindergarten.name.split(' ')[0][0]}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{kindergarten.name}</p>
                      <p className="text-sm text-slate-600">Capacity: {kindergarten.capacity} • Rating: {kindergarten.rating}/5</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      kindergarten.status === 'Excellent' ? 'default' : 
                      kindergarten.status === 'Very Good' ? 'secondary' : 'outline'
                    }>
                      {kindergarten.status}
                    </Badge>
                    <Badge variant="outline">
                      {kindergarten.type === 'public' ? 'Public' : 'Private'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* District Actions & Updates */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                District Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full p-3 text-left border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-slate-900">Review Applications</p>
                    <p className="text-sm text-slate-600">234 pending</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full p-3 text-left border rounded-lg hover:bg-green-50 hover:border-green-200 transition-colors">
                <div className="flex items-center gap-3">
                  <School className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-slate-900">Kindergarten Inspections</p>
                    <p className="text-sm text-slate-600">5 scheduled</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full p-3 text-left border rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-colors">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-slate-900">Staff Management</p>
                    <p className="text-sm text-slate-600">23 kindergartens</p>
                  </div>
                </div>
              </button>
            </CardContent>
          </Card>

          {/* District Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                District Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm font-medium text-red-800">Urgent</p>
                <p className="text-sm text-red-700">3 kindergartens over capacity</p>
              </div>
              
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">Budget Review</p>
                <p className="text-sm text-yellow-700">Q1 budget review due</p>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Training Program</p>
                <p className="text-sm text-blue-700">New staff training next week</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DistrictAdminDashboard;
