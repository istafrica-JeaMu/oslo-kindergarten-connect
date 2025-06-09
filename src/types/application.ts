
export interface Application {
  id: string;
  childName: string;
  guardianName: string;
  applicationType: 'New Registration' | 'Transfer' | 'Extension' | 'Emergency';
  status: 'draft' | 'submitted' | 'flagged' | 'approved' | 'rejected';
  createdAt: string;
  lastModified: string;
  priority: 'low' | 'medium' | 'high';
  kindergartenPreference?: string;
  notes?: string;
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
    kindergartenPreference: 'Majorstuen Barnehage'
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
    kindergartenPreference: 'Bislett Barnehage'
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
    kindergartenPreference: 'Sagene Barnehage'
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
    kindergartenPreference: 'St. Hanshaugen Barnehage'
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
    notes: 'Guardian contact information outdated'
  }
];
