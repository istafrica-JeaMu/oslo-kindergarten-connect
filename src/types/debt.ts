
export type DebtStatus = 'active' | 'overdue' | 'in_collection' | 'legal_action' | 'settled' | 'written_off';

export type EscalationLevel = 'early_warning' | 'first_notice' | 'final_notice' | 'collection_agency' | 'legal_action' | 'write_off';

export type PaymentMethod = 'bank_transfer' | 'card' | 'cash' | 'check' | 'direct_debit' | 'payment_plan';

export type CommunicationType = 'email' | 'sms' | 'postal' | 'phone' | 'in_person';

export type DebtManagementType = 'standard' | 'priority' | 'hardship' | 'legal' | 'agency';

export type CollectionStrategy = 'gentle' | 'standard' | 'aggressive' | 'legal_only' | 'hardship_sensitive';

export type LegalActionType = 'court_filing' | 'enforcement' | 'wage_garnishment' | 'asset_seizure' | 'bankruptcy';

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
  hardshipStatus?: 'none' | 'temporary' | 'permanent';
  communicationPreference: CommunicationType;
  lastContactDate?: string;
  fraudRiskScore: number;
  paymentBehaviorPattern: 'reliable' | 'inconsistent' | 'poor' | 'defaulter';
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
  collectionStrategy: CollectionStrategy;
  assignedCollector?: string;
  nextActionDate?: string;
  legalAction?: LegalAction;
  aiPredictions: DebtPredictions;
  complianceFlags: ComplianceFlag[];
}

export interface PaymentPlan {
  id: string;
  debtId: string;
  totalAmount: number;
  installmentAmount: number;
  installmentCount: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'defaulted' | 'cancelled' | 'modified';
  installments: PaymentInstallment[];
  autoDeduct: boolean;
  failedPayments: number;
  nextDueDate: string;
  modificationHistory: PaymentPlanModification[];
}

export interface PaymentInstallment {
  id: string;
  planId: string;
  dueDate: string;
  amount: number;
  paidDate?: string;
  paidAmount?: number;
  status: 'pending' | 'paid' | 'overdue' | 'partial' | 'failed';
  attemptedDate?: string;
  failureReason?: string;
}

export interface PaymentPlanModification {
  id: string;
  planId: string;
  modificationDate: string;
  oldAmount: number;
  newAmount: number;
  reason: string;
  approvedBy: string;
}

export interface DebtTransaction {
  id: string;
  debtId: string;
  type: 'payment' | 'charge' | 'adjustment' | 'refund' | 'write_off' | 'fee' | 'interest';
  amount: number;
  transactionDate: string;
  paymentMethod?: PaymentMethod;
  referenceNumber?: string;
  description: string;
  processedBy: string;
  bankReference?: string;
  gatewayTransactionId?: string;
  reconciliationStatus: 'pending' | 'matched' | 'disputed' | 'failed';
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
  escalationTrigger: boolean;
  automatedSend: boolean;
  deliveryAttempts: number;
  trackingId?: string;
}

export interface LegalAction {
  id: string;
  debtId: string;
  actionType: LegalActionType;
  filingDate: string;
  courtReference?: string;
  lawyer?: string;
  estimatedCost: number;
  actualCost?: number;
  outcome?: 'pending' | 'successful' | 'unsuccessful' | 'settled' | 'withdrawn';
  enforcementDate?: string;
  recoveredAmount?: number;
  documents: LegalDocument[];
}

export interface LegalDocument {
  id: string;
  legalActionId: string;
  documentType: 'filing' | 'notice' | 'judgment' | 'enforcement' | 'settlement';
  documentUrl: string;
  createdDate: string;
  filedWithCourt: boolean;
}

export interface DebtPredictions {
  paymentLikelihood: number; // 0-100
  optimalContactTime: string;
  recommendedStrategy: CollectionStrategy;
  estimatedRecoveryAmount: number;
  timeToResolution: number; // days
  fraudRisk: number; // 0-100
  hardshipRisk: number; // 0-100
  lastUpdated: string;
}

