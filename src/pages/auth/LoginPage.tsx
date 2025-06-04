
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loader2, Eye, EyeOff, GraduationCap } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{email?: string; password?: string}>({});
  
  const { user, login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  if (user) {
    const redirectPath = `/${user.role}`;
    return <Navigate to={redirectPath} replace />;
  }

  const validateForm = () => {
    const errors: {email?: string; password?: string} = {};
    
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setValidationErrors({});
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const success = await login(email, password);
      if (success) {
        // Success feedback will be handled by redirect
        console.log('Login successful');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
    setValidationErrors({});
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const success = await login(demoEmail, demoPassword);
      if (!success) {
        setError('Demo login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during demo login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-8 pb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-lg ring-4 ring-blue-100">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-3">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              {t('auth.login')}
            </CardTitle>
            <CardDescription className="text-slate-600 text-base font-medium">
              Sign in to access the IST Platform
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-semibold text-slate-800">
                {t('auth.email')} *
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (validationErrors.email) {
                    setValidationErrors(prev => ({...prev, email: undefined}));
                  }
                }}
                required
                placeholder="Enter your email address"
                className={`h-12 border-2 transition-all duration-200 ${
                  validationErrors.email 
                    ? 'border-red-400 focus:border-red-500 bg-red-50' 
                    : 'border-slate-200 focus:border-blue-500 hover:border-slate-300'
                }`}
                disabled={isLoading}
                aria-describedby={validationErrors.email ? "email-error" : undefined}
              />
              {validationErrors.email && (
                <p id="email-error" className="text-sm text-red-600 font-medium flex items-center gap-1" role="alert">
                  {validationErrors.email}
                </p>
              )}
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-semibold text-slate-800">
                {t('auth.password')} *
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (validationErrors.password) {
                      setValidationErrors(prev => ({...prev, password: undefined}));
                    }
                  }}
                  required
                  placeholder="Enter your password"
                  className={`h-12 pr-12 border-2 transition-all duration-200 ${
                    validationErrors.password 
                      ? 'border-red-400 focus:border-red-500 bg-red-50' 
                      : 'border-slate-200 focus:border-blue-500 hover:border-slate-300'
                  }`}
                  disabled={isLoading}
                  aria-describedby={validationErrors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors p-1 rounded-md hover:bg-slate-100"
                  disabled={isLoading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {validationErrors.password && (
                <p id="password-error" className="text-sm text-red-600 font-medium flex items-center gap-1" role="alert">
                  {validationErrors.password}
                </p>
              )}
            </div>

            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50/80 backdrop-blur-sm">
                <AlertDescription className="text-red-800 font-medium">{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                t('auth.loginButton')
              )}
            </Button>
          </form>

          <div className="mt-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-xl border border-slate-100">
            <p className="text-sm font-semibold text-slate-800 mb-4">Demo Accounts:</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Guardian Account</p>
                  <p className="text-xs text-slate-600">guardian@example.com</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('guardian@example.com', 'password')}
                  disabled={isLoading}
                  className="text-xs border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                >
                  Try Demo
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Case Worker</p>
                  <p className="text-xs text-slate-600">caseworker@oslo.kommune.no</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('caseworker@oslo.kommune.no', 'password')}
                  disabled={isLoading}
                  className="text-xs border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                >
                  Try Demo
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Administrator</p>
                  <p className="text-xs text-slate-600">admin@oslo.kommune.no</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('admin@oslo.kommune.no', 'password')}
                  disabled={isLoading}
                  className="text-xs border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                >
                  Try Demo
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
