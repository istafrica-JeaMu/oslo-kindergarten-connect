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
import { Admission, AdmissionTab } from '@/types/childcare';
import CreateOfferButton from './CreateOfferButton';

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
  activeTab: AdmissionTab;
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
  onItemsPerPageChange,
  activeTab
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

  const getTableHeaders = () => {
    const baseHeaders = [
      <TableHead key="checkbox" className="w-12">
        <Checkbox
          checked={admissions.length > 0 && selectedRows.length === admissions.length}
          onCheckedChange={onSelectAll}
        />
      </TableHead>,
      <TableHead key="number" className="text-xs">#</TableHead>,
      <TableHead key="createOffer" className="text-xs w-20">Create Offer</TableHead>
    ];

    if (activeTab === 'terminated') {
      return [
        ...baseHeaders,
        <TableHead key="edit" className="text-xs">Edit</TableHead>,
        <SortableHeader key="childInfo" field="childInfo">Child info</SortableHeader>,
        <SortableHeader key="childCivicNumber" field="childCivicNumber">Child civic number</SortableHeader>,
        <SortableHeader key="childName" field="childName">Child name</SortableHeader>,
        <SortableHeader key="department" field="department">Department</SortableHeader>,
        <SortableHeader key="admissionStart" field="admissionStart">Admission start</SortableHeader>,
        <SortableHeader key="endDate" field="endDate">End date</SortableHeader>,
        <SortableHeader key="startDate" field="startDate">Start date</SortableHeader>,
        <SortableHeader key="changeStop" field="changeStop">Change stop</SortableHeader>,
        <SortableHeader key="terminationAppealDate" field="terminationAppealDate">Termination appeal date</SortableHeader>,
        <SortableHeader key="terminationDate" field="terminationDate">Termination date</SortableHeader>,
        <SortableHeader key="terminationStatus" field="terminationStatus">Termination status</SortableHeader>,
        <SortableHeader key="terminationReason" field="terminationReason">Termination reason</SortableHeader>
      ];
    } else if (activeTab === 'deleted') {
      return [
        ...baseHeaders,
        <SortableHeader key="childInfo" field="childInfo">Child info</SortableHeader>,
        <SortableHeader key="childCivicNumber" field="childCivicNumber">Child civic number</SortableHeader>,
        <SortableHeader key="childName" field="childName">Child name</SortableHeader>,
        <SortableHeader key="department" field="department">Department</SortableHeader>,
        <SortableHeader key="admissionStart" field="admissionStart">Admission start</SortableHeader>,
        <SortableHeader key="endDate" field="endDate">End date</SortableHeader>,
        <SortableHeader key="startDate" field="startDate">Start date</SortableHeader>,
        <SortableHeader key="changeStop" field="changeStop">Change stop</SortableHeader>,
        <SortableHeader key="rateCategory" field="rateCategory">Ratecategory</SortableHeader>,
        <SortableHeader key="averageTime" field="averageTime">Average time</SortableHeader>,
        <SortableHeader key="reasonType" field="reasonType">Reasontype</SortableHeader>,
        <SortableHeader key="timetable" field="timetable">Timetable</SortableHeader>,
        <TableHead key="showTimetable" className="text-xs">Show timetable</TableHead>,
        <TableHead key="journalNote" className="text-xs">Journal note</TableHead>,
        <TableHead key="delete" className="text-xs">Delete</TableHead>
      ];
    } else {
      // Default columns for current, future, historical, and all admissions
      return [
        ...baseHeaders,
        <TableHead key="edit" className="text-xs">Edit</TableHead>,
        <SortableHeader key="childInfo" field="childInfo">Child info</SortableHeader>,
        <SortableHeader key="childCivicNumber" field="childCivicNumber">Child civic number</SortableHeader>,
        <SortableHeader key="childName" field="childName">Child name</SortableHeader>,
        <SortableHeader key="department" field="department">Department</SortableHeader>,
        <SortableHeader key="admissionStart" field="admissionStart">Admission start</SortableHeader>,
        <SortableHeader key="endDate" field="endDate">End date</SortableHeader>,
        <SortableHeader key="startDate" field="startDate">Start date</SortableHeader>,
        <SortableHeader key="changeStop" field="changeStop">Change stop</SortableHeader>,
        <SortableHeader key="rateCategory" field="rateCategory">Ratecategory</SortableHeader>,
        <SortableHeader key="averageTime" field="averageTime">Average time</SortableHeader>,
        <SortableHeader key="reasonType" field="reasonType">Reasontype</SortableHeader>,
        <SortableHeader key="timetable" field="timetable">Timetable</SortableHeader>,
        <TableHead key="showTimetable" className="text-xs">Show timetable</TableHead>,
        <TableHead key="journalNote" className="text-xs">Journal note</TableHead>
      ];
    }
  };

  const getTableCells = (admission: Admission, index: number) => {
    const baseCells = [
      <TableCell key="checkbox">
        <Checkbox
          checked={selectedRows.includes(admission.id)}
          onCheckedChange={(checked) => onSelectRow(admission.id, checked as boolean)}
        />
      </TableCell>,
      <TableCell key="number" className="font-medium text-xs">
        {(currentPage - 1) * itemsPerPage + index + 1}
      </TableCell>,
      <TableCell key="createOffer">
        <CreateOfferButton
          childData={admission.child}
          serviceType={admission.department.name.toLowerCase().includes('fritids') ? 'afterschool' : 'childcare'}
        />
      </TableCell>
    ];

    if (activeTab === 'terminated') {
      return [
        ...baseCells,
        <TableCell key="edit">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEditChild(admission)}
            className="w-8 h-8 p-0"
          >
            <Edit className="w-3 h-3" />
          </Button>
        </TableCell>,
        <TableCell key="childInfo">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewAdmission(admission)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
        </TableCell>,
        <TableCell key="childCivicNumber" className="text-xs font-mono">
          {admission.child.civicNumber}
        </TableCell>,
        <TableCell key="childName" className="text-xs font-medium">
          <div className="flex items-center gap-2">
            {admission.child.fullName}
            {admission.child.specialNeedsFlag && (
              <Badge variant="outline" className="text-xs">Special needs</Badge>
            )}
          </div>
        </TableCell>,
        <TableCell key="department" className="text-xs">
          <div>
            <div className="font-medium">{admission.department.name}</div>
            <div className="text-gray-500 text-xs">{admission.department.unitName}</div>
          </div>
        </TableCell>,
        <TableCell key="admissionStart" className="text-xs">{admission.admissionStart}</TableCell>,
        <TableCell key="endDate" className="text-xs">{admission.endDate}</TableCell>,
        <TableCell key="startDate" className="text-xs">{admission.startDate}</TableCell>,
        <TableCell key="changeStop" className="text-xs">{admission.changeStop || '-'}</TableCell>,
        <TableCell key="terminationAppealDate" className="text-xs">-</TableCell>,
        <TableCell key="terminationDate" className="text-xs">-</TableCell>,
        <TableCell key="terminationStatus" className="text-xs">-</TableCell>,
        <TableCell key="terminationReason" className="text-xs">-</TableCell>
      ];
    } else if (activeTab === 'deleted') {
      return [
        ...baseCells,
        <TableCell key="childInfo">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewAdmission(admission)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
        </TableCell>,
        <TableCell key="childCivicNumber" className="text-xs font-mono">
          {admission.child.civicNumber}
        </TableCell>,
        <TableCell key="childName" className="text-xs font-medium">
          <div className="flex items-center gap-2">
            {admission.child.fullName}
            {admission.child.specialNeedsFlag && (
              <Badge variant="outline" className="text-xs">Special needs</Badge>
            )}
          </div>
        </TableCell>,
        <TableCell key="department" className="text-xs">
          <div>
            <div className="font-medium">{admission.department.name}</div>
            <div className="text-gray-500 text-xs">{admission.department.unitName}</div>
          </div>
        </TableCell>,
        <TableCell key="admissionStart" className="text-xs">{admission.admissionStart}</TableCell>,
        <TableCell key="endDate" className="text-xs">{admission.endDate}</TableCell>,
        <TableCell key="startDate" className="text-xs">{admission.startDate}</TableCell>,
        <TableCell key="changeStop" className="text-xs">{admission.changeStop || '-'}</TableCell>,
        <TableCell key="rateCategory" className="text-xs">
          <Badge variant="outline">{admission.rateCategory.name}</Badge>
        </TableCell>,
        <TableCell key="averageTime" className="text-xs">{admission.averageTime}</TableCell>,
        <TableCell key="reasonType" className="text-xs">{admission.reasonType}</TableCell>,
        <TableCell key="timetable" className="text-xs">
          <Badge variant="outline">
            {admission.timetable.schedulePattern}
          </Badge>
        </TableCell>,
        <TableCell key="showTimetable">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <Calendar className="w-3 h-3" />
          </Button>
        </TableCell>,
        <TableCell key="journalNote">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <FileText className="w-3 h-3" />
          </Button>
        </TableCell>,
        <TableCell key="delete" className="text-xs">Delete</TableCell>
      ];
    } else {
      // Default cells for current, future, historical, and all admissions
      return [
        ...baseCells,
        <TableCell key="edit">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEditChild(admission)}
            className="w-8 h-8 p-0"
          >
            <Edit className="w-3 h-3" />
          </Button>
        </TableCell>,
        <TableCell key="childInfo">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewAdmission(admission)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
        </TableCell>,
        <TableCell key="childCivicNumber" className="text-xs font-mono">
          {admission.child.civicNumber}
        </TableCell>,
        <TableCell key="childName" className="text-xs font-medium">
          <div className="flex items-center gap-2">
            {admission.child.fullName}
            {admission.child.specialNeedsFlag && (
              <Badge variant="outline" className="text-xs">Special needs</Badge>
            )}
          </div>
        </TableCell>,
        <TableCell key="department" className="text-xs">
          <div>
            <div className="font-medium">{admission.department.name}</div>
            <div className="text-gray-500 text-xs">{admission.department.unitName}</div>
          </div>
        </TableCell>,
        <TableCell key="admissionStart" className="text-xs">{admission.admissionStart}</TableCell>,
        <TableCell key="endDate" className="text-xs">{admission.endDate}</TableCell>,
        <TableCell key="startDate" className="text-xs">{admission.startDate}</TableCell>,
        <TableCell key="changeStop" className="text-xs">{admission.changeStop || '-'}</TableCell>,
        <TableCell key="rateCategory" className="text-xs">
          <Badge variant="outline">{admission.rateCategory.name}</Badge>
        </TableCell>,
        <TableCell key="averageTime" className="text-xs">{admission.averageTime}</TableCell>,
        <TableCell key="reasonType" className="text-xs">{admission.reasonType}</TableCell>,
        <TableCell key="timetable" className="text-xs">
          <Badge variant="outline">
            {admission.timetable.schedulePattern}
          </Badge>
        </TableCell>,
        <TableCell key="showTimetable">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <Calendar className="w-3 h-3" />
          </Button>
        </TableCell>,
        <TableCell key="journalNote">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <FileText className="w-3 h-3" />
          </Button>
        </TableCell>
      ];
    }
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
              {getTableHeaders()}
            </TableRow>
          </TableHeader>
          <TableBody>
            {admissions.map((admission, index) => (
              <TableRow key={admission.id} className="hover:bg-slate-50">
                {getTableCells(admission, index)}
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
