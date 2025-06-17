
export interface Child {
  id: string;
  civicNumber: string;
  firstName: string;
  lastName: string;
  fullName: string;
  birthDate: string;
  specialNeedsFlag: boolean;
  profileImage?: string;
  emergencyContacts: EmergencyContact[];
  medicalInfo: MedicalInfo;
  guardians: Guardian[];
}

export interface Guardian {
  id: string;
  childId: string;
  firstName: string;
  lastName: string;
  relationshipType: 'mother' | 'father' | 'guardian' | 'other';
  contactInfo: ContactInfo;
  isPrimary: boolean;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  canPickup: boolean;
}

export interface MedicalInfo {
  allergies: string[];
  medications: string[];
  specialNeeds: string[];
  doctorInfo?: string;
  insuranceInfo?: string;
}

export interface Admission {
  id: string;
  childId: string;
  child: Child;
  department: Department;
  departmentId: string;
  admissionStart: string;
  endDate: string;
  startDate: string;
  changeStop?: string;
  rateCategory: RateCategory;
  averageTime: string;
  reasonType: string;
  timetable: Timetable;
  journalNotes: JournalNote[];
  status: 'active' | 'future' | 'historical' | 'terminated' | 'deleted';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface Department {
  id: string;
  name: string;
  unitId: string;
  unitName: string;
  capacity: number;
  currentEnrollment: number;
  ageMin: number;
  ageMax: number;
  staffRatio: number;
  municipality: 'förskola' | 'fritidshem';
}

export interface RateCategory {
  id: string;
  name: string;
  hourlyRate: number;
  ageGroup: string;
  municipalityId: string;
  description?: string;
}

export interface Timetable {
  id: string;
  schedulePattern: 'full-time' | 'part-time' | 'flexible';
  weeklyHours: number;
  dailySchedule: DailySchedule[];
  contractedHours: string;
}

export interface DailySchedule {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  hours: number;
}

export interface JournalNote {
  id: string;
  admissionId: string;
  content: string;
  createdAt: string;
  createdBy: string;
  type: 'general' | 'medical' | 'behavioral' | 'academic' | 'communication';
}

export interface AdmissionEvent {
  id: string;
  admissionId: string;
  eventType: 'created' | 'modified' | 'transferred' | 'terminated' | 'suspended';
  description: string;
  eventDate: string;
  createdBy: string;
  metadata?: Record<string, any>;
}

export interface TerminationRequest {
  id: string;
  admissionId: string;
  requestedDate: string;
  reasonCode: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedBy: string;
  approvedBy?: string;
  approvedAt?: string;
}

export interface ChangeRequest {
  id: string;
  admissionId: string;
  changeType: 'department' | 'schedule' | 'rate_category' | 'other';
  requestedChanges: Record<string, any>;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'implemented';
  requestedBy: string;
  requestedAt: string;
  approvedBy?: string;
  approvedAt?: string;
}

export type AdmissionTab = 
  | 'current' 
  | 'future' 
  | 'future-changes' 
  | 'historical' 
  | 'all' 
  | 'deleted' 
  | 'terminated';

export type Municipality = 'förskola' | 'fritidshem';

export interface FilterState {
  search: string;
  department: string;
  rateCategory: string;
  reasonType: string;
  dateRange: {
    start?: string;
    end?: string;
  };
  showOnlyCurrentUnits: boolean;
}

export interface BulkAction {
  type: 'create_addons' | 'enrollment' | 'request_replace' | 'replace' | 'change_admission' | 'send_email' | 'terminate';
  selectedIds: string[];
  data?: Record<string, any>;
}

export interface CapacityInfo {
  departmentId: string;
  totalCapacity: number;
  currentEnrollment: number;
  availableSpots: number;
  waitlistCount: number;
  utilizationPercentage: number;
}

export interface NotificationRule {
  id: string;
  eventType: string;
  recipientRole: string;
  templateId: string;
  conditions: Record<string, any>;
  isActive: boolean;
}
