
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Home, ArrowLeft, Building } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGoHome = () => {
    if (user) {
      navigate(`/${user.role}`);
    } else {
      navigate('/');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-oslo-blue to-blue-700 flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-2xl border-0 text-center">
        <CardHeader className="pb-8">
          <div className="mx-auto w-16 h-16 bg-oslo-blue/10 rounded-2xl flex items-center justify-center mb-6">
            <Building className="w-8 h-8 text-oslo-blue" />
          </div>
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-oslo-blue">404</h1>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Page Not Found
            </CardTitle>
            <CardDescription className="text-gray-600">
              The page you're looking for doesn't exist or has been moved.
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button 
              onClick={handleGoHome}
              className="w-full bg-oslo-blue hover:bg-blue-700 h-12"
            >
              <Home className="h-4 w-4 mr-2" />
              {user ? `Go to ${user.role} Dashboard` : 'Go to Homepage'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleGoBack}
              className="w-full h-12"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500">
              If you believe this is an error, please contact support.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
