
import ChildNotesSystem from '@/components/educator/ChildNotesSystem';
import { Child } from './EducatorAttendance';

// Mock children data - in real app this would come from props or context
const mockChildren: Child[] = [
  {
    id: '1',
    name: 'Emma Larsen',
    age: '4 years',
    department: 'Sunshine Room',
    guardian: 'Anna Larsen',
    phone: '+47 123 45 678',
    status: 'present',
    checkInTime: '08:30',
    expectedPickupTime: '15:30',
    currentLocation: 'Classroom',
    medicalAlerts: ['Nut allergy'],
    missingConsents: [],
    unreadMessages: 0,
    notes: ['Had a great morning playing with blocks'],
    pickupDelegates: ['Erik Larsen (Father)', 'Ingrid Hansen (Grandmother)']
  },
  {
    id: '2',
    name: 'Oliver Hansen',
    age: '5 years',
    department: 'Rainbow Group',
    guardian: 'Maria Hansen',
    phone: '+47 987 65 432',
    status: 'absent',
    expectedPickupTime: '16:00',
    currentLocation: '',
    medicalAlerts: [],
    missingConsents: ['Photo consent'],
    unreadMessages: 1,
    notes: [],
    pickupDelegates: ['Erik Hansen (Father)']
  }
];

const EducatorNotes = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Child Notes & Documentation</h1>
          <p className="text-slate-600 mt-1">Record and manage individual child observations and notes</p>
        </div>
      </div>

      <ChildNotesSystem children={mockChildren} />
    </div>
  );
};

export default EducatorNotes;
