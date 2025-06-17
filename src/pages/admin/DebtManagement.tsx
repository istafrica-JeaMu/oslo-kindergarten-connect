
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, DollarSign, Download, Send } from 'lucide-react';
import DebtHeader from '@/components/admin/debt/DebtHeader';
import DebtFilters from '@/components/admin/debt/DebtFilters';
import DebtTable from '@/components/admin/debt/DebtTable';
import DebtAnalytics from '@/components/admin/debt/DebtAnalytics';
import BulkDebtActions from '@/components/admin/debt/BulkDebtActions';
import DebtCommunicationModal from '@/components/admin/debt/DebtCommunicationModal';
import PaymentModal from '@/components/admin/debt/PaymentModal';
import { DebtRecord, DebtFilters as DebtFiltersType, DebtAnalytics as DebtAnalyticsType } from '@/types/debt';

const DebtManagement = () => {
  const [selectedMunicipality, setSelectedMunicipality] = useState<'förskola' | 'fritidshem'>('förskola');
  const [selectedDistrict, setSelectedDistrict] = useState('Norra Distriktet');
  const [showOnlyCurrentUnits, setShowOnlyCurrentUnits] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [sortField, setSortField] = useState<string>('daysOverdue');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isCommunicationModalOpen, setIsCommunicationModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState<DebtRecord | null>(null);

  const [filters, setFilters] = useState<DebtFiltersType>({
    search: '',
    municipality: '',
    district: '',
    unit: '',
    status: 'all',
    escalationLevel: 'all',
    managementType: 'all',
    amountRange: {},
    daysOverdueRange: {},
    dateRange: {},
    showOnlyCurrentUnits: false,
    hasPaymentPlan: 'all'
  });

  // Mock debt data - in real implementation, this would come from API
  const mockDebts: DebtRecord[] = [
    {
      id: 'debt-1',
      guardianId: 'guardian-1',
      guardian: {
        id: 'guardian-1',
        civicNumber: '19850315-****',
        firstName: 'Anna',
        lastName: 'Johansson',
        fullName: 'Anna Johansson',
        email: 'anna.johansson@email.com',
        phone: '+46 70 123 4567',
        paymentHistory: [],
        riskScore: 65
      },
      childId: 'child-1',
      child: {
        id: 'child-1',
        civicNumber: '20180620-****',
        firstName: 'Erik',
        lastName: 'Johansson',
        fullName: 'Erik Johansson',
        guardianId: 'guardian-1',
        unitId: 'unit-1',
        unitName: 'Sunflower Preschool'
      },
      originalAmount: 2500,
      outstandingAmount: 2500,
      paidAmount: 0,
      dueDate: '2024-11-01',
      createdDate: '2024-10-01',
      daysOverdue: 46,
      status: 'overdue',
      escalationLevel: 'final_notice',
      managementType: 'standard',
      unitId: 'unit-1',
      unitName: 'Sunflower Preschool',
      municipality: 'förskola',
      description: 'Monthly childcare fee - October 2024',
      notes: ['Initial notice sent', 'No response received'],
      communications: [],
      transactions: []
    },
    {
      id: 'debt-2',
      guardianId: 'guardian-2',
      guardian: {
        id: 'guardian-2',
        civicNumber: '19790822-****',
        firstName: 'Maria',
        lastName: 'Andersson',
        fullName: 'Maria Andersson',
        email: 'maria.andersson@email.com',
        paymentHistory: [],
        riskScore: 45
      },
      childId: 'child-2',
      child: {
        id: 'child-2',
        civicNumber: '20200315-****',
        firstName: 'Liam',
        lastName: 'Andersson',
        fullName: 'Liam Andersson',
        guardianId: 'guardian-2',
        unitId: 'unit-2',
        unitName: 'Rainbow After-School'
      },
      originalAmount: 1800,
      outstandingAmount: 900,
      paidAmount: 900,
      dueDate: '2024-12-01',
      createdDate: '2024-11-01',
      daysOverdue: 16,
      status: 'overdue',
      escalationLevel: 'early_warning',
      managementType: 'standard',
      unitId: 'unit-2',
      unitName: 'Rainbow After-School',
      municipality: 'fritidshem',
      description: 'After-school care fee - November 2024',
      notes: ['Payment plan active'],
      communications: [],
      transactions: []
    }
  ];

  const analytics: DebtAnalyticsType = {
    totalOutstanding: 125000,
    totalDebts: 89,
    averageDebtAmount: 1404,
    collectionRate: 78.5,
    debtsByStatus: {
      active: 12,
      overdue: 34,
      in_collection: 15,
      legal_action: 3,
      settled: 156,
      written_off: 8
    },
    debtsByEscalation: {
      early_warning: 25,
      first_notice: 18,
      final_notice: 12,
      collection_agency: 8,
      legal_action: 3,
      write_off: 2
    },
    monthlyTrends: [
      { month: 'Oct', newDebts: 15, collected: 45000, outstanding: 125000 },
      { month: 'Nov', newDebts: 23, collected: 38000, outstanding: 135000 },
      { month: 'Dec', newDebts: 18, collected: 52000, outstanding: 125000 }
    ]
  };

  const filteredDebts = useMemo(() => {
    return mockDebts.filter(debt => {
      const matchesMunicipality = !filters.municipality || debt.municipality === filters.municipality;
      const matchesSearch = !filters.search || 
        debt.guardian.fullName.toLowerCase().includes(filters.search.toLowerCase()) ||
        debt.child.fullName.toLowerCase().includes(filters.search.toLowerCase()) ||
        debt.guardian.civicNumber.includes(filters.search) ||
        debt.child.civicNumber.includes(filters.search);
      const matchesStatus = filters.status === 'all' || debt.status === filters.status;
      const matchesEscalation = filters.escalationLevel === 'all' || debt.escalationLevel === filters.escalationLevel;
      const matchesUnit = !filters.unit || debt.unitName === filters.unit;

      return matchesMunicipality && matchesSearch && matchesStatus && matchesEscalation && matchesUnit;
    });
  }, [mockDebts, filters]);

  const paginatedDebts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDebts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDebts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredDebts.length / itemsPerPage);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(paginatedDebts.map(debt => debt.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows(prev => [...prev, id]);
    } else {
      setSelectedRows(prev => prev.filter(rowId => rowId !== id));
    }
  };

  const handleSendDebtMessage = (debt: DebtRecord) => {
    setSelectedDebt(debt);
    setIsCommunicationModalOpen(true);
  };

  const handleRecordPayment = (debt: DebtRecord) => {
    setSelectedDebt(debt);
    setIsPaymentModalOpen(true);
  };

  const handleBulkAction = (actionType: string, parameters?: any) => {
    console.log('Bulk debt action:', actionType, 'Selected:', selectedRows, 'Parameters:', parameters);
    // Implement bulk action logic
  };

  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    console.log('Exporting debt data as:', format);
    // Implement export logic
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <DollarSign className="w-8 h-8 text-red-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage debts, queue</h1>
          <p className="text-slate-600">Comprehensive debt management and collection system</p>
        </div>
      </div>

      <DebtHeader 
        selectedMunicipality={selectedMunicipality}
        onMunicipalityChange={setSelectedMunicipality}
        selectedDistrict={selectedDistrict}
        onDistrictChange={setSelectedDistrict}
        showOnlyCurrentUnits={showOnlyCurrentUnits}
        onShowOnlyCurrentUnitsChange={setShowOnlyCurrentUnits}
      />

      <Tabs defaultValue="queue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="queue">Debt Queue</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="space-y-6">
          <DebtFilters 
            filters={filters}
            onFiltersChange={setFilters}
          />

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Outstanding Debts</CardTitle>
                  <p className="text-sm text-slate-600">
                    {filteredDebts.length} debts • {filteredDebts.reduce((sum, debt) => sum + debt.outstandingAmount, 0).toLocaleString()} SEK outstanding
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleExport('excel')}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DebtTable 
                debts={paginatedDebts}
                selectedRows={selectedRows}
                onSelectAll={handleSelectAll}
                onSelectRow={handleSelectRow}
                onSendMessage={handleSendDebtMessage}
                onRecordPayment={handleRecordPayment}
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={(field, direction) => {
                  setSortField(field);
                  setSortDirection(direction);
                }}
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
              />
            </CardContent>
          </Card>

          <BulkDebtActions 
            selectedCount={selectedRows.length}
            onBulkAction={handleBulkAction}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <DebtAnalytics analytics={analytics} />
        </TabsContent>
      </Tabs>

      {isCommunicationModalOpen && selectedDebt && (
        <DebtCommunicationModal 
          debt={selectedDebt}
          isOpen={isCommunicationModalOpen}
          onClose={() => {
            setIsCommunicationModalOpen(false);
            setSelectedDebt(null);
          }}
        />
      )}

      {isPaymentModalOpen && selectedDebt && (
        <PaymentModal 
          debt={selectedDebt}
          isOpen={isPaymentModalOpen}
          onClose={() => {
            setIsPaymentModalOpen(false);
            setSelectedDebt(null);
          }}
        />
      )}
    </div>
  );
};

export default DebtManagement;
