
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { mockApplications } from '@/types/application';

const ApplicationEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const application = mockApplications.find(app => app.id === id);
    
    if (application) {
      // Redirect to the standard wizard with prefilled data
      navigate('/caseworker/manual-application', { 
        state: { 
          prefillData: application,
          isResuming: true 
        } 
      });
    } else {
      // If application not found, redirect back
      navigate('/caseworker/applications/in-progress');
    }
  }, [id, navigate]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-oslo-blue mx-auto mb-4"></div>
        <p className="text-gray-600">Loading application...</p>
      </div>
    </div>
  );
};

export default ApplicationEdit;
