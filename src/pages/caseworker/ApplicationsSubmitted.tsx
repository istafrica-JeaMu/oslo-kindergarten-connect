
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockApplications } from '@/types/application';
import ApplicationTable from '@/components/caseworker/ApplicationTable';
import { useState } from 'react';

const ApplicationsSubmitted = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter applications with 'submitted' status
  const submittedApplications = mockApplications.filter(app => app.status === 'submitted');
  
  // Apply search filter
  const filteredApplications = submittedApplications.filter(app =>
    app.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.guardianName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Submitted Applications</h1>
              <p className="text-gray-600 mt-1">
                {submittedApplications.length} completed and submitted applications
              </p>
            </div>
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Submitted Applications
              </CardTitle>
              <CardDescription>
                Successfully submitted applications ready for review and processing
              </CardDescription>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ApplicationTable applications={filteredApplications} />
        </CardContent>
      </Card>

      {submittedApplications.length > 0 && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-900">Processing Status</p>
                <p className="text-sm text-green-700">
                  All submitted applications are in the review queue. Processing typically takes 3-5 business days. 
                  You can download PDFs for record keeping or guardian communication.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ApplicationsSubmitted;
