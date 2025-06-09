
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ApplicationsFollowUp = () => {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Applications Needing Follow-up</h1>
              <p className="text-gray-600 mt-1">
                Applications requiring additional attention
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Follow-up Required</CardTitle>
              <CardDescription>3 applications need attention</CardDescription>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">Follow-up Applications</p>
            <p>This feature is coming soon. Applications requiring follow-up will appear here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationsFollowUp;
