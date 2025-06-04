
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
  Clock,
  BookOpen,
  GraduationCap
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  const features = [
    {
      title: 'Digital Admissions',
      description: 'Streamlined application process with document management and real-time status tracking',
      icon: FileText,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Smart Placement System',
      description: 'AI-powered matching considering preferences, requirements, and institutional capacity',
      icon: Users,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Multi-Role Platform',
      description: 'Integrated dashboards for administrators, staff, students, and parents',
      icon: Building,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Secure & Compliant',
      description: 'Enterprise-grade security with educational data privacy compliance',
      icon: Shield,
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  const stats = [
    { label: 'Educational Institutions', value: '2,500+' },
    { label: 'Students Managed', value: '150,000+' },
    { label: 'Annual Applications', value: '75,000+' },
    { label: 'System Uptime', value: '99.9%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-blue-900" />
              </div>
              <h1 className="text-xl font-bold text-white">IST Platform</h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-white border-white/30 bg-white/10">
                Enterprise Ready
              </Badge>
              <Link to="/login">
                <Button className="bg-white text-blue-900 hover:bg-gray-100 font-medium">
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
            <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
              Integrated School Technology Platform
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              Comprehensive educational administration system managing 2,500+ institutions 
              and 150,000+ students. Streamlined workflows for admissions, placements, 
              communications, and institutional management across all educational levels.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/login">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 h-14 px-8 text-lg font-medium">
                  Access Platform
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-900 h-14 px-8 text-lg"
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
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-4">Platform Capabilities</h3>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Built for educational excellence with enterprise-grade reliability and user-focused design
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
            <h3 className="text-3xl font-bold text-white mb-4">Role-Based Access</h3>
            <p className="text-blue-100 text-lg">Tailored interfaces for every stakeholder in education</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Students & Parents</h4>
                <p className="text-blue-100 text-sm">Application submission, status tracking, communication</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Admissions Staff</h4>
                <p className="text-blue-100 text-sm">Application review, placement management</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Educational Staff</h4>
                <p className="text-blue-100 text-sm">Enrollment management, student records</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Administrators</h4>
                <p className="text-blue-100 text-sm">System oversight, reporting, configuration</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Integration & Security */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-4">Enterprise Integration</h3>
            <p className="text-blue-100 text-lg">Seamless connectivity with existing educational infrastructure</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <h4 className="text-lg font-semibold">System Integration</h4>
                </div>
                <ul className="space-y-2 text-blue-100 text-sm">
                  <li>• Student Information Systems</li>
                  <li>• Learning Management Systems</li>
                  <li>• Financial Management Systems</li>
                  <li>• Identity Management (SSO)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-green-400" />
                  <h4 className="text-lg font-semibold">Security & Compliance</h4>
                </div>
                <ul className="space-y-2 text-blue-100 text-sm">
                  <li>• FERPA Compliant</li>
                  <li>• SOC 2 Type II Certified</li>
                  <li>• End-to-End Encryption</li>
                  <li>• Regular Security Audits</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-green-400" />
                  <h4 className="text-lg font-semibold">Performance & Support</h4>
                </div>
                <ul className="space-y-2 text-blue-100 text-sm">
                  <li>• 99.9% Uptime SLA</li>
                  <li>• Sub-2s Response Time</li>
                  <li>• 24/7 Technical Support</li>
                  <li>• Dedicated Success Manager</li>
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
                <GraduationCap className="h-5 w-5 text-blue-900" />
              </div>
              <span className="text-white font-medium">IST Platform</span>
            </div>
            <div className="text-blue-200 text-sm">
              © 2024 Integrated School Technology. Enterprise education platform.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
