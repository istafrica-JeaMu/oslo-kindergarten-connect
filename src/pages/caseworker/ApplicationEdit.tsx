
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { mockApplications } from '@/types/application';
import ManualApplicationForm from '@/components/caseworker/ManualApplicationForm';

const ApplicationEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const application = mockApplications.find(app => app.id === id);
  
  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Application Not Found</h2>
            <p className="text-gray-600 mb-4">The application you're trying to edit doesn't exist.</p>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Applications
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Application</h1>
              <p className="text-gray-600">{application.id} - {application.childName}</p>
            </div>
          </div>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Application Form</CardTitle>
          </CardHeader>
          <CardContent>
            <ManualApplicationForm initialData={application} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationEdit;
