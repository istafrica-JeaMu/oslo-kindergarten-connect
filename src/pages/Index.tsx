
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, Shield, Clock } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-oslo-blue to-blue-700">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center text-white mb-16">
          <h1 className="text-5xl font-bold mb-6">
            Barnehage Oslo
          </h1>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Digital platform for kindergarten admissions and place administration in Oslo municipality
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-white text-oslo-blue hover:bg-gray-100">
              Access Portal
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
            <CardHeader>
              <Users className="h-12 w-12 mb-4 text-green-400" />
              <CardTitle>35,000+ Children</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/80">
                Serving families across 15 districts in Oslo
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
            <CardHeader>
              <FileText className="h-12 w-12 mb-4 text-blue-400" />
              <CardTitle>680+ Kindergartens</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/80">
                Municipal and private facilities integrated
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
            <CardHeader>
              <Shield className="h-12 w-12 mb-4 text-purple-400" />
              <CardTitle>GDPR Compliant</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/80">
                Secure handling of sensitive family data
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
            <CardHeader>
              <Clock className="h-12 w-12 mb-4 text-yellow-400" />
              <CardTitle>24/7 Access</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/80">
                Apply and manage placements anytime
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-xl">
          <h2 className="text-3xl font-bold text-oslo-blue mb-6 text-center">
            For Different User Types
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-oslo-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Guardians</h3>
              <p className="text-gray-600">
                Apply for kindergarten places, track status, manage payments, and communicate with staff
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Case Workers</h3>
              <p className="text-gray-600">
                Process applications, manage placements, generate offers, and handle billing
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Administrators</h3>
              <p className="text-gray-600">
                System configuration, user management, analytics, and compliance reporting
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
