
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loader2, Eye, EyeOff, GraduationCap, Shield, Building2, ExternalLink, Mail } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginStep, setLoginStep] = useState<'email' | 'staff-auth' | 'id-porten' | 'entra-id'>('email');
  const [domainType, setDomainType] = useState<'guardian' | 'public-staff' | 'private-staff' | 'admin' | 'unknown'>('guardian');
  
  const { user, login, loginWithIDPorten, loginWithEntraID, checkDomainType } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
      const type = checkDomainType(email);
      setDomainType(type);
      setError('');
    }
  }, [email, checkDomainType]);

  if (user) {
    let redirectPath = '/';
    switch (user.role) {
      case 'guardian':
        redirectPath = '/guardian';
        break;
      case 'caseworker':
        redirectPath = '/caseworker';
        break;
      case 'admin':
        redirectPath = '/admin';
        break;
      case 'staff':
        redirectPath = '/staff';
        break;
      case 'partner':
        redirectPath = '/partner';
        break;
    }
    return <Navigate to={redirectPath} replace />;
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    const type = checkDomainType(email);
    
    if (type === 'unknown') {
      setError('Your organization is not currently supported. Please contact support for access.');
      return;
    }

    if (type === 'guardian') {
      setLoginStep('id-porten');
    } else {
      setLoginStep('entra-id');
    }
  };

  const handleIDPortenLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithIDPorten();
    } catch (err) {
      setError('Failed to connect to ID-Porten. Please try again.');
      setIsLoading(false);
    }
  };

  const handleEntraIDLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithEntraID(email);
    } catch (err) {
      setError('Failed to connect to Microsoft Entra ID. Please try again.');
      setIsLoading(false);
    }
  };

  const getDomainBadge = () => {
    switch (domainType) {
      case 'admin':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Admin</Badge>;
      case 'public-staff':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Public Staff</Badge>;
      case 'private-staff':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Private Staff</Badge>;
      case 'guardian':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Guardian</Badge>;
      default:
        return null;
    }
  };

  const getOrganizationName = () => {
    const domain = email.split('@')[1]?.toLowerCase();
    switch (domain) {
      case 'oslo.kommune.no':
        return 'Oslo Kommune';
      case 'admin.oslo.kommune.no':
        return 'Oslo Kommune Admin';
      case 'ist.com':
        return 'IST Private Kindergarten';
      case 'admin.ist.com':
        return 'IST Admin';
      case 'privbarnehage.no':
        return 'Private Barnehage AS';
      default:
        return 'Guardian Portal';
    }
  };

  const getAuthMethod = () => {
    return domainType === 'guardian' ? 'ID-Porten' : 'Microsoft Entra ID';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-6 pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              IST Platform Login
            </CardTitle>
            <CardDescription className="text-slate-600">
              {loginStep === 'email' && "Enter your email to continue"}
              {loginStep === 'id-porten' && "Continue with ID-Porten"}
              {loginStep === 'entra-id' && `Continue with Microsoft Entra ID`}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Email Step */}
          {loginStep === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-slate-800">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="h-12 border-2 focus:border-blue-500"
                  required
                />
                {email && getDomainBadge() && (
                  <div className="flex items-center gap-2 mt-2">
                    {getDomainBadge()}
                    <span className="text-xs text-slate-600">
                      Will use {getAuthMethod()}
                    </span>
                  </div>
                )}
              </div>

              {error && (
                <Alert variant="destructive" className="border-red-200 bg-red-50/80">
                  <AlertDescription className="text-red-800 font-medium">
                    {error}
                    {domainType === 'unknown' && (
                      <div className="mt-2 pt-2 border-t border-red-200">
                        <p className="text-sm">Contact support: <a href="mailto:support@ist.com" className="underline">support@ist.com</a></p>
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                disabled={!email || domainType === 'unknown'}
              >
                Continue
              </Button>
            </form>
          )}

          {/* ID-Porten Step */}
          {loginStep === 'id-porten' && (
            <div className="space-y-4">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-800 mb-1">Secure Login with ID-Porten</h3>
                <p className="text-sm text-green-700">A new tab will open for secure authentication. This tab will redirect automatically.</p>
              </div>

              <Button 
                onClick={handleIDPortenLogin}
                className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Continue with ID-Porten
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <Button 
                variant="ghost" 
                onClick={() => setLoginStep('email')}
                className="w-full"
                disabled={isLoading}
              >
                Back to email
              </Button>
            </div>
          )}

          {/* Microsoft Entra ID Step */}
          {loginStep === 'entra-id' && (
            <div className="space-y-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200 mb-4">
                <Building2 className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <p className="text-sm font-medium text-blue-800">{getOrganizationName()}</p>
                <p className="text-xs text-blue-600">{email}</p>
              </div>

              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="w-8 h-8 bg-blue-600 rounded mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">MS</span>
                </div>
                <h3 className="font-semibold text-blue-800 mb-1">Microsoft Entra ID Login</h3>
                <p className="text-sm text-blue-700">A new tab will open for secure authentication. This tab will redirect automatically.</p>
              </div>

              {error && (
                <Alert variant="destructive" className="border-red-200 bg-red-50/80">
                  <AlertDescription className="text-red-800 font-medium">{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                onClick={handleEntraIDLogin}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Continue with Microsoft Entra ID
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <Button 
                variant="ghost" 
                onClick={() => setLoginStep('email')}
                className="w-full"
                disabled={isLoading}
              >
                Back to email
              </Button>
            </div>
          )}

          {/* Demo Accounts Section */}
          {loginStep === 'email' && (
            <div className="mt-6 p-4 bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-lg border border-slate-100">
              <p className="text-sm font-semibold text-slate-800 mb-3">Demo Accounts:</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-white rounded border">
                  <div>
                    <p className="text-xs font-medium">Guardian (ID-Porten)</p>
                    <p className="text-xs text-slate-600">guardian@example.com</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEmail('guardian@example.com')}
                    className="text-xs"
                  >
                    Use
                  </Button>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-white rounded border">
                  <div>
                    <p className="text-xs font-medium">Public Staff (Entra ID)</p>
                    <p className="text-xs text-slate-600">staff@oslo.kommune.no</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEmail('staff@oslo.kommune.no')}
                    className="text-xs"
                  >
                    Use
                  </Button>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-white rounded border">
                  <div>
                    <p className="text-xs font-medium">Private Partner (Entra ID)</p>
                    <p className="text-xs text-slate-600">partner@ist.com</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEmail('partner@ist.com')}
                    className="text-xs"
                  >
                    Use
                  </Button>
                </div>

                <div className="flex justify-between items-center p-2 bg-white rounded border">
                  <div>
                    <p className="text-xs font-medium">Admin (Entra ID)</p>
                    <p className="text-xs text-slate-600">admin@admin.oslo.kommune.no</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEmail('admin@admin.oslo.kommune.no')}
                    className="text-xs"
                  >
                    Use
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
