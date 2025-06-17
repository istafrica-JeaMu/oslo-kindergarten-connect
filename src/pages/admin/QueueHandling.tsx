
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import MunicipalityToggle from '@/components/admin/placement/MunicipalityToggle';

interface QueueData {
  id: number;
  [key: string]: any;
}

interface TabConfig {
  title: string;
  columns: string[];
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

  const tabConfig: Record<string, TabConfig> = {
    'queue-snapshots': {
      title: 'Queue snapshots',
      columns: ['#', 'Created By', 'Description', 'Create Date'],
      data: [
        { id: 1, createdBy: 'devadmin devadmin', description: 'hej', createDate: '03/13/2023' },
        { id: 2, createdBy: 'devadmin devadmin', description: 'ARE', createDate: '09/30/2022' }
      ],
      actions: [{ label: 'Create snapshot', position: 'bottom-right' }]
    },
    'all-queue-posts': {
      title: 'All queue posts',
      columns: ['#', 'Child civic number', 'Child name', 'Submit date', 'Queue date', 'Requested admission date (choice)', 'Priority'],
      data: [],
      actions: []
    },
    'untreated-queue-posts': {
      title: 'Untreated queue posts',
      columns: ['#', 'Child civic number', 'Child name', 'Submit date', 'Queue date', 'Priority'],
      data: [],
      actions: []
    },
    'admit': {
      title: 'Admit',
      columns: ['#', 'Admit', 'Handle interest request', 'Child info', 'Child civic number', 'Child name', 'Unit', 'Department', 'Admission start', 'Averagetime', 'Offered rate category'],
      data: [],
      actions: [{ label: 'Admit selected', position: 'bottom-right', requiresSelection: true }],
      hasActionColumns: true
    },
    'offers': {
      title: 'Offers',
      columns: ['#', 'Close admission offer', 'Cancel the offer', 'Child civic number', 'Child name', 'Unit', 'Startdate', 'Latest answer date', 'Status admission offer', 'Applicant reply', 'Coapplicant reply', 'Answer for applicant', 'Change disagreed to answer', 'Change to not answered'],
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
      columns: ['#', 'Cancel the offer', 'Child civic number', 'Child name', 'Unit', 'Startdate', 'Latest answer date', 'Status admission offer'],
      data: [],
      actions: [{ label: 'Approve offer', position: 'bottom-right' }],
      hasActionColumns: true
    },
    'childcare-queue': {
      title: 'Childcare queue',
      columns: ['#', 'Change application', 'Copy application', 'Create offer', 'Admissions', 'Status application', 'Status choice', 'Child civic number', 'Child name', 'Submit date', 'Queue date', 'Queue date time', 'Submit date time', 'Requested admission', 'Guarantee date', 'Priority', 'No of admissions', 'No of units', 'No of admissions departments', 'Journal note'],
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

  const renderActionColumn = (columnName: string) => {
    const iconMap: Record<string, string> = {
      'Admit': '✓',
      'Handle interest request': '♥',
      'Child info': '👤',
      'Close admission offer': '✗',
      'Cancel the offer': '⊗',
      'Change application': '✏️',
      'Copy application': '📋',
      'Create offer': '+',
      'Admissions': '⚙️'
    };
    
    return (
      <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-gray-600 hover:bg-gray-100">
        {iconMap[columnName] || '•'}
      </Button>
    );
  };

  const currentTab = tabConfig[activeTab];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header with Breadcrumb */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            Queue handling
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            {currentTab.title}
          </span>
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-4 flex-wrap">
          <label className="flex items-center gap-2">
            <Checkbox 
              checked={showOnlyCurrentUnits}
              onCheckedChange={setShowOnlyCurrentUnits}
            />
            <span className="text-sm">Show only current units</span>
          </label>
          
          <MunicipalityToggle 
            selectedMunicipality={serviceType}
            onMunicipalityChange={setServiceType}
          />
        </div>
        
        {/* District Selector */}
        <div className="bg-teal-600 text-white p-3 rounded">
          <Input
            value={districtSearch}
            onChange={(e) => setDistrictSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-white placeholder-teal-100 focus:ring-0"
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8 overflow-x-auto">
          {Object.keys(tabConfig).map((tabKey) => (
            <button
              key={tabKey}
              onClick={() => {
                setActiveTab(tabKey);
                setSelectedRows(new Set());
              }}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tabKey
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tabConfig[tabKey].title}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Card */}
      <Card className="bg-white rounded-lg shadow">
        {/* Filters */}
        <div className="border-b p-4">
          <button 
            onClick={() => setFiltersExpanded(!filtersExpanded)}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <span>Filters</span>
            {filtersExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {filtersExpanded && (
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filter Field</label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                    <option value="">Select field</option>
                    <option value="childName">Child name</option>
                    <option value="civicNumber">Civic number</option>
                    <option value="queueDate">Queue date</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                    <option value="equals">Equals</option>
                    <option value="contains">Contains</option>
                    <option value="startsWith">Starts with</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                  <Input className="w-full" placeholder="Enter value" />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm">Apply</Button>
                <Button variant="outline" size="sm">Clear</Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {currentTab.hasMultiSelect && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <Checkbox
                      checked={currentTab.data.length > 0 && selectedRows.size === currentTab.data.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                )}
                {currentTab.columns.map((column) => (
                  <th
                    key={column}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentTab.data.length === 0 ? (
                <tr>
                  <td 
                    colSpan={currentTab.columns.length + (currentTab.hasMultiSelect ? 1 : 0)}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No results found.
                  </td>
                </tr>
              ) : (
                currentTab.data.map((row, index) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {currentTab.hasMultiSelect && (
                      <td className="px-6 py-4">
                        <Checkbox
                          checked={selectedRows.has(row.id)}
                          onCheckedChange={(checked) => handleRowSelection(row.id, checked as boolean)}
                        />
                      </td>
                    )}
                    {currentTab.columns.map((column) => (
                      <td key={column} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {currentTab.hasActionColumns && 
                         ['Admit', 'Handle interest request', 'Child info', 'Close admission offer', 'Cancel the offer', 'Change application', 'Copy application', 'Create offer', 'Admissions'].includes(column)
                          ? renderActionColumn(column)
                          : column === '#' 
                            ? index + 1
                            : row[column.toLowerCase().replace(/\s+/g, '').replace(/[()]/g, '')] || '-'
                        }
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="w-8 h-8 p-0">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-gray-700">Page 1 of 1</span>
            <Button variant="outline" size="sm" className="w-8 h-8 p-0">
              <ChevronRight className="w-4 h-4" />
            </Button>
            <select className="ml-4 border border-gray-300 rounded px-2 py-1 text-sm">
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">
              1 - {currentTab.data.length} of {currentTab.data.length}
            </span>
            <span className="text-sm text-gray-500">Sort Order:</span>
            <Badge variant="outline" className="text-xs">Default ↑</Badge>
          </div>
        </div>
        
        {/* Action Buttons */}
        {currentTab.actions.length > 0 && (
          <div className={`p-4 border-t ${
            currentTab.actions[0].position === 'bottom-center' ? 'text-center' : 'text-right'
          }`}>
            <div className={`flex gap-2 ${
              currentTab.actions[0].position === 'bottom-center' ? 'justify-center flex-wrap' : 'justify-end'
            }`}>
              {currentTab.actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant === 'destructive' ? 'destructive' : 'default'}
                  size="sm"
                  disabled={action.requiresSelection && selectedRows.size === 0}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default QueueHandling;
