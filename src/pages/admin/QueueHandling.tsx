import React, { useState } from 'react';
import { Users } from 'lucide-react';
import AdminLayout from '@/components/admin/shared/AdminLayout';
import AdminTabNavigation from '@/components/admin/shared/AdminTabNavigation';
import AdminFilters from '@/components/admin/shared/AdminFilters';
import AdminTable from '@/components/admin/shared/AdminTable';

interface QueueData {
  id: number;
  [key: string]: any;
}

interface TabConfig {
  title: string;
  columns: Array<{
    key: string;
    title: string;
    render?: (value: any, row: any) => React.ReactNode;
  }>;
  data: QueueData[];
  actions: Array<{
    label: string;
    position: 'bottom-right' | 'bottom-center';
    requiresSelection?: boolean;
    variant?: 'default' | 'destructive';
  }>;
  hasActionColumns?: boolean;
  hasMultiSelect?: boolean;
}

const QueueHandling = () => {
  const [activeTab, setActiveTab] = useState<string>('childcare-queue');
  const [serviceType, setServiceType] = useState<'förskola' | 'fritidshem'>('förskola');
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [showOnlyCurrentUnits, setShowOnlyCurrentUnits] = useState(false);
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [districtSearch, setDistrictSearch] = useState('Norra Distriktet (ctrl+shift+s)');
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});

  const tabConfig: Record<string, TabConfig> = {
    'queue-snapshots': {
      title: 'Queue snapshots',
      columns: [
        { key: '#', title: '#' },
        { key: 'createdBy', title: 'Created By' },
        { key: 'description', title: 'Description' },
        { key: 'createDate', title: 'Create Date' }
      ],
      data: [
        { id: 1, createdBy: 'devadmin devadmin', description: 'hej', createDate: '03/13/2023' },
        { id: 2, createdBy: 'devadmin devadmin', description: 'ARE', createDate: '09/30/2022' }
      ],
      actions: [{ label: 'Create snapshot', position: 'bottom-right' }]
    },
    'all-queue-posts': {
      title: 'All queue posts',
      columns: [
        { key: '#', title: '#' },
        { key: 'childCivicNumber', title: 'Child civic number' },
        { key: 'childName', title: 'Child name' },
        { key: 'submitDate', title: 'Submit date' },
        { key: 'queueDate', title: 'Queue date' },
        { key: 'requestedAdmissionDate', title: 'Requested admission date (choice)' },
        { key: 'priority', title: 'Priority' }
      ],
      data: [],
      actions: []
    },
    'untreated-queue-posts': {
      title: 'Untreated queue posts',
      columns: [
        { key: '#', title: '#' },
        { key: 'childCivicNumber', title: 'Child civic number' },
        { key: 'childName', title: 'Child name' },
        { key: 'submitDate', title: 'Submit date' },
        { key: 'queueDate', title: 'Queue date' },
        { key: 'priority', title: 'Priority' }
      ],
      data: [],
      actions: []
    },
    'admit': {
      title: 'Admit',
      columns: [
        { key: '#', title: '#' },
        { key: 'admit', title: 'Admit' },
        { key: 'handleInterestRequest', title: 'Handle interest request' },
        { key: 'childInfo', title: 'Child info' },
        { key: 'childCivicNumber', title: 'Child civic number' },
        { key: 'childName', title: 'Child name' },
        { key: 'unit', title: 'Unit' },
        { key: 'department', title: 'Department' },
        { key: 'admissionStart', title: 'Admission start' },
        { key: 'averageTime', title: 'Average time' },
        { key: 'offeredRateCategory', title: 'Offered rate category' }
      ],
      data: [],
      actions: [{ label: 'Admit selected', position: 'bottom-right', requiresSelection: true }],
      hasActionColumns: true
    },
    'offers': {
      title: 'Offers',
      columns: [
        { key: '#', title: '#' },
        { key: 'closeAdmissionOffer', title: 'Close admission offer' },
        { key: 'cancelOffer', title: 'Cancel the offer' },
        { key: 'childCivicNumber', title: 'Child civic number' },
        { key: 'childName', title: 'Child name' },
        { key: 'unit', title: 'Unit' },
        { key: 'startDate', title: 'Start date' },
        { key: 'latestAnswerDate', title: 'Latest answer date' },
        { key: 'statusAdmissionOffer', title: 'Status admission offer' },
        { key: 'applicantReply', title: 'Applicant reply' },
        { key: 'coapplicantReply', title: 'Coapplicant reply' },
        { key: 'answerForApplicant', title: 'Answer for applicant' },
        { key: 'changeDisagreedToAnswer', title: 'Change disagreed to answer' },
        { key: 'changeToNotAnswered', title: 'Change to not answered' }
      ],
      data: [],
      actions: [
        { label: 'Close offer', position: 'bottom-right' },
        { label: 'Extend answer date', position: 'bottom-right' },
        { label: 'Answer from applicant', position: 'bottom-right' }
      ],
      hasActionColumns: true
    },
    'offer-reviews': {
      title: 'Offer reviews',
      columns: [
        { key: '#', title: '#' },
        { key: 'cancelOffer', title: 'Cancel the offer' },
        { key: 'childCivicNumber', title: 'Child civic number' },
        { key: 'childName', title: 'Child name' },
        { key: 'unit', title: 'Unit' },
        { key: 'startDate', title: 'Start date' },
        { key: 'latestAnswerDate', title: 'Latest answer date' },
        { key: 'statusAdmissionOffer', title: 'Status admission offer' }
      ],
      data: [],
      actions: [{ label: 'Approve offer', position: 'bottom-right' }],
      hasActionColumns: true
    },
    'childcare-queue': {
      title: 'Childcare queue',
      columns: [
        { key: '#', title: '#' },
        { key: 'changeApplication', title: 'Change application' },
        { key: 'copyApplication', title: 'Copy application' },
        { key: 'createOffer', title: 'Create offer' },
        { key: 'admissions', title: 'Admissions' },
        { key: 'statusApplication', title: 'Status application' },
        { key: 'statusChoice', title: 'Status choice' },
        { key: 'childCivicNumber', title: 'Child civic number' },
        { key: 'childName', title: 'Child name' },
        { key: 'submitDate', title: 'Submit date' },
        { key: 'queueDate', title: 'Queue date' },
        { key: 'queueDateTime', title: 'Queue date time' },
        { key: 'submitDateTime', title: 'Submit date time' },
        { key: 'requestedAdmission', title: 'Requested admission' },
        { key: 'guaranteeDate', title: 'Guarantee date' },
        { key: 'priority', title: 'Priority' },
        { key: 'noOfAdmissions', title: 'No of admissions' },
        { key: 'noOfUnits', title: 'No of units' },
        { key: 'noOfAdmissionDepartments', title: 'No of admission departments' },
        { key: 'journalNote', title: 'Journal note' }
      ],
      data: [],
      actions: [
        { label: 'Process stay request', position: 'bottom-center' },
        { label: 'New application', position: 'bottom-center' },
        { label: 'Create multiple offers', position: 'bottom-center' },
        { label: 'Direct admission', position: 'bottom-center' },
        { label: 'Remove', position: 'bottom-center', variant: 'destructive' },
        { label: 'Close marked applications', position: 'bottom-center', variant: 'destructive' },
        { label: 'Close marked choices', position: 'bottom-center', variant: 'destructive' },
        { label: 'Send e-mail', position: 'bottom-center' }
      ],
      hasActionColumns: true,
      hasMultiSelect: true
    }
  };

  const filterFields = [
    {
      key: 'field',
      label: 'Filter Field',
      type: 'select' as const,
      options: [
        { value: 'childName', label: 'Child name' },
        { value: 'civicNumber', label: 'Civic number' },
        { value: 'queueDate', label: 'Queue date' }
      ]
    },
    {
      key: 'condition',
      label: 'Condition',
      type: 'select' as const,
      options: [
        { value: 'equals', label: 'Equals' },
        { value: 'contains', label: 'Contains' },
        { value: 'startsWith', label: 'Starts with' }
      ]
    },
    {
      key: 'value',
      label: 'Value',
      type: 'text' as const,
      placeholder: 'Enter value'
    }
  ];

  const handleRowSelection = (id: number, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(tabConfig[activeTab].data.map(row => row.id));
      setSelectedRows(allIds);
    } else {
      setSelectedRows(new Set());
    }
  };

  const tabItems = Object.keys(tabConfig).map(key => ({
    key,
    title: tabConfig[key].title,
    fullTitle: tabConfig[key].title
  }));

  const currentTab = tabConfig[activeTab];
  const breadcrumb = ['Queue handling', currentTab.title];

  return (
    <AdminLayout
      icon={Users}
      title="Queue Handling"
      description="Manage childcare queue and admissions across different categories"
      breadcrumb={breadcrumb}
      showOnlyCurrentUnits={showOnlyCurrentUnits}
      onShowOnlyCurrentUnitsChange={setShowOnlyCurrentUnits}
      selectedMunicipality={serviceType}
      onMunicipalityChange={setServiceType}
      selectedDistrict={districtSearch}
      onDistrictChange={setDistrictSearch}
      districtPlaceholder="Norra Distriktet (ctrl+shift+s)"
    >
      {/* Tab Navigation */}
      <AdminTabNavigation
        tabs={tabItems}
        activeTab={activeTab}
        onTabChange={(tabKey) => {
          setActiveTab(tabKey);
          setSelectedRows(new Set());
        }}
      />

      {/* Filters */}
      <AdminFilters
        isExpanded={filtersExpanded}
        onToggle={() => setFiltersExpanded(!filtersExpanded)}
        fields={filterFields}
        values={filterValues}
        onValuesChange={setFilterValues}
        showAdvancedFilters={true}
      />

      {/* Main Content */}
      <AdminTable
        columns={currentTab.columns}
        data={currentTab.data}
        actions={currentTab.actions}
        hasMultiSelect={currentTab.hasMultiSelect}
        hasActionColumns={currentTab.hasActionColumns}
        selectedRows={selectedRows}
        onSelectAll={handleSelectAll}
        onSelectRow={handleRowSelection}
        currentPage={1}
        totalPages={1}
        itemsPerPage={15}
        emptyMessage="No results found."
      />
    </AdminLayout>
  );
};

export default QueueHandling;
