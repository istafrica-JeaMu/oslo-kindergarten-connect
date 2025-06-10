
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GuardianChildProfile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the new children list page
    navigate('/guardian/children', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-oslo-blue"></div>
    </div>
  );
};

export default GuardianChildProfile;
