
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Search, Filter, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockApplications } from '@/types/application';
import ApplicationTable from '@/components/caseworker/ApplicationTable';
import { useState } from 'react';

const ApplicationsFollowUp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter applications with 'flagged' status
  const followUpApplications = mockApplications.filter(app => app.status === 'flagged');
  
  // Apply search filter
  const filteredApplications = followUpApplications.filter(app =>
    app.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.guardianName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const highPriorityCount = followUpApplications.filter(app => app.priority === 'high').length;

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Applications Needing Follow-up</h1>
              <p className="text-gray-600 mt-1">
                {followUpApplications.length} applications requiring additional attention
                {highPriorityCount > 0 && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {highPriorityCount} urgent
                  </span>
                )}
              </p>
            </div>
            <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Reminders
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Follow-up Required
              </CardTitle>
              <CardDescription>
                Applications flagged for missing documents, information, or review
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

      {followUpApplications.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-red-900">Action Required</p>
                  <p className="text-sm text-red-700">
                    Review flagged applications and contact guardians for missing documentation. 
                    High priority cases require immediate attention.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-amber-900">Communication Tips</p>
                  <p className="text-sm text-amber-700">
                    Send clear, specific requests to guardians. Use templates for common 
                    documentation requirements to speed up the process.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ApplicationsFollowUp;
