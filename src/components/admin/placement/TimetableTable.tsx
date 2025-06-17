
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
}

interface TimetableTableProps {
  data: TimetableRecord[];
  selectedRows: string[];
  onSelectAll: (checked: boolean | "indeterminate") => void;
  onSelectRow: (id: string, checked: boolean | "indeterminate") => void;
}

const TimetableTable = ({ data, selectedRows, onSelectAll, onSelectRow }: TimetableTableProps) => {
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

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      data.length > 0 && 
                      selectedRows.length === data.length
                    }
                    onCheckedChange={onSelectAll}
                  />
                </TableHead>
                <TableHead>#</TableHead>
                <TableHead>Timetable</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>The child's civic number</TableHead>
                <TableHead>The child's name</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Start date</TableHead>
                <TableHead>End date</TableHead>
                <TableHead>Timetable type</TableHead>
                <TableHead>Requested start date</TableHead>
                <TableHead>Contracted time</TableHead>
                <TableHead>Average time</TableHead>
                <TableHead>Rate category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={14} className="text-center py-8 text-slate-500">
                    No results found
                  </TableCell>
                </TableRow>
              ) : (
                data.map((record, index) => (
                  <TableRow key={record.id} className="hover:bg-slate-50">
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(record.id)}
                        onCheckedChange={(checked) => onSelectRow(record.id, checked)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(record.status)}>
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{record.childCivicNumber}</TableCell>
                    <TableCell className="font-medium">{record.childName}</TableCell>
                    <TableCell>{record.unit}</TableCell>
                    <TableCell>{record.startDate}</TableCell>
                    <TableCell>{record.endDate}</TableCell>
                    <TableCell>{record.timetableType}</TableCell>
                    <TableCell>{record.requestedStartDate}</TableCell>
                    <TableCell>{record.contractedTime}</TableCell>
                    <TableCell>{record.averageTime}</TableCell>
                    <TableCell>{record.rateCategory}</TableCell>
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
