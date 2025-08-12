import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Mail, 
  Calendar, 
  FileText,
  Home,
  ArrowRight
} from 'lucide-react';

const ApplicationSuccess = () => {
  // In a real app, this would come from the submission response
  const applicationId = 'KG-2024-' + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-900">
                Application Submitted Successfully!
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-900 mb-2">Application Reference</h3>
                <p className="text-lg font-mono text-green-800 bg-white px-3 py-2 rounded border">
                  {applicationId}
                </p>
                <p className="text-sm text-green-700 mt-2">
                  Save this reference number for tracking your application
                </p>
              </div>

              <div className="text-left space-y-4">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  What happens next?
                </h3>
                
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Email Confirmation</p>
                      <p>You'll receive a confirmation email within 15 minutes with document upload instructions.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Document Upload</p>
                      <p>Upload required documents within 7 days to complete your application.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Review Process</p>
                      <p>Applications are reviewed within 2-3 weeks. You'll be notified of the outcome.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">4</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Placement Decision</p>
                      <p>If approved, you'll receive placement details and enrollment information.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-left">
                    <h4 className="font-medium text-blue-900 mb-1">Required Documents</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Child's birth certificate</li>
                      <li>• Proof of residence (utility bill or lease agreement)</li>
                      <li>• Medical certificates (if applicable)</li>
                      <li>• Income documentation for fee assessment</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link to="/kindergartens" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Browse More Kindergartens
                  </Button>
                </Link>
                <Link to="/" className="flex-1">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Home className="h-4 w-4 mr-2" />
                    Return to Homepage
                  </Button>
                </Link>
              </div>

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-slate-600">
                  Questions? Contact us at{' '}
                  <a href="mailto:applications@kindergarten.oslo.no" className="text-blue-600 hover:underline">
                    applications@kindergarten.oslo.no
                  </a>
                  {' '}or call{' '}
                  <a href="tel:+4723456789" className="text-blue-600 hover:underline">
                    +47 23 45 67 89
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSuccess;