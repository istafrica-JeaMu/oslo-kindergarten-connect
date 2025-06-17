import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
  // Additional fields for other tabs
  replaceUnit?: string;
  currentUnit?: string;
  child?: string;
  requestedAdmissionEndDate?: string;
  requestedNewAdmissionStartDate?: string;
  reason?: string;
  submitDate?: string;
  requestedBy?: string;
  changedStartDate?: string;
  otherInformation?: string;
  currentRateCategory?: string;
  newRateCategory?: string;
  currentAverageTime?: string;
  newAverageTime?: string;
  childFirstName?: string;
  childLastName?: string;
  admissionStart?: string;
  desiredStartDate?: string;
  reasontype?: string;
  state?: string;
  civicNumber?: string;
  leavetype?: string;
  desiredEndDate?: string;
}

interface TimetableTableProps {
  data: TimetableRecord[];
  selectedRows: string[];
  onSelectAll: (checked: boolean | "indeterminate") => void;
  onSelectRow: (id: string, checked: boolean | "indeterminate") => void;
  activeTab: string;
}

type SortDirection = 'asc' | 'desc' | null;

const TimetableTable = ({ data, selectedRows, onSelectAll, onSelectRow, activeTab }: TimetableTableProps) => {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (field: string) => {
    console.log('Sorting field:', field, 'Current direction:', sortDirection);
    
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortField(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ChevronsUpDown className="w-3 h-3 ml-1 text-gray-400" />;
    }
    if (sortDirection === 'asc') {
      return <ChevronUp className="w-3 h-3 ml-1 text-blue-600" />;
    }
    if (sortDirection === 'desc') {
      return <ChevronDown className="w-3 h-3 ml-1 text-blue-600" />;
    }
    return <ChevronsUpDown className="w-3 h-3 ml-1 text-gray-400" />;
  };

  const getFieldValue = (record: TimetableRecord, field: string): any => {
    // Handle special field mappings based on tab context
    switch (field) {
      case 'child':
        return record.child || record.childName;
      case 'currentUnit':
        return record.currentUnit || record.unit;
      case 'replaceUnit':
        return record.replaceUnit || '';
      case 'requestedAdmissionEndDate':
        return record.requestedAdmissionEndDate || record.endDate;
      case 'requestedNewAdmissionStartDate':
        return record.requestedNewAdmissionStartDate || record.requestedStartDate;
      case 'changedStartDate':
        return record.changedStartDate || record.startDate;
      case 'currentRateCategory':
        return record.currentRateCategory || record.rateCategory;
      case 'currentAverageTime':
        return record.currentAverageTime || record.averageTime;
      case 'childFirstName':
        return record.childFirstName || (record.childName ? record.childName.split(' ')[0] : '');
      case 'childLastName':
        return record.childLastName || (record.childName ? record.childName.split(' ')[1] || '' : '');
      case 'admissionStart':
        return record.admissionStart || record.startDate;
      case 'desiredStartDate':
        return record.desiredStartDate || record.requestedStartDate;
      case 'civicNumber':
        return record.civicNumber || record.childCivicNumber;
      case 'desiredEndDate':
        return record.desiredEndDate || record.endDate;
      default:
        return (record as any)[field];
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortField || !sortDirection || !data.length) {
      console.log('No sorting applied:', { sortField, sortDirection, dataLength: data.length });
      return data;
    }

    console.log('Applying sort:', { sortField, sortDirection });

    const sorted = [...data].sort((a, b) => {
      const aValue = getFieldValue(a, sortField);
      const bValue = getFieldValue(b, sortField);
      
      console.log('Comparing:', { field: sortField, aValue, bValue });
      
      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortDirection === 'asc' ? 1 : -1;
      if (bValue == null) return sortDirection === 'asc' ? -1 : 1;

      // Handle different data types
      let comparison = 0;
      
      // Check if values are dates (YYYY-MM-DD format)
      if (typeof aValue === 'string' && typeof bValue === 'string' && 
          aValue.match(/^\d{4}-\d{2}-\d{2}$/) && bValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
        comparison = new Date(aValue).getTime() - new Date(bValue).getTime();
      }
      // Check if values are numbers (including those with 'h' suffix like "40h")
      else if (typeof aValue === 'string' && typeof bValue === 'string' &&
               aValue.match(/^\d+h?$/) && bValue.match(/^\d+h?$/)) {
        const aNum = parseInt(aValue.replace('h', ''));
        const bNum = parseInt(bValue.replace('h', ''));
        comparison = aNum - bNum;
      }
      // Check if values are pure numbers
      else if (!isNaN(Number(aValue)) && !isNaN(Number(bValue))) {
        comparison = Number(aValue) - Number(bValue);
      }
      // Default to string comparison
      else {
        comparison = String(aValue).localeCompare(String(bValue));
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    console.log('Sorted data:', sorted.map(item => ({ id: item.id, [sortField]: getFieldValue(item, sortField) })));
    return sorted;
  }, [data, sortField, sortDirection]);

  const SortableHeader = ({ field, children, className = "" }: { field: string; children: React.ReactNode; className?: string }) => (
    <TableHead 
      className={`text-xs cursor-pointer hover:bg-slate-100 select-none ${className} ${sortField === field ? 'bg-slate-50' : ''}`}
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center">
        {children}
        {getSortIcon(field)}
      </div>
    </TableHead>
  );

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Approved':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const renderTableHeaders = () => {
    const baseHeaders = [
      <TableHead key="checkbox" className="w-12">
        <Checkbox
          checked={data.length > 0 && selectedRows.length === data.length}
          onCheckedChange={onSelectAll}
        />
      </TableHead>,
      <TableHead key="number" className="text-xs">#</TableHead>
    ];

    switch (activeTab) {
      case 'request-replace':
        return [
          ...baseHeaders,
          <SortableHeader key="status" field="status">Status</SortableHeader>,
          <SortableHeader key="replace-unit" field="replaceUnit">Replace unit</SortableHeader>,
          <SortableHeader key="current-unit" field="currentUnit">Current unit</SortableHeader>,
          <SortableHeader key="child" field="child">Child</SortableHeader>,
          <SortableHeader key="req-end-date" field="requestedAdmissionEndDate">Req. admission end date</SortableHeader>,
          <SortableHeader key="req-start-date" field="requestedNewAdmissionStartDate">Req. new admission start date</SortableHeader>,
          <SortableHeader key="reason" field="reason">Reason</SortableHeader>,
          <SortableHeader key="submit-date" field="submitDate">Submit date</SortableHeader>,
          <SortableHeader key="requested-by" field="requestedBy">Requested by</SortableHeader>
        ];

      case 'rate-category':
        return [
          ...baseHeaders,
          <SortableHeader key="status" field="status">Status</SortableHeader>,
          <SortableHeader key="child-civic" field="childCivicNumber">Child civic number</SortableHeader>,
          <SortableHeader key="child-name" field="childName">Child name</SortableHeader>,
          <SortableHeader key="start-date" field="startDate">Start Date</SortableHeader>,
          <SortableHeader key="changed-start" field="changedStartDate">Changed startdate</SortableHeader>,
          <SortableHeader key="current-unit" field="unit">Current unit</SortableHeader>,
          <SortableHeader key="submit-date" field="submitDate">Submit date</SortableHeader>,
          <SortableHeader key="other-info" field="otherInformation">Other information</SortableHeader>,
          <SortableHeader key="current-rate" field="currentRateCategory">Current rate category</SortableHeader>,
          <SortableHeader key="new-rate" field="newRateCategory">New rate category</SortableHeader>,
          <SortableHeader key="contracted-time" field="contractedTime">Contracted time</SortableHeader>,
          <SortableHeader key="reason" field="reason">Reason</SortableHeader>,
          <SortableHeader key="current-avg" field="currentAverageTime">Current average time</SortableHeader>,
          <SortableHeader key="new-avg" field="newAverageTime">New average time</SortableHeader>
        ];

      case 'timetable':
        return [
          ...baseHeaders,
          <SortableHeader key="timetable" field="timetable">Timetable</SortableHeader>,
          <SortableHeader key="status" field="status">Status</SortableHeader>,
          <SortableHeader key="child-civic" field="childCivicNumber">Child civic number</SortableHeader>,
          <SortableHeader key="child-name" field="childName">Child name</SortableHeader>,
          <SortableHeader key="unit" field="unit">Unit</SortableHeader>,
          <SortableHeader key="start-date" field="startDate">Start date</SortableHeader>,
          <SortableHeader key="end-date" field="endDate">End date</SortableHeader>,
          <SortableHeader key="timetable-type" field="timetableType">Timetable type</SortableHeader>,
          <SortableHeader key="req-start" field="requestedStartDate">Req. start date</SortableHeader>,
          <SortableHeader key="contracted-time" field="contractedTime">Contracted time</SortableHeader>,
          <SortableHeader key="avg-time" field="averageTime">Average time</SortableHeader>,
          <SortableHeader key="rate-category" field="rateCategory">Rate category</SortableHeader>
        ];

      case 'reasontype':
        return [
          ...baseHeaders,
          <SortableHeader key="status" field="status">Status</SortableHeader>,
          <SortableHeader key="child-civic" field="childCivicNumber">Child civic number</SortableHeader>,
          <SortableHeader key="child-first" field="childFirstName">Child first name</SortableHeader>,
          <SortableHeader key="child-last" field="childLastName">Child last name</SortableHeader>,
          <SortableHeader key="unit" field="unit">Unit</SortableHeader>,
          <SortableHeader key="admission-start" field="admissionStart">Admission start</SortableHeader>,
          <SortableHeader key="end-date" field="endDate">End date</SortableHeader>,
          <SortableHeader key="desired-start" field="desiredStartDate">Desired startdate</SortableHeader>,
          <SortableHeader key="submit-date" field="submitDate">Submit date</SortableHeader>,
          <SortableHeader key="reasontype" field="reasontype">Reasontype</SortableHeader>,
          <SortableHeader key="rate-category" field="rateCategory">Rate category</SortableHeader>,
          <SortableHeader key="contracted-time" field="contractedTime">Contracted time</SortableHeader>,
          <SortableHeader key="avg-time" field="averageTime">Average time</SortableHeader>
        ];

      case 'leave':
        return [
          ...baseHeaders,
          <SortableHeader key="state" field="state">State</SortableHeader>,
          <SortableHeader key="civic-number" field="civicNumber">Civic number</SortableHeader>,
          <SortableHeader key="child-name" field="childName">Child name</SortableHeader>,
          <SortableHeader key="unit" field="unit">Unit</SortableHeader>,
          <SortableHeader key="leavetype" field="leavetype">Leavetype</SortableHeader>,
          <SortableHeader key="submit-date" field="submitDate">Submit date</SortableHeader>,
          <SortableHeader key="desired-start" field="desiredStartDate">Desired start date</SortableHeader>,
          <SortableHeader key="desired-end" field="desiredEndDate">Desired end date</SortableHeader>,
          <SortableHeader key="reason" field="reason">Reason</SortableHeader>
        ];

      default: // end-request
        return [
          ...baseHeaders,
          <SortableHeader key="status" field="status">Status</SortableHeader>,
          <SortableHeader key="replace-unit" field="replaceUnit">Replace unit</SortableHeader>,
          <SortableHeader key="current-unit" field="currentUnit">Current unit</SortableHeader>,
          <SortableHeader key="child" field="child">Child</SortableHeader>,
          <SortableHeader key="req-end-date" field="requestedAdmissionEndDate">Req. admission end date</SortableHeader>,
          <SortableHeader key="req-start-date" field="requestedNewAdmissionStartDate">Req. new admission start date</SortableHeader>,
          <SortableHeader key="reason" field="reason">Reason</SortableHeader>,
          <SortableHeader key="submit-date" field="submitDate">Submit date</SortableHeader>,
          <SortableHeader key="requested-by" field="requestedBy">Requested by</SortableHeader>
        ];
    }
  };

  const renderTableCells = (record: TimetableRecord, index: number) => {
    const baseCells = [
      <TableCell key="checkbox">
        <Checkbox
          checked={selectedRows.includes(record.id)}
          onCheckedChange={(checked) => onSelectRow(record.id, checked)}
        />
      </TableCell>,
      <TableCell key="number" className="font-medium text-xs">{index + 1}</TableCell>
    ];

    switch (activeTab) {
      case 'request-replace':
        return [
          ...baseCells,
          <TableCell key="status" className="text-xs">
            <Badge className={getStatusBadgeColor(record.status)}>{record.status}</Badge>
          </TableCell>,
          <TableCell key="replace-unit" className="text-xs">{record.replaceUnit || '-'}</TableCell>,
          <TableCell key="current-unit" className="text-xs">{record.currentUnit || record.unit}</TableCell>,
          <TableCell key="child" className="text-xs">{record.child || record.childName}</TableCell>,
          <TableCell key="req-end-date" className="text-xs">{record.requestedAdmissionEndDate || record.endDate}</TableCell>,
          <TableCell key="req-start-date" className="text-xs">{record.requestedNewAdmissionStartDate || record.requestedStartDate}</TableCell>,
          <TableCell key="reason" className="text-xs">{record.reason || '-'}</TableCell>,
          <TableCell key="submit-date" className="text-xs">{record.submitDate || record.startDate}</TableCell>,
          <TableCell key="requested-by" className="text-xs">{record.requestedBy || '-'}</TableCell>
        ];

      case 'rate-category':
        return [
          ...baseCells,
          <TableCell key="status" className="text-xs">
            <Badge className={getStatusBadgeColor(record.status)}>{record.status}</Badge>
          </TableCell>,
          <TableCell key="child-civic" className="text-xs">{record.childCivicNumber}</TableCell>,
          <TableCell key="child-name" className="text-xs">{record.childName}</TableCell>,
          <TableCell key="start-date" className="text-xs">{record.startDate}</TableCell>,
          <TableCell key="changed-start" className="text-xs">{record.changedStartDate || '-'}</TableCell>,
          <TableCell key="current-unit" className="text-xs">{record.unit}</TableCell>,
          <TableCell key="submit-date" className="text-xs">{record.submitDate || record.startDate}</TableCell>,
          <TableCell key="other-info" className="text-xs">{record.otherInformation || '-'}</TableCell>,
          <TableCell key="current-rate" className="text-xs">{record.currentRateCategory || record.rateCategory}</TableCell>,
          <TableCell key="new-rate" className="text-xs">{record.newRateCategory || '-'}</TableCell>,
          <TableCell key="contracted-time" className="text-xs">{record.contractedTime}</TableCell>,
          <TableCell key="reason" className="text-xs">{record.reason || '-'}</TableCell>,
          <TableCell key="current-avg" className="text-xs">{record.currentAverageTime || record.averageTime}</TableCell>,
          <TableCell key="new-avg" className="text-xs">{record.newAverageTime || '-'}</TableCell>
        ];

      case 'timetable':
        return [
          ...baseCells,
          <TableCell key="timetable" className="text-xs">-</TableCell>,
          <TableCell key="status" className="text-xs">
            <Badge className={getStatusBadgeColor(record.status)}>{record.status}</Badge>
          </TableCell>,
          <TableCell key="child-civic" className="text-xs">{record.childCivicNumber}</TableCell>,
          <TableCell key="child-name" className="text-xs font-medium">{record.childName}</TableCell>,
          <TableCell key="unit" className="text-xs">{record.unit}</TableCell>,
          <TableCell key="start-date" className="text-xs">{record.startDate}</TableCell>,
          <TableCell key="end-date" className="text-xs">{record.endDate}</TableCell>,
          <TableCell key="timetable-type" className="text-xs">{record.timetableType}</TableCell>,
          <TableCell key="req-start" className="text-xs">{record.requestedStartDate}</TableCell>,
          <TableCell key="contracted-time" className="text-xs">{record.contractedTime}</TableCell>,
          <TableCell key="avg-time" className="text-xs">{record.averageTime}</TableCell>,
          <TableCell key="rate-category" className="text-xs">{record.rateCategory}</TableCell>
        ];

      case 'reasontype':
        return [
          ...baseCells,
          <TableCell key="status" className="text-xs">
            <Badge className={getStatusBadgeColor(record.status)}>{record.status}</Badge>
          </TableCell>,
          <TableCell key="child-civic" className="text-xs">{record.childCivicNumber}</TableCell>,
          <TableCell key="child-first" className="text-xs">{record.childFirstName || record.childName.split(' ')[0]}</TableCell>,
          <TableCell key="child-last" className="text-xs">{record.childLastName || record.childName.split(' ')[1] || ''}</TableCell>,
          <TableCell key="unit" className="text-xs">{record.unit}</TableCell>,
          <TableCell key="admission-start" className="text-xs">{record.admissionStart || record.startDate}</TableCell>,
          <TableCell key="end-date" className="text-xs">{record.endDate}</TableCell>,
          <TableCell key="desired-start" className="text-xs">{record.desiredStartDate || record.requestedStartDate}</TableCell>,
          <TableCell key="submit-date" className="text-xs">{record.submitDate || record.startDate}</TableCell>,
          <TableCell key="reasontype" className="text-xs">{record.reasontype || '-'}</TableCell>,
          <TableCell key="rate-category" className="text-xs">{record.rateCategory}</TableCell>,
          <TableCell key="contracted-time" className="text-xs">{record.contractedTime}</TableCell>,
          <TableCell key="avg-time" className="text-xs">{record.averageTime}</TableCell>
        ];

      case 'leave':
        return [
          ...baseCells,
          <TableCell key="state" className="text-xs">{record.state || '-'}</TableCell>,
          <TableCell key="civic-number" className="text-xs">{record.civicNumber || record.childCivicNumber}</TableCell>,
          <TableCell key="child-name" className="text-xs">{record.childName}</TableCell>,
          <TableCell key="unit" className="text-xs">{record.unit}</TableCell>,
          <TableCell key="leavetype" className="text-xs">{record.leavetype || '-'}</TableCell>,
          <TableCell key="submit-date" className="text-xs">{record.submitDate || record.startDate}</TableCell>,
          <TableCell key="desired-start" className="text-xs">{record.desiredStartDate || record.requestedStartDate}</TableCell>,
          <TableCell key="desired-end" className="text-xs">{record.desiredEndDate || record.endDate}</TableCell>,
          <TableCell key="reason" className="text-xs">{record.reason || '-'}</TableCell>
        ];

      default: // end-request
        return [
          ...baseCells,
          <TableCell key="status" className="text-xs">
            <Badge className={getStatusBadgeColor(record.status)}>{record.status}</Badge>
          </TableCell>,
          <TableCell key="replace-unit" className="text-xs">{record.replaceUnit || '-'}</TableCell>,
          <TableCell key="current-unit" className="text-xs">{record.currentUnit || record.unit}</TableCell>,
          <TableCell key="child" className="text-xs">{record.child || record.childName}</TableCell>,
          <TableCell key="req-end-date" className="text-xs">{record.requestedAdmissionEndDate || record.endDate}</TableCell>,
          <TableCell key="req-start-date" className="text-xs">{record.requestedNewAdmissionStartDate || record.requestedStartDate}</TableCell>,
          <TableCell key="reason" className="text-xs">{record.reason || '-'}</TableCell>,
          <TableCell key="submit-date" className="text-xs">{record.submitDate || record.startDate}</TableCell>,
          <TableCell key="requested-by" className="text-xs">{record.requestedBy || '-'}</TableCell>
        ];
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                {renderTableHeaders()}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={20} className="text-center py-8 text-slate-500">
                    No results found.
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((record, index) => (
                  <TableRow key={record.id} className="hover:bg-slate-50">
                    {renderTableCells(record, index)}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimetableTable;
