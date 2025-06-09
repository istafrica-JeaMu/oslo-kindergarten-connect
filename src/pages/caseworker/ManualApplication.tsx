
import { useLocation } from 'react-router-dom';
import ManualApplicationForm from '@/components/caseworker/ManualApplicationForm';

const ManualApplication = () => {
  const location = useLocation();
  const prefillData = location.state?.prefillData;
  const isResuming = location.state?.isResuming;

  return <ManualApplicationForm prefillData={prefillData} isResuming={isResuming} />;
};

export default ManualApplication;
