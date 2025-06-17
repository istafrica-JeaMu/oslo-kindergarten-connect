
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, CheckCircle } from 'lucide-react';
import MunicipalityToggle from '@/components/admin/placement/MunicipalityToggle';
import TimetableActionButtons from '@/components/admin/placement/TimetableActionButtons';
import TimetableFilters from '@/components/admin/placement/TimetableFilters';
import TimetableTable from '@/components/admin/placement/TimetableTable';
import TimetablePagination from '@/components/admin/placement/TimetablePagination';

interface TimetableRecord {
  id: string;
  applicationNumber: string;
  childName: string;
  childCivicNumber: string;
  unit: string;
  startDate: string;
  endDate: string;
  timetableType: string;
  requestedStartDate: string;
  contractedTime: string;
  averageTime: string;
  rateCategory: string;
  status: 'New' | 'Pending' | 'Approved' | 'Rejected';
  municipality: 'förskola' | 'fritidshem';
}

const Approve = () => {
  const [selectedMunicipality, setSelectedMunicipality] = useState<'förskola' | 'fritidshem'>('förskola');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showOnlyCurrentUnits, setShowOnlyCurrentUnits] = useState(false);
  const [activeTab, setActiveTab] = useState('end-request');

  // Mock data for the table
  const mockData: TimetableRecord[] = [
    {
      id: '1',
      applicationNumber: 'APP-2024-001',
      childName: 'Emma Andersson',
      childCivicNumber: '20220315-1234',
      unit: 'Solbacka Förskola',
      startDate: '2024-08-01',
      endDate: '2025-06-30',
      timetableType: 'Full time',
      requestedStartDate: '2024-08-01',
      contractedTime: '40h',
      averageTime: '38h',
      rateCategory: 'Category A',
      status: 'New',
      municipality: 'förskola'
    },
    {
      id: '2',
      applicationNumber: 'APP-2024-002',
      childName: 'Lucas Nilsson',
      childCivicNumber: '20210820-5678',
      unit: 'Björkträd Fritidshem',
      startDate: '2024-08-15',
      endDate: '2025-06-30',
      timetableType: 'Part time',
      requestedStartDate: '2024-08-15',
      contractedTime: '25h',
      averageTime: '24h',
      rateCategory: 'Category B',
      status: 'Pending',
      municipality: 'fritidshem'
    },
    {
      id: '3',
      applicationNumber: 'APP-2024-003',
      childName: 'Astrid Johansson',
      childCivicNumber: '20230505-9012',
      unit: 'Rosengård Förskola',
      startDate: '2024-09-01',
      endDate: '2025-06-30',
      timetableType: 'Full time',
      requestedStartDate: '2024-09-01',
      contractedTime: '40h',
      averageTime: '39h',
      rateCategory: 'Category A',
      status: 'Approved',
      municipality: 'förskola'
    }
  ];

  const filteredData = mockData.filter(record => {
    const matchesMunicipality = record.municipality === selectedMunicipality;
    const matchesSearch = !searchTerm || 
      record.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.unit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesMunicipality && matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      setSelectedRows(paginatedData.map(record => record.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean | "indeterminate") => {
    if (checked === true) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const handleClearFilters = () => {
    setStatusFilter('all');
    setSearchTerm('');
    setShowOnlyCurrentUnits(false);
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'request-replace':
        return 'Request for a replace';
      case 'rate-category':
        return 'Rate category change';
      case 'timetable':
        return 'Timetable';
      case 'reasontype':
        return 'Reason type';
      case 'leave':
        return 'Leave';
      default:
        return 'Request for a replace';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <CheckCircle className="w-8 h-8 text-green-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Approval Management</h1>
          <p className="text-slate-600">Manage timetables and placement approvals</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <Card>
        <CardContent className="pt-6">
          <TimetableActionButtons 
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </CardContent>
      </Card>

      {/* Tab Title */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900">{getTabTitle()}</h2>
      </div>

      {/* Controls Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Show only current units checkbox */}
            <div className="flex items-center gap-2">
              <Checkbox 
                id="current-units"
                checked={showOnlyCurrentUnits}
                onCheckedChange={(checked) => setShowOnlyCurrentUnits(checked === true)}
              />
              <label htmlFor="current-units" className="text-sm font-medium">
                Show only current units
              </label>
            </div>

            {/* Municipality Toggle */}
            <MunicipalityToggle 
              selectedMunicipality={selectedMunicipality}
              onMunicipalityChange={setSelectedMunicipality}
            />

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="ArnoldPreSchool2 (ctrl+shift+s)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <TimetableFilters 
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onClearFilters={handleClearFilters}
      />

      {/* Table */}
      <TimetableTable 
        data={paginatedData}
        selectedRows={selectedRows}
        onSelectAll={handleSelectAll}
        onSelectRow={handleSelectRow}
        activeTab={activeTab}
      />

      {/* Pagination */}
      <TimetablePagination 
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={filteredData.length}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />

      {/* Bottom Action Button */}
      <div className="flex justify-end">
        <Button className="bg-green-600 hover:bg-green-700">
          Approve/reject
        </Button>
      </div>
    </div>
  );
};

export default Approve;
