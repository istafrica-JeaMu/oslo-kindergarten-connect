
import AppointmentBookingSystem from '@/components/educator/AppointmentBookingSystem';

const EducatorAppointments = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Guardian Appointments</h1>
          <p className="text-slate-600 mt-1">Manage parent-teacher conferences and meetings</p>
        </div>
      </div>

      <AppointmentBookingSystem />
    </div>
  );
};

export default EducatorAppointments;
