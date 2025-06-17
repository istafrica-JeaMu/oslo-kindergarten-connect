
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { 
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Check,
  X
} from 'lucide-react';

interface PlacementRecord {
  id: string;
  applicationNumber: string;
  childName: string;
  birthDate: string;
  guardianName: string;
  preferredUnit: string;
  requestedStartDate: string;
  priority: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Under Review';
  submissionDate: string;
  municipality: 'förskola' | 'fritidshem';
}

const PlacementManagement = () => {
  const [selectedMunicipality, setSelectedMunicipality] = useState<'förskola' | 'fritidshem'>('förskola');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const itemsPerPage = 10;

  // Mock data for the table
  const mockData: PlacementRecord[] = [
    {
      id: '1',
      applicationNumber: 'APP-2024-001',
      childName: 'Emma Andersson',
      birthDate: '2022-03-15',
      guardianName: 'Anna Andersson',
      preferredUnit: 'Solbacka Förskola',
      requestedStartDate: '2024-08-01',
      priority: 1,
      status: 'Pending',
      submissionDate: '2024-01-15',
      municipality: 'förskola'
    },
    {
      id: '2',
      applicationNumber: 'APP-2024-002',
      childName: 'Lucas Nilsson',
      birthDate: '2021-08-20',
      guardianName: 'Erik Nilsson',
      preferredUnit: 'Björkträd Fritidshem',
      requestedStartDate: '2024-08-15',
      priority: 2,
      status: 'Under Review',
      submissionDate: '2024-01-20',
      municipality: 'fritidshem'
    },
    {
      id: '3',
      applicationNumber: 'APP-2024-003',
      childName: 'Astrid Johansson',
      birthDate: '2023-05-05',
      guardianName: 'Maria Johansson',
      preferredUnit: 'Rosengård Förskola',
      requestedStartDate: '2024-09-01',
      priority: 1,
      status: 'Approved',
      submissionDate: '2024-02-01',
      municipality: 'förskola'
    },
    {
      id: '4',
      applicationNumber: 'APP-2024-004',
      childName: 'Oliver Berg',
      birthDate: '2022-11-12',
      guardianName: 'Sara Berg',
      preferredUnit: 'Centrum Förskola',
      requestedStartDate: '2024-08-20',
      priority: 3,
      status: 'Pending',
      submissionDate: '2024-01-25',
      municipality: 'förskola'
    },
    {
      id: '5',
      applicationNumber: 'APP-2024-005',
      childName: 'Maja Larsson',
      birthDate: '2021-04-08',
      guardianName: 'John Larsson',
      preferredUnit: 'Västra Fritidshem',
      requestedStartDate: '2024-08-12',
      priority: 2,
      status: 'Rejected',
      submissionDate: '2024-02-10',
      municipality: 'fritidshem'
    }
  ];

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Approved':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const filteredData = mockData.filter(record => {
    const matchesMunicipality = record.municipality === selectedMunicipality;
    const matchesSearch = !searchTerm || 
      record.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.guardianName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.preferredUnit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    
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

  const handleBulkAction = (action: 'approve' | 'reject') => {
    console.log(`Bulk ${action} for records:`, selectedRows);
    setSelectedRows([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Placement Management</h1>
          <p className="text-slate-600">Process and approve kindergarten placement applications</p>
        </div>
      </div>

      {/* Municipality Toggle */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Municipality Type:</span>
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={selectedMunicipality === 'förskola' ? 'default' : 'ghost'}
                className={`rounded-none border-0 ${
                  selectedMunicipality === 'förskola' 
                    ? 'bg-oslo-blue text-white' 
                    : 'bg-white text-slate-600 hover:bg-slate-50'
                }`}
                onClick={() => setSelectedMunicipality('förskola')}
              >
                Förskola
              </Button>
              <Button
                variant={selectedMunicipality === 'fritidshem' ? 'default' : 'ghost'}
                className={`rounded-none border-0 ${
                  selectedMunicipality === 'fritidshem' 
                    ? 'bg-oslo-blue text-white' 
                    : 'bg-white text-slate-600 hover:bg-slate-50'
                }`}
                onClick={() => setSelectedMunicipality('fritidshem')}
              >
                Fritidshem
              </Button>
            </div>
            <Badge variant="outline" className="ml-auto">
              {filteredData.length} applications
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search applications... (ctrl+shift+s)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>

            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          {selectedRows.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{selectedRows.length} selected</Badge>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleBulkAction('approve')}
                className="text-green-600 border-green-300 hover:bg-green-50"
              >
                <Check className="w-4 h-4 mr-1" />
                Approve Selected
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleBulkAction('reject')}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                <X className="w-4 h-4 mr-1" />
                Reject Selected
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        paginatedData.length > 0 && 
                        selectedRows.length === paginatedData.length
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Application #</TableHead>
                  <TableHead>Child Name</TableHead>
                  <TableHead>Birth Date</TableHead>
                  <TableHead>Guardian</TableHead>
                  <TableHead>Preferred Unit</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} className="text-center py-8 text-slate-500">
                      No results found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((record) => (
                    <TableRow key={record.id} className="hover:bg-slate-50">
                      <TableCell>
                        <Checkbox
                          checked={selectedRows.includes(record.id)}
                          onCheckedChange={(checked) => handleSelectRow(record.id, checked)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{record.applicationNumber}</TableCell>
                      <TableCell className="font-medium">{record.childName}</TableCell>
                      <TableCell>{record.birthDate}</TableCell>
                      <TableCell>{record.guardianName}</TableCell>
                      <TableCell>{record.preferredUnit}</TableCell>
                      <TableCell>{record.requestedStartDate}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{record.priority}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(record.status)}>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{record.submissionDate}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">
          Cancel
        </Button>
        <Button 
          variant="outline"
          className="text-red-600 border-red-300 hover:bg-red-50"
        >
          <X className="w-4 h-4 mr-2" />
          Reject
        </Button>
        <Button className="bg-green-600 hover:bg-green-700">
          <Check className="w-4 h-4 mr-2" />
          Approve
        </Button>
      </div>
    </div>
  );
};

export default PlacementManagement;
