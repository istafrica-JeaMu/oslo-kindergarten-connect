
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Search, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockApplications } from '@/types/application';
import ApplicationTable from '@/components/caseworker/ApplicationTable';
import { useState } from 'react';

const ApplicationsInProgress = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter applications with 'draft' status
  const inProgressApplications = mockApplications.filter(app => app.status === 'draft');
  
  // Apply search filter
  const filteredApplications = inProgressApplications.filter(app =>
    app.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.guardianName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-amber-500 bg-gradient-to-r from-amber-50 to-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Applications In Progress</h1>
              <p className="text-gray-600 mt-1">
                {inProgressApplications.length} applications currently being processed
              </p>
            </div>
            <Button className="bg-oslo-blue hover:bg-oslo-blue/90">
              <Plus className="h-4 w-4 mr-2" />
              New Application
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-600" />
                In Progress Applications
              </CardTitle>
              <CardDescription>
                Applications that have been started but not yet submitted
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

      {inProgressApplications.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-blue-900">Quick Tip</p>
                <p className="text-sm text-blue-700">
                  Applications in progress can be resumed by clicking the "Resume" button. 
                  Help guardians complete their applications to move them to submitted status.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ApplicationsInProgress;
