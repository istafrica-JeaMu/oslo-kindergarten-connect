
export interface Application {
  id: string;
  childName: string;
  guardianName: string;
  applicationType: 'New Registration' | 'Transfer' | 'Extension' | 'Emergency' | 'Dual Placement';
  status: 'draft' | 'submitted' | 'flagged' | 'approved' | 'rejected';
  createdAt: string;
  lastModified: string;
  priority: 'low' | 'medium' | 'high';
  kindergartenPreference?: string;
  secondaryKindergartenPreference?: string;
  placementType?: 'single' | 'dual';
  notes?: string;
  isDualPlacement?: boolean;
  dualPlacementId?: string;
}

export const mockApplications: Application[] = [
  // In Progress (draft status)
  {
    id: 'APP-2024-001',
    childName: 'Lina Berg',
    guardianName: 'Jon Berg',
    applicationType: 'Transfer',
    status: 'draft',
    createdAt: '2024-06-12',
    lastModified: '2024-06-15',
    priority: 'medium',
    kindergartenPreference: 'Frogner Barnehage',
    placementType: 'single',
    notes: 'Waiting for medical records'
  },
  {
    id: 'APP-2024-002',
    childName: 'Emma Nordahl',
    guardianName: 'Kari Nordahl',
    applicationType: 'New Registration',
    status: 'draft',
    createdAt: '2024-06-10',
    lastModified: '2024-06-14',
    priority: 'low',
    kindergartenPreference: 'Majorstuen Barnehage',
    placementType: 'single'
  },
  {
    id: 'APP-2024-003',
    childName: 'Oscar Hansen',
    guardianName: 'Lars Hansen',
    applicationType: 'Emergency',
    status: 'draft',
    createdAt: '2024-06-08',
    lastModified: '2024-06-13',
    priority: 'high',
    kindergartenPreference: 'Grünerløkka Barnehage',
    placementType: 'single',
    notes: 'Urgent placement needed'
  },

  // Submitted applications
  {
    id: 'APP-2024-004',
    childName: 'Sofia Andersen',
    guardianName: 'Maria Andersen',
    applicationType: 'New Registration',
    status: 'submitted',
    createdAt: '2024-06-05',
    lastModified: '2024-06-11',
    priority: 'medium',
    kindergartenPreference: 'Bislett Barnehage',
    placementType: 'single'
  },
  {
    id: 'APP-2024-005',
    childName: 'Noah Kristensen',
    guardianName: 'Erik Kristensen',
    applicationType: 'Transfer',
    status: 'submitted',
    createdAt: '2024-06-03',
    lastModified: '2024-06-09',
    priority: 'low',
    kindergartenPreference: 'Sagene Barnehage',
    placementType: 'single'
  },
  {
    id: 'APP-2024-006',
    childName: 'Maja Olsen',
    guardianName: 'Tone Olsen',
    applicationType: 'Extension',
    status: 'submitted',
    createdAt: '2024-06-01',
    lastModified: '2024-06-07',
    priority: 'medium',
    kindergartenPreference: 'St. Hanshaugen Barnehage',
    placementType: 'single'
  },

  // Needs Follow-up (flagged status)
  {
    id: 'APP-2024-007',
    childName: 'Elias Pettersen',
    guardianName: 'Anne Pettersen',
    applicationType: 'New Registration',
    status: 'flagged',
    createdAt: '2024-05-28',
    lastModified: '2024-06-04',
    priority: 'high',
    kindergartenPreference: 'Grønland Barnehage',
    placementType: 'single',
    notes: 'Missing birth certificate and vaccination records'
  },
  {
    id: 'APP-2024-008',
    childName: 'Isabella Johansen',
    guardianName: 'Tom Johansen',
    applicationType: 'Transfer',
    status: 'flagged',
    createdAt: '2024-05-25',
    lastModified: '2024-06-02',
    priority: 'medium',
    kindergartenPreference: 'Tøyen Barnehage',
    placementType: 'single',
    notes: 'Income verification required'
  },
  {
    id: 'APP-2024-009',
    childName: 'Alexander Nilsen',
    guardianName: 'Lise Nilsen',
    applicationType: 'Emergency',
    status: 'flagged',
    createdAt: '2024-05-20',
    lastModified: '2024-05-30',
    priority: 'high',
    kindergartenPreference: 'Gamle Oslo Barnehage',
    placementType: 'single',
    notes: 'Guardian contact information outdated'
  },

  // Dual Placement Application
  {
    id: 'APP-2024-010',
    childName: 'Erik Svendsen',
    guardianName: 'Nina Svendsen',
    applicationType: 'Dual Placement',
    status: 'submitted',
    createdAt: '2024-06-01',
    lastModified: '2024-06-05',
    priority: 'medium',
    kindergartenPreference: 'Frogner Barnehage',
    secondaryKindergartenPreference: 'Majorstuen Barnehage',
    placementType: 'dual',
    isDualPlacement: true,
    dualPlacementId: 'DP-2024-001',
    notes: 'Dual custody arrangement - needs placement at both locations'
  }
];
