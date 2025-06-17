
export type DebtStatus = 'active' | 'overdue' | 'in_collection' | 'legal_action' | 'settled' | 'written_off';

export type EscalationLevel = 'early_warning' | 'first_notice' | 'final_notice' | 'collection_agency' | 'legal_action' | 'write_off';

export type PaymentMethod = 'bank_transfer' | 'card' | 'cash' | 'check' | 'direct_debit' | 'payment_plan';

export type CommunicationType = 'email' | 'sms' | 'postal' | 'phone' | 'in_person';

export type DebtManagementType = 'standard' | 'priority' | 'hardship' | 'legal' | 'agency';

export interface Guardian {
  id: string;
  civicNumber: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email?: string;
  phone?: string;
  address?: string;
  paymentHistory: PaymentHistoryEntry[];
  riskScore: number;
}

export interface Child {
  id: string;
  civicNumber: string;
  firstName: string;
  lastName: string;
  fullName: string;
  guardianId: string;
  unitId: string;
  unitName: string;
}

export interface DebtRecord {
  id: string;
  guardianId: string;
  guardian: Guardian;
  childId: string;
  child: Child;
  originalAmount: number;
  outstandingAmount: number;
  paidAmount: number;
  dueDate: string;
  createdDate: string;
  lastPaymentDate?: string;
  daysOverdue: number;
  status: DebtStatus;
  escalationLevel: EscalationLevel;
  managementType: DebtManagementType;
  unitId: string;
  unitName: string;
  municipality: 'förskola' | 'fritidshem';
  description: string;
  notes: string[];
  paymentPlan?: PaymentPlan;
  communications: DebtCommunication[];
  transactions: DebtTransaction[];
}

export interface PaymentPlan {
  id: string;
  debtId: string;
  totalAmount: number;
  installmentAmount: number;
  installmentCount: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'defaulted' | 'cancelled';
  installments: PaymentInstallment[];
}

export interface PaymentInstallment {
  id: string;
  planId: string;
  dueDate: string;
  amount: number;
  paidDate?: string;
  paidAmount?: number;
  status: 'pending' | 'paid' | 'overdue' | 'partial';
}

export interface DebtTransaction {
  id: string;
  debtId: string;
  type: 'payment' | 'charge' | 'adjustment' | 'refund' | 'write_off';
  amount: number;
  transactionDate: string;
  paymentMethod?: PaymentMethod;
  referenceNumber?: string;
  description: string;
  processedBy: string;
}

export interface DebtCommunication {
  id: string;
  debtId: string;
  type: CommunicationType;
  templateId?: string;
  subject: string;
  content: string;
  sentDate: string;
  deliveryStatus: 'sent' | 'delivered' | 'read' | 'failed' | 'bounced';
  responseDate?: string;
  responseContent?: string;
  sentBy: string;
}

export interface PaymentHistoryEntry {
  id: string;
  guardianId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  status: 'completed' | 'pending' | 'failed';
  debtId?: string;
}

export interface DebtFilters {
  search: string;
  municipality: 'förskola' | 'fritidshem' | '';
  district: string;
  unit: string;
  status: DebtStatus | 'all';
  escalationLevel: EscalationLevel | 'all';
  managementType: DebtManagementType | 'all';
  amountRange: {
    min?: number;
    max?: number;
  };
  daysOverdueRange: {
    min?: number;
    max?: number;
  };
  dateRange: {
    start?: string;
    end?: string;
  };
  showOnlyCurrentUnits: boolean;
  hasPaymentPlan: boolean | 'all';
}

export interface DebtAnalytics {
  totalOutstanding: number;
  totalDebts: number;
  averageDebtAmount: number;
  collectionRate: number;
  debtsByStatus: Record<DebtStatus, number>;
  debtsByEscalation: Record<EscalationLevel, number>;
  monthlyTrends: {
    month: string;
    newDebts: number;
    collected: number;
    outstanding: number;
  }[];
}

export interface BulkDebtAction {
  type: 'escalate' | 'send_notice' | 'create_payment_plan' | 'write_off' | 'assign_collector';
  debtIds: string[];
  parameters?: Record<string, any>;
}
