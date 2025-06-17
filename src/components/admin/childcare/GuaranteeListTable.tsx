
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
  Users, 
  Plus,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Download,
  UserPlus
} from 'lucide-react';

interface GuaranteeApplication {
  id: string;
  guaranteedDate: string;
  priority: string;
  application: string;
  offerCategory: string;
  civicNumber: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  areaCode: string;
  areaName: string;
  cityDistrict: string;
  address: string;
  queueDate: string;
  requestedDate: string;
  process: string;
}

interface GuaranteeListTableProps {
  applications: GuaranteeApplication[];
  selectedRows: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (id: string, checked: boolean) => void;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const GuaranteeListTable = ({
  applications,
  selectedRows,
  onSelectAll,
  onSelectRow,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}: GuaranteeListTableProps) => {
  
  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">No applications in guarantee list.</div>
        <p className="text-gray-400">Applications that qualify for statutory guarantee will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Sort Order Display */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Sort Order: <Badge variant="outline">Queue date ↑</Badge>
        </div>
        <div className="text-sm text-gray-500">
          1 - 3 of 3
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-12">
                <Checkbox
                  checked={applications.length > 0 && selectedRows.length === applications.length}
                  onCheckedChange={onSelectAll}
                />
              </TableHead>
              <TableHead className="text-xs">#</TableHead>
              <TableHead className="text-xs">Review</TableHead>
              <TableHead className="text-xs">Admissions</TableHead>
              <TableHead className="text-xs">Create offer</TableHead>
              <TableHead className="text-xs">Guaranteed</TableHead>
              <TableHead className="text-xs">Priority</TableHead>
              <TableHead className="text-xs">Application</TableHead>
              <TableHead className="text-xs">Offer Category</TableHead>
              <TableHead className="text-xs">Civic number</TableHead>
              <TableHead className="text-xs">First name</TableHead>
              <TableHead className="text-xs">Last name</TableHead>
              <TableHead className="text-xs">Birthdate</TableHead>
              <TableHead className="text-xs">Area code</TableHead>
              <TableHead className="text-xs">Area name</TableHead>
              <TableHead className="text-xs">City district</TableHead>
              <TableHead className="text-xs">Address</TableHead>
              <TableHead className="text-xs">Queue date</TableHead>
              <TableHead className="text-xs">Requested</TableHead>
              <TableHead className="text-xs">Process</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application, index) => (
              <TableRow key={application.id} className="hover:bg-slate-50">
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(application.id)}
                    onCheckedChange={(checked) => onSelectRow(application.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell className="font-medium text-xs">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                    <Edit className="w-3 h-3 text-blue-600" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                    <Users className="w-3 h-3 text-blue-600" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                    <Plus className="w-3 h-3 text-green-600" />
                  </Button>
                </TableCell>
                <TableCell className="text-xs">{application.guaranteedDate}</TableCell>
                <TableCell className="text-xs">
                  {application.priority && (
                    <Badge variant="outline" className="text-xs">{application.priority}</Badge>
                  )}
                </TableCell>
                <TableCell className="text-xs">{application.application}</TableCell>
                <TableCell className="text-xs">{application.offerCategory}</TableCell>
                <TableCell className="text-xs font-mono">{application.civicNumber}</TableCell>
                <TableCell className="text-xs font-medium">{application.firstName}</TableCell>
                <TableCell className="text-xs font-medium">{application.lastName}</TableCell>
                <TableCell className="text-xs">{application.birthdate}</TableCell>
                <TableCell className="text-xs">{application.areaCode}</TableCell>
                <TableCell className="text-xs">{application.areaName}</TableCell>
                <TableCell className="text-xs">{application.cityDistrict}</TableCell>
                <TableCell className="text-xs">{application.address}</TableCell>
                <TableCell className="text-xs">{application.queueDate}</TableCell>
                <TableCell className="text-xs">{application.requestedDate}</TableCell>
                <TableCell className="text-xs">{application.process}</TableCell>
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

      {/* Bottom Actions */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
        
        <Button variant="outline" size="sm" className="gap-2">
          <UserPlus className="w-4 h-4" />
          Send e-mail
        </Button>
      </div>
    </div>
  );
};

export default GuaranteeListTable;
