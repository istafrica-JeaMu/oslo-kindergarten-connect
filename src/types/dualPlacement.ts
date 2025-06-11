
export interface DualPlacement {
  id: string;
  childId: string;
  primaryKindergarten: {
    id: string;
    name: string;
    schedule: WeeklySchedule;
    custodyPercentage: number;
  };
  secondaryKindergarten: {
    id: string;
    name: string;
    schedule: WeeklySchedule;
    custodyPercentage: number;
  };
  status: 'pending' | 'approved' | 'active' | 'rejected';
  createdAt: string;
  approvedAt?: string;
  justification: string;
  supportingDocuments: string[];
  linkedPlacementId?: string;
}

export interface WeeklySchedule {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
}

export interface ScheduleChangeRequest {
  id: string;
  dualPlacementId: string;
  requestType: 'temporary' | 'permanent' | 'seasonal';
  proposedChanges: {
    primarySchedule: WeeklySchedule;
    secondarySchedule: WeeklySchedule;
    newCustodyPercentages: {
      primary: number;
      secondary: number;
    };
  };
  reason: string;
  requestedBy: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  comments?: string;
}

export const mockDualPlacements: DualPlacement[] = [
  {
    id: 'DP-2024-001',
    childId: 'APP-2024-003', // Oscar Hansen - Emergency application
    primaryKindergarten: {
      id: 'kg-001',
      name: 'Grünerløkka Barnehage',
      schedule: {
        monday: true,
        tuesday: true,
        wednesday: false,
        thursday: false,
        friday: true
      },
      custodyPercentage: 60
    },
    secondaryKindergarten: {
      id: 'kg-002',
      name: 'Sagene Barnehage',
      schedule: {
        monday: false,
        tuesday: false,
        wednesday: true,
        thursday: true,
        friday: false
      },
      custodyPercentage: 40
    },
    status: 'active',
    createdAt: '2024-06-08',
    approvedAt: '2024-06-10',
    justification: 'Split custody arrangement - parents live in different districts',
    supportingDocuments: ['custody-agreement.pdf', 'address-verification.pdf']
  }
];
