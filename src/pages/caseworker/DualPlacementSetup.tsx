
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { mockApplications } from '@/types/application';
import { DualPlacement } from '@/types/dualPlacement';
import DualPlacementWizard from '@/components/caseworker/DualPlacementWizard';
import { toast } from 'sonner';

const DualPlacementSetup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const application = mockApplications.find(app => app.id === id);
  
  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Application Not Found</h2>
            <p className="text-gray-600 mb-4">The application you're looking for doesn't exist.</p>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleComplete = (placement: DualPlacement) => {
    console.log('Dual placement created:', placement);
    toast.success(`Dual placement configured for ${application.childName}`);
    navigate(`/caseworker/application/${application.id}`);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Application
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Dual Placement Setup</h1>
          <p className="text-gray-600 mt-2">Configure dual kindergarten placement for {application.childName}</p>
        </div>

        <DualPlacementWizard
          applicationId={application.id}
          childName={application.childName}
          onComplete={handleComplete}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default DualPlacementSetup;
