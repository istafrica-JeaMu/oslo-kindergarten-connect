
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
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

const TimetableTable = ({ data, selectedRows, onSelectAll, onSelectRow, activeTab }: TimetableTableProps) => {
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
          <TableHead key="status" className="text-xs">Status</TableHead>,
          <TableHead key="replace-unit" className="text-xs">Replace unit</TableHead>,
          <TableHead key="current-unit" className="text-xs">Current unit</TableHead>,
          <TableHead key="child" className="text-xs">Child</TableHead>,
          <TableHead key="req-end-date" className="text-xs">Req. admission end date</TableHead>,
          <TableHead key="req-start-date" className="text-xs">Req. new admission start date</TableHead>,
          <TableHead key="reason" className="text-xs">Reason</TableHead>,
          <TableHead key="submit-date" className="text-xs">Submit date</TableHead>,
          <TableHead key="requested-by" className="text-xs">Requested by</TableHead>
        ];

      case 'rate-category':
        return [
          ...baseHeaders,
          <TableHead key="status" className="text-xs">Status</TableHead>,
          <TableHead key="child-civic" className="text-xs">Child civic number</TableHead>,
          <TableHead key="child-name" className="text-xs">Child name</TableHead>,
          <TableHead key="start-date" className="text-xs">Start Date</TableHead>,
          <TableHead key="changed-start" className="text-xs">Changed startdate</TableHead>,
          <TableHead key="current-unit" className="text-xs">Current unit</TableHead>,
          <TableHead key="submit-date" className="text-xs">Submit date</TableHead>,
          <TableHead key="other-info" className="text-xs">Other information</TableHead>,
          <TableHead key="current-rate" className="text-xs">Current rate category</TableHead>,
          <TableHead key="new-rate" className="text-xs">New rate category</TableHead>,
          <TableHead key="contracted-time" className="text-xs">Contracted time</TableHead>,
          <TableHead key="reason" className="text-xs">Reason</TableHead>,
          <TableHead key="current-avg" className="text-xs">Current average time</TableHead>,
          <TableHead key="new-avg" className="text-xs">New average time</TableHead>
        ];

      case 'timetable':
        return [
          ...baseHeaders,
          <TableHead key="timetable" className="text-xs">Timetable</TableHead>,
          <TableHead key="status" className="text-xs">Status</TableHead>,
          <TableHead key="child-civic" className="text-xs">Child civic number</TableHead>,
          <TableHead key="child-name" className="text-xs">Child name</TableHead>,
          <TableHead key="unit" className="text-xs">Unit</TableHead>,
          <TableHead key="start-date" className="text-xs">Start date</TableHead>,
          <TableHead key="end-date" className="text-xs">End date</TableHead>,
          <TableHead key="timetable-type" className="text-xs">Timetable type</TableHead>,
          <TableHead key="req-start" className="text-xs">Req. start date</TableHead>,
          <TableHead key="contracted-time" className="text-xs">Contracted time</TableHead>,
          <TableHead key="avg-time" className="text-xs">Average time</TableHead>,
          <TableHead key="rate-category" className="text-xs">Rate category</TableHead>
        ];

      case 'reasontype':
        return [
          ...baseHeaders,
          <TableHead key="status" className="text-xs">Status</TableHead>,
          <TableHead key="child-civic" className="text-xs">Child civic number</TableHead>,
          <TableHead key="child-first" className="text-xs">Child first name</TableHead>,
          <TableHead key="child-last" className="text-xs">Child last name</TableHead>,
          <TableHead key="unit" className="text-xs">Unit</TableHead>,
          <TableHead key="admission-start" className="text-xs">Admission start</TableHead>,
          <TableHead key="end-date" className="text-xs">End date</TableHead>,
          <TableHead key="desired-start" className="text-xs">Desired startdate</TableHead>,
          <TableHead key="submit-date" className="text-xs">Submit date</TableHead>,
          <TableHead key="reasontype" className="text-xs">Reasontype</TableHead>,
          <TableHead key="rate-category" className="text-xs">Rate category</TableHead>,
          <TableHead key="contracted-time" className="text-xs">Contracted time</TableHead>,
          <TableHead key="avg-time" className="text-xs">Average time</TableHead>
        ];

      case 'leave':
        return [
          ...baseHeaders,
          <TableHead key="state" className="text-xs">State</TableHead>,
          <TableHead key="civic-number" className="text-xs">Civic number</TableHead>,
          <TableHead key="child-name" className="text-xs">Child name</TableHead>,
          <TableHead key="unit" className="text-xs">Unit</TableHead>,
          <TableHead key="leavetype" className="text-xs">Leavetype</TableHead>,
          <TableHead key="submit-date" className="text-xs">Submit date</TableHead>,
          <TableHead key="desired-start" className="text-xs">Desired start date</TableHead>,
          <TableHead key="desired-end" className="text-xs">Desired end date</TableHead>,
          <TableHead key="reason" className="text-xs">Reason</TableHead>
        ];

      default: // end-request
        return [
          ...baseHeaders,
          <TableHead key="status" className="text-xs">Status</TableHead>,
          <TableHead key="replace-unit" className="text-xs">Replace unit</TableHead>,
          <TableHead key="current-unit" className="text-xs">Current unit</TableHead>,
          <TableHead key="child" className="text-xs">Child</TableHead>,
          <TableHead key="req-end-date" className="text-xs">Req. admission end date</TableHead>,
          <TableHead key="req-start-date" className="text-xs">Req. new admission start date</TableHead>,
          <TableHead key="reason" className="text-xs">Reason</TableHead>,
          <TableHead key="submit-date" className="text-xs">Submit date</TableHead>,
          <TableHead key="requested-by" className="text-xs">Requested by</TableHead>
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
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={20} className="text-center py-8 text-slate-500">
                    No results found.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((record, index) => (
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
