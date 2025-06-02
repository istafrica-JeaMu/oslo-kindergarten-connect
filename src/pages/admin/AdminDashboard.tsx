
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Settings, 
  Users, 
  Building, 
  TrendingUp, 
  AlertCircle,
  FileText,
  Shield,
  Database,
  Activity
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();

  // Mock system statistics
  const systemStats = {
    totalUsers: 45678,
    totalApplications: 12547,
    totalKindergartens: 680,
    totalDistricts: 15,
    systemUptime: 99.8,
    avgResponseTime: 245,
    activeUsers: 1247,
    pendingApprovals: 23
  };

  const districtStats = [
    { name: 'Gamle Oslo', applications: 1247, capacity: 95, waitingList: 89 },
    { name: 'Grünerløkka', applications: 987, capacity: 88, waitingList: 134 },
    { name: 'Sagene', applications: 876, capacity: 92, waitingList: 67 },
    { name: 'St. Hanshaugen', applications: 654, capacity: 97, waitingList: 23 },
    { name: 'Frogner', applications: 543, capacity: 91, waitingList: 56 }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Høy belastning på databaseserveren - responstid økt',
      timestamp: '2024-03-20 14:30'
    },
    {
      id: 2,
      type: 'info',
      message: 'Planlagt vedlikehold av FREG-integrasjon 25. mars',
      timestamp: '2024-03-19 09:15'
    },
    {
      id: 3,
      type: 'success',
      message: 'Sikkerhetsoppdatering installert på alle servere',
      timestamp: '2024-03-18 22:00'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'success':
        return <Shield className="h-4 w-4 text-green-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getCapacityColor = (percentage: number) => {
    if (percentage >= 95) return 'text-red-600';
    if (percentage >= 85) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Administrator Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Velkommen tilbake, {user?.name} • Systemovervåking og administrasjon
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/reports">
            <Button className="bg-oslo-blue hover:bg-blue-700">
              <BarChart3 className="h-4 w-4 mr-2" />
              Rapporter
            </Button>
          </Link>
          <Link to="/admin/settings">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Innstillinger
            </Button>
          </Link>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="flex items-center p-6">
            <Activity className="h-8 w-8 text-green-600 mr-4" />
            <div>
              <h3 className="font-semibold">Systemstatus</h3>
              <p className="text-2xl font-bold text-green-600">{systemStats.systemUptime}%</p>
              <p className="text-xs text-gray-600">Oppetid siste 30 dager</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-blue-600 mr-4" />
            <div>
              <h3 className="font-semibold">Aktive brukere</h3>
              <p className="text-2xl font-bold text-blue-600">{systemStats.activeUsers}</p>
              <p className="text-xs text-gray-600">Pålogget nå</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <FileText className="h-8 w-8 text-purple-600 mr-4" />
            <div>
              <h3 className="font-semibold">Totale søknader</h3>
              <p className="text-2xl font-bold text-purple-600">{systemStats.totalApplications.toLocaleString()}</p>
              <p className="text-xs text-gray-600">I år</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <Database className="h-8 w-8 text-orange-600 mr-4" />
            <div>
              <h3 className="font-semibold">Responstid</h3>
              <p className="text-2xl font-bold text-orange-600">{systemStats.avgResponseTime}ms</p>
              <p className="text-xs text-gray-600">Gjennomsnitt</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Alerts */}
      <Card className="border-l-4 border-l-yellow-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            Systemvarsler
          </CardTitle>
          <CardDescription>
            Viktige meldinger og systemoppdateringer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* District Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Distriktsoversikt
          </CardTitle>
          <CardDescription>
            Ytelse og kapasitet per distrikt
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {districtStats.map((district, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">{district.name}</h4>
                  <p className="text-sm text-gray-600">
                    {district.applications} søknader • {district.waitingList} på venteliste
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${getCapacityColor(district.capacity)}`}>
                    {district.capacity}%
                  </p>
                  <p className="text-xs text-gray-600">Kapasitetsutnyttelse</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions and System Info */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Hurtighandlinger
            </CardTitle>
            <CardDescription>
              Vanlige administrative oppgaver
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/admin/reports">
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                Generer månedlig rapport
              </Button>
            </Link>
            
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Administrer brukerroller
            </Button>

            <Button variant="outline" className="w-full justify-start">
              <Database className="h-4 w-4 mr-2" />
              Sikkerhetskopi database
            </Button>

            <Link to="/admin/settings">
              <Button variant="outline" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Systemkonfigurasjon
              </Button>
            </Link>

            <Button variant="outline" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Sikkerhetstilgang
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Systemstatistikk
            </CardTitle>
            <CardDescription>
              Oversikt over systembruk og ytelse
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold text-blue-900">Totale brukere</h4>
                <p className="text-xl font-bold text-blue-600">{systemStats.totalUsers.toLocaleString()}</p>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-semibold text-green-900">Barnehager</h4>
                <p className="text-xl font-bold text-green-600">{systemStats.totalKindergartens}</p>
              </div>
              
              <div className="bg-purple-50 p-3 rounded-lg">
                <h4 className="font-semibold text-purple-900">Distrikter</h4>
                <p className="text-xl font-bold text-purple-600">{systemStats.totalDistricts}</p>
              </div>
              
              <div className="bg-orange-50 p-3 rounded-lg">
                <h4 className="font-semibold text-orange-900">Venter godkjennelse</h4>
                <p className="text-xl font-bold text-orange-600">{systemStats.pendingApprovals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance and Security Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Sikkerhet og etterlevelse
          </CardTitle>
          <CardDescription>
            Status for sikkerhet og regeletterlevelse
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold">GDPR-status</h4>
              <Badge className="bg-green-100 text-green-800 mt-1">Etterlevd</Badge>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Database className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold">Datasikkerhet</h4>
              <Badge className="bg-green-100 text-green-800 mt-1">Sikret</Badge>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold">NOARK 5</h4>
              <Badge className="bg-green-100 text-green-800 mt-1">Kompatibel</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
