
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Building, 
  Users, 
  FileText,
  ArrowRight,
  CheckCircle,
  Shield,
  Globe,
  Clock
} from 'lucide-react';

const Index = () => {
  const { user, isLoading } = useAuth();
  const { t } = useTranslation();

  // Redirect authenticated users to their respective dashboards
  if (!isLoading && user) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-oslo-blue to-blue-700">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  const features = [
    {
      title: 'Streamlined Applications',
      description: 'Digital application process with document upload and real-time status tracking',
      icon: FileText,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Intelligent Placement',
      description: 'Automated matching system considering preferences, special needs, and capacity',
      icon: Users,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Multi-Role Portal',
      description: 'Dedicated interfaces for guardians, case workers, kindergarten staff, and administrators',
      icon: Building,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Secure & Compliant',
      description: 'GDPR compliant with ID-porten integration and NOARK 5 archiving',
      icon: Shield,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const stats = [
    { label: 'Kindergartens', value: '680+' },
    { label: 'Children Served', value: '35,000+' },
    { label: 'Annual Applications', value: '20,000+' },
    { label: 'Success Rate', value: '92%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-oslo-blue to-blue-700">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Building className="h-6 w-6 text-oslo-blue" />
              </div>
              <h1 className="text-xl font-bold text-white">Oslo Kindergarten Portal</h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-white border-white/30 bg-white/10">
                Production Ready
              </Badge>
              <Link to="/login">
                <Button className="bg-white text-oslo-blue hover:bg-gray-100">
                  {t('auth.login')}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-white mb-6">
              Comprehensive Kindergarten Admissions System
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              A centralized platform managing 680 kindergartens, serving 35,000+ children 
              with 20,000+ annual applications. Supporting multiple user roles with 
              integrated workflows for applications, placements, messaging, and administration.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/login">
                <Button size="lg" className="bg-white text-oslo-blue hover:bg-gray-100 h-14 px-8 text-lg">
                  Access Portal
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-oslo-blue h-14 px-8 text-lg"
              >
                View Demo
                <Globe className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-4">Platform Features</h3>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Built for efficiency, designed for compliance, and optimized for user experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.color}`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                      <p className="text-blue-100">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-4">Multi-Role Access</h3>
            <p className="text-blue-100 text-lg">Tailored interfaces for every user type</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Guardians</h4>
                <p className="text-blue-100 text-sm">Submit applications, track status, manage payments</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Case Workers</h4>
                <p className="text-blue-100 text-sm">Review applications, manage placements</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Kindergarten Staff</h4>
                <p className="text-blue-100 text-sm">Manage capacity, confirm placements</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Administrators</h4>
                <p className="text-blue-100 text-sm">System configuration, reports, user management</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Integration & Compliance */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-4">Integrations & Compliance</h3>
            <p className="text-blue-100 text-lg">Connected to national services and fully compliant</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <h4 className="text-lg font-semibold">National Services</h4>
                </div>
                <ul className="space-y-2 text-blue-100">
                  <li>• FREG (Population Register)</li>
                  <li>• ID-porten Authentication</li>
                  <li>• Altinn Notifications</li>
                  <li>• SvarUt Document Dispatch</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-green-400" />
                  <h4 className="text-lg font-semibold">Compliance</h4>
                </div>
                <ul className="space-y-2 text-blue-100">
                  <li>• GDPR Compliant</li>
                  <li>• NOARK 5 Archiving</li>
                  <li>• ISO 27001 Security</li>
                  <li>• WCAG 2.1 AA Accessibility</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-green-400" />
                  <h4 className="text-lg font-semibold">Performance</h4>
                </div>
                <ul className="space-y-2 text-blue-100">
                  <li>• 99.9% Uptime SLA</li>
                  <li>• &lt;3s Response Time</li>
                  <li>• 500+ Concurrent Users</li>
                  <li>• TLS 1.3 Encryption</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/5 backdrop-blur-sm border-t border-white/20 py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Building className="h-5 w-5 text-oslo-blue" />
              </div>
              <span className="text-white font-medium">Oslo Municipality</span>
            </div>
            <div className="text-blue-200 text-sm">
              © 2024 Oslo Kindergarten Portal. Production-ready prototype.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