export interface ComplianceFlag {
  id: string;
  debtId: string;
  flagType: 'gdpr_violation' | 'collection_law_violation' | 'child_protection' | 'audit_requirement';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  flaggedDate: string;
  resolvedDate?: string;
  resolvedBy?: string;
  automaticFlag: boolean;
}

export interface PaymentHistoryEntry {
  id: string;
  guardianId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  status: 'completed' | 'pending' | 'failed' | 'disputed' | 'refunded';
  debtId?: string;
  gatewayReference?: string;
  bankReference?: string;
  processingFee?: number;
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
  riskScore: {
    min?: number;
    max?: number;
  };
  assignedCollector: string;
  fraudRisk: 'low' | 'medium' | 'high' | 'all';
  communicationStatus: 'pending' | 'sent' | 'responded' | 'all';
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
    recoveryRate: number;
  }[];
  collectionEfficiency: {
    averageTimeToCollection: number;
    successRateByMethod: Record<CommunicationType, number>;
    costPerCollection: number;
    totalCollectionCosts: number;
  };
  predictiveAnalytics: {
    projectedCollections: number;
    atRiskDebts: number;
    hardshipCases: number;
    fraudAlerts: number;
  };
  legalActionMetrics: {
    totalLegalCases: number;
    legalSuccessRate: number;
    averageLegalCost: number;
    legalRecoveryAmount: number;
  };
}

export interface BulkDebtAction {
  type: 'escalate' | 'send_notice' | 'create_payment_plan' | 'write_off' | 'assign_collector' | 'legal_action' | 'update_strategy';
  debtIds: string[];
  parameters?: {
    escalationLevel?: EscalationLevel;
    templateId?: string;
    collectorId?: string;
    paymentPlanTerms?: {
      installmentAmount: number;
      installmentCount: number;
      startDate: string;
    };
    strategy?: CollectionStrategy;
    legalActionType?: LegalActionType;
    writeOffReason?: string;
  };
}

export interface DebtWorkflowRule {
  id: string;
  name: string;
  conditions: {
    daysOverdue?: number;
    amountThreshold?: number;
    escalationLevel?: EscalationLevel;
    paymentHistory?: 'good' | 'poor' | 'none';
    riskScore?: number;
  };
  actions: {
    autoEscalate?: boolean;
    sendNotification?: boolean;
    assignCollector?: boolean;
    createPaymentPlan?: boolean;
    flagForLegal?: boolean;
  };
  isActive: boolean;
  priority: number;
}

export interface CollectionAgent {
  id: string;
  name: string;
  email: string;
  phone: string;
  specializations: DebtManagementType[];
  activeDebtCount: number;
  totalCollected: number;
  successRate: number;
  isActive: boolean;
  workload: 'light' | 'normal' | 'heavy' | 'overloaded';
}

export interface PaymentGateway {
  id: string;
  name: string;
  isActive: boolean;
  supportedMethods: PaymentMethod[];
  transactionFee: number;
  minimumAmount: number;
  maximumAmount: number;
  processingTime: string;
  apiCredentials: {
    merchantId: string;
    apiKey: string;
    webhookUrl: string;
  };
}

export interface DebtAuditLog {
  id: string;
  debtId: string;
  action: string;
  performedBy: string;
  performedAt: string;
  oldValue?: any;
  newValue?: any;
  ipAddress: string;
  userAgent: string;
  reason?: string;
}

export interface DebtReportConfig {
  id: string;
  name: string;
  reportType: 'aging' | 'collection_efficiency' | 'legal_action' | 'payment_plans' | 'compliance' | 'custom';
  filters: DebtFilters;
  columns: string[];
  format: 'excel' | 'pdf' | 'csv';
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    time: string;
    recipients: string[];
  };
  isActive: boolean;
}
