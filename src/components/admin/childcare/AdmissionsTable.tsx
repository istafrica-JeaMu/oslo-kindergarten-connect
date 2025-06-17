
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Edit, 
  Eye, 
  Calendar, 
  FileText, 
  ChevronUp, 
  ChevronDown, 
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Admission } from '@/types/childcare';

interface AdmissionsTableProps {
  admissions: Admission[];
  selectedRows: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (id: string, checked: boolean) => void;
  onEditChild: (admission: Admission) => void;
  onViewAdmission: (admission: Admission) => void;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string, direction: 'asc' | 'desc') => void;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const AdmissionsTable = ({
  admissions,
  selectedRows,
  onSelectAll,
  onSelectRow,
  onEditChild,
  onViewAdmission,
  sortField,
  sortDirection,
  onSort,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}: AdmissionsTableProps) => {
  const handleSort = (field: string) => {
    if (sortField === field) {
      onSort(field, sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      onSort(field, 'asc');
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ChevronsUpDown className="w-3 h-3 ml-1 text-gray-400" />;
    }
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-3 h-3 ml-1 text-blue-600" /> : 
      <ChevronDown className="w-3 h-3 ml-1 text-blue-600" />;
  };

  const SortableHeader = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <TableHead 
      className="text-xs cursor-pointer hover:bg-slate-100 select-none"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center">
        {children}
        {getSortIcon(field)}
      </div>
    </TableHead>
  );

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      future: 'bg-blue-100 text-blue-800',
      historical: 'bg-gray-100 text-gray-800',
      terminated: 'bg-red-100 text-red-800',
      deleted: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (admissions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">No results found.</div>
        <p className="text-gray-400">Try adjusting your filters or search criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Sort Order Display */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Sort Order:</span>
        <Badge variant="outline">
          {sortField === 'childLastName' ? 'Child last name' : 
           sortField === 'childFirstName' ? 'Child first name' : sortField} {' '}
          {sortDirection === 'asc' ? '↑' : '↓'}
        </Badge>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-12">
                <Checkbox
                  checked={admissions.length > 0 && selectedRows.length === admissions.length}
                  onCheckedChange={onSelectAll}
                />
              </TableHead>
              <TableHead className="text-xs">#</TableHead>
              <TableHead className="text-xs">Edit</TableHead>
              <SortableHeader field="childInfo">Child info</SortableHeader>
              <SortableHeader field="childCivicNumber">Child civic number</SortableHeader>
              <SortableHeader field="childName">Child name</SortableHeader>
              <SortableHeader field="department">Department</SortableHeader>
              <SortableHeader field="admissionStart">Admission start</SortableHeader>
              <SortableHeader field="endDate">End date</SortableHeader>
              <SortableHeader field="startDate">Start date</SortableHeader>
              <SortableHeader field="changeStop">Change stop</SortableHeader>
              <SortableHeader field="rateCategory">Rate category</SortableHeader>
              <SortableHeader field="averageTime">Average time</SortableHeader>
              <SortableHeader field="reasonType">Reason type</SortableHeader>
              <SortableHeader field="timetable">Timetable</SortableHeader>
              <TableHead className="text-xs">Show timetable</TableHead>
              <TableHead className="text-xs">Journal note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admissions.map((admission, index) => (
              <TableRow key={admission.id} className="hover:bg-slate-50">
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(admission.id)}
                    onCheckedChange={(checked) => onSelectRow(admission.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell className="font-medium text-xs">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditChild(admission)}
                    className="w-8 h-8 p-0"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewAdmission(admission)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </TableCell>
                <TableCell className="text-xs font-mono">
                  {admission.child.civicNumber}
                </TableCell>
                <TableCell className="text-xs font-medium">
                  <div className="flex items-center gap-2">
                    {admission.child.fullName}
                    {admission.child.specialNeedsFlag && (
                      <Badge variant="outline" className="text-xs">Special needs</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-xs">
                  <div>
                    <div className="font-medium">{admission.department.name}</div>
                    <div className="text-gray-500 text-xs">{admission.department.unitName}</div>
                  </div>
                </TableCell>
                <TableCell className="text-xs">{admission.admissionStart}</TableCell>
                <TableCell className="text-xs">{admission.endDate}</TableCell>
                <TableCell className="text-xs">{admission.startDate}</TableCell>
                <TableCell className="text-xs">{admission.changeStop || '-'}</TableCell>
                <TableCell className="text-xs">
                  <Badge variant="outline">{admission.rateCategory.name}</Badge>
                </TableCell>
                <TableCell className="text-xs">{admission.averageTime}</TableCell>
                <TableCell className="text-xs">{admission.reasonType}</TableCell>
                <TableCell className="text-xs">
                  <Badge variant="outline">
                    {admission.timetable.schedulePattern}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                    <Calendar className="w-3 h-3" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                    <FileText className="w-3 h-3" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Page</span>
          <span className="font-medium">{currentPage}</span>
          <span className="text-sm text-gray-600">of {totalPages}</span>
          <select
            className="ml-4 border rounded px-2 py-1 text-sm"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            <option value={15}>15</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = i + 1;
            return (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page)}
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            );
          })}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsTable;
