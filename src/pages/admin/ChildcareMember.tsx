
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Download } from 'lucide-react';
import ChildcareHeader from '@/components/admin/childcare/ChildcareHeader';
import ChildcareFilters from '@/components/admin/childcare/ChildcareFilters';
import AdmissionsTable from '@/components/admin/childcare/AdmissionsTable';
import BulkActionsPanel from '@/components/admin/childcare/BulkActionsPanel';
import ChildProfileModal from '@/components/admin/childcare/ChildProfileModal';
import AdmissionModal from '@/components/admin/childcare/AdmissionModal';
import { Admission, Child, AdmissionTab, Municipality, FilterState } from '@/types/childcare';
import ExportDropdown from '@/components/admin/childcare/ExportDropdown';

const ChildcareMember = () => {
  const [selectedMunicipality, setSelectedMunicipality] = useState<Municipality>('förskola');
  const [activeTab, setActiveTab] = useState<AdmissionTab>('current');
  const [selectedSchool, setSelectedSchool] = useState('ArnoldPreSchool2');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [showOnlyCurrentUnits, setShowOnlyCurrentUnits] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [sortField, setSortField] = useState<string>('childLastName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isChildProfileOpen, setIsChildProfileOpen] = useState(false);
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    department: '',
    rateCategory: '',
    reasonType: '',
    dateRange: {},
    showOnlyCurrentUnits: false
  });

  // Mock data - in real implementation, this would come from API
  const mockAdmissions: Admission[] = [
    {
      id: '1',
      childId: 'child-1',
      child: {
        id: 'child-1',
        civicNumber: '20180315-1234',
        firstName: 'Emma',
        lastName: 'Andersson',
        fullName: 'Emma Andersson',
        birthDate: '2018-03-15',
        specialNeedsFlag: false,
        emergencyContacts: [],
        medicalInfo: { allergies: [], medications: [], specialNeeds: [] },
        guardians: []
      },
      department: {
        id: 'dept-1',
        name: 'Sunflower Group',
        unitId: 'unit-1',
        unitName: 'ArnoldPreSchool2',
        capacity: 20,
        currentEnrollment: 18,
        ageMin: 1,
        ageMax: 5,
        staffRatio: 5,
        municipality: 'förskola'
      },
      departmentId: 'dept-1',
      admissionStart: '2024-08-01',
      endDate: '2025-06-30',
      startDate: '2024-08-01',
      rateCategory: {
        id: 'rate-1',
        name: 'Full Time',
        hourlyRate: 150,
        ageGroup: '1-5',
        municipalityId: 'mun-1'
      },
      averageTime: '40h',
      reasonType: 'Regular admission',
      timetable: {
        id: 'tt-1',
        schedulePattern: 'full-time',
        weeklyHours: 40,
        dailySchedule: [],
        contractedHours: '40h'
      },
      journalNotes: [],
      status: 'active',
      createdAt: '2024-07-15',
      updatedAt: '2024-07-15',
      createdBy: 'admin'
    },
    {
      id: '2',
      childId: 'child-2',
      child: {
        id: 'child-2',
        civicNumber: '20190820-5678',
        firstName: 'Lucas',
        lastName: 'Nilsson',
        fullName: 'Lucas Nilsson',
        birthDate: '2019-08-20',
        specialNeedsFlag: true,
        emergencyContacts: [],
        medicalInfo: { allergies: ['Nuts'], medications: [], specialNeeds: ['Speech therapy'] },
        guardians: []
      },
      department: {
        id: 'dept-2',
        name: 'Rainbow Group',
        unitId: 'unit-1',
        unitName: 'ArnoldPreSchool2',
        capacity: 15,
        currentEnrollment: 12,
        ageMin: 3,
        ageMax: 6,
        staffRatio: 4,
        municipality: 'förskola'
      },
      departmentId: 'dept-2',
      admissionStart: '2024-09-01',
      endDate: '2025-05-30',
      startDate: '2024-09-01',
      rateCategory: {
        id: 'rate-2',
        name: 'Part Time',
        hourlyRate: 100,
        ageGroup: '3-6',
        municipalityId: 'mun-1'
      },
      averageTime: '25h',
      reasonType: 'Special needs',
      timetable: {
        id: 'tt-2',
        schedulePattern: 'part-time',
        weeklyHours: 25,
        dailySchedule: [],
        contractedHours: '25h'
      },
      journalNotes: [],
      status: 'future',
      createdAt: '2024-07-20',
      updatedAt: '2024-07-20',
      createdBy: 'admin'
    }
  ];

  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    console.log('Exporting as:', format);
    // Implement export logic based on format
    // This would typically involve calling an API endpoint or generating the file client-side
  };

  const filteredAdmissions = useMemo(() => {
    return mockAdmissions.filter(admission => {
      const matchesTab = () => {
        switch (activeTab) {
          case 'current': return admission.status === 'active';
          case 'future': return admission.status === 'future';
          case 'future-changes': return admission.status === 'future';
          case 'historical': return admission.status === 'historical';
          case 'terminated': return admission.status === 'terminated';
          case 'deleted': return admission.status === 'deleted';
          default: return true;
        }
      };

      const matchesMunicipality = admission.department.municipality === selectedMunicipality;
      const matchesSearch = !filters.search || 
        admission.child.fullName.toLowerCase().includes(filters.search.toLowerCase()) ||
        admission.child.civicNumber.includes(filters.search);
      const matchesDepartment = !filters.department || admission.department.name === filters.department;

      return matchesTab() && matchesMunicipality && matchesSearch && matchesDepartment;
    });
  }, [mockAdmissions, activeTab, selectedMunicipality, filters]);

  const paginatedAdmissions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAdmissions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAdmissions, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAdmissions.length / itemsPerPage);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(paginatedAdmissions.map(admission => admission.id));
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

  const handleEditChild = (admission: Admission) => {
    setSelectedChild(admission.child);
    setIsChildProfileOpen(true);
  };

  const handleViewAdmission = (admission: Admission) => {
    setSelectedAdmission(admission);
    setIsAdmissionModalOpen(true);
  };

  const handleBulkAction = (actionType: string, data?: any) => {
    console.log('Bulk action:', actionType, 'Selected:', selectedRows, 'Data:', data);
    // Implement bulk action logic
  };

  const getTabDisplayName = (tab: AdmissionTab) => {
    // Shortened names for mobile
    switch (tab) {
      case 'current': return 'Current';
      case 'future': return 'Future';
      case 'future-changes': return 'Changes';
      case 'historical': return 'Historical';
      case 'all': return 'All';
      case 'deleted': return 'Deleted';
      case 'terminated': return 'Terminated';
      default: return tab;
    }
  };

  const getTabFullName = (tab: AdmissionTab) => {
    switch (tab) {
      case 'current': return 'Manage current admissions';
      case 'future': return 'Future admissions';
      case 'future-changes': return 'Future admissions changes';
      case 'historical': return 'Manage historical admissions';
      case 'all': return 'Manage all admissions';
      case 'deleted': return 'Deleted admissions';
      case 'terminated': return 'Terminated admissions';
      default: return tab;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <ChildcareHeader 
        selectedMunicipality={selectedMunicipality}
        onMunicipalityChange={setSelectedMunicipality}
        selectedSchool={selectedSchool}
        onSchoolChange={setSelectedSchool}
        showOnlyCurrentUnits={showOnlyCurrentUnits}
        onShowOnlyCurrentUnitsChange={setShowOnlyCurrentUnits}
      />

      {/* Improved Admission Type Tabs */}
      <Card>
        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as AdmissionTab)}>
            {/* Desktop Tabs */}
            <div className="hidden lg:block">
              <TabsList className="grid w-full grid-cols-7 h-auto">
                {['current', 'future', 'future-changes', 'historical', 'all', 'deleted', 'terminated'].map((tab) => (
                  <TabsTrigger 
                    key={tab}
                    value={tab} 
                    className={`text-xs px-2 py-2 ${activeTab === tab ? 'font-bold' : ''}`}
                    title={getTabFullName(tab as AdmissionTab)}
                  >
                    {getTabFullName(tab as AdmissionTab)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Mobile/Tablet Tabs - Scrollable */}
            <div className="lg:hidden">
              <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-2">
                {['current', 'future', 'future-changes', 'historical', 'all', 'deleted', 'terminated'].map((tab) => (
                  <Button
                    key={tab}
                    variant={activeTab === tab ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab(tab as AdmissionTab)}
                    className={`whitespace-nowrap flex-shrink-0 ${activeTab === tab ? 'font-bold bg-blue-600 text-white' : ''}`}
                    title={getTabFullName(tab as AdmissionTab)}
                  >
                    {getTabDisplayName(tab as AdmissionTab)}
                  </Button>
                ))}
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Filters */}
      <ChildcareFilters 
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Main Content */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Admissions</CardTitle>
                <p className="text-sm text-slate-600">
                  {filteredAdmissions.length} total admissions
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
                <ExportDropdown onExport={handleExport} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <AdmissionsTable 
              admissions={paginatedAdmissions}
              selectedRows={selectedRows}
              onSelectAll={handleSelectAll}
              onSelectRow={handleSelectRow}
              onEditChild={handleEditChild}
              onViewAdmission={handleViewAdmission}
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
              activeTab={activeTab}
            />
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        <BulkActionsPanel 
          selectedCount={selectedRows.length}
          onBulkAction={handleBulkAction}
        />
      </div>

      {/* Modals */}
      {isChildProfileOpen && selectedChild && (
        <ChildProfileModal 
          child={selectedChild}
          isOpen={isChildProfileOpen}
          onClose={() => {
            setIsChildProfileOpen(false);
            setSelectedChild(null);
          }}
        />
      )}

      {isAdmissionModalOpen && selectedAdmission && (
        <AdmissionModal 
          admission={selectedAdmission}
          isOpen={isAdmissionModalOpen}
          onClose={() => {
            setIsAdmissionModalOpen(false);
            setSelectedAdmission(null);
          }}
        />
      )}
    </div>
  );
};

export default ChildcareMember;
