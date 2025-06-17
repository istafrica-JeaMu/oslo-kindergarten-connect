import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { 
  CheckCircle, 
  Calendar, 
  Users, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  Plus,
  Minus,
  Search,
  Download,
  MoreHorizontal,
  Clock,
  MapPin
} from 'lucide-react';

interface PlacementApplication {
  id: string;
  timetableId: string;
  status: 'New' | 'In Progress' | 'Approved' | 'Rejected';
  childCivicNumber: string;
  childName: string;
  unit: string;
  startDate: string;
  endDate: string;
  timetableType: 'Full-time' | 'Part-time' | 'Flexible';
  requestedStartDate: string;
  contractedTime: number;
  averageTime: number;
  rateCategory: string;
}

interface FilterCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
}

const PlacementManagement = () => {
  const [selectedMunicipality, setSelectedMunicipality] = useState<'förskola' | 'fritidshem'>('förskola');
  const [showOnlyCurrentUnits, setShowOnlyCurrentUnits] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterConditions, setFilterConditions] = useState<FilterCondition[]>([
    { id: '1', field: '', operator: '', value: '' }
  ]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const mockApplications: PlacementApplication[] = [
    {
      id: '1',
      timetableId: 'TT-2024-001',
      status: 'New',
      childCivicNumber: '20220315-****',
      childName: 'Emma Andersson',
      unit: 'Solbacka Förskola',
      startDate: '2024-02-01',
      endDate: '2024-08-31',
      timetableType: 'Full-time',
      requestedStartDate: '2024-01-15',
      contractedTime: 8,
      averageTime: 7.5,
      rateCategory: 'Standard'
    },
    {
      id: '2',
      timetableId: 'TT-2024-002',
      status: 'In Progress',
      childCivicNumber: '20210820-****',
      childName: 'Lucas Nilsson',
      unit: 'Björkträd Fritidshem',
      startDate: '2024-01-20',
      endDate: '2024-06-15',
      timetableType: 'Part-time',
      requestedStartDate: '2024-01-10',
      contractedTime: 4,
      averageTime: 4.2,
      rateCategory: 'Reduced'
    },
    {
      id: '3',
      timetableId: 'TT-2024-003',
      status: 'Approved',
      childCivicNumber: '20230505-****',
      childName: 'Astrid Johansson',
      unit: 'Rosengård Förskola',
      startDate: '2024-03-01',
      endDate: '2024-12-20',
      timetableType: 'Flexible',
      requestedStartDate: '2024-02-15',
      contractedTime: 6,
      averageTime: 5.8,
      rateCategory: 'Standard'
    }
  ];

  const filterFields = [
    'Status application',
    'Child name',
    'Unit',
    'Start date',
    'End date',
    'Timetable type',
    'Rate category'
  ];

  const filterOperators = [
    'Equals',
    'Contains',
    'In',
    'Not in',
    'Greater than',
    'Less than'
  ];

  const statusOptions = ['New', 'In Progress', 'Approved', 'Rejected'];
  const timetableTypes = ['Full-time', 'Part-time', 'Flexible'];
  const rateCategories = ['Standard', 'Reduced', 'Premium'];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'New':
        return 'secondary';
      case 'In Progress':
        return 'default';
      case 'Approved':
        return 'default';
      case 'Rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const addFilterCondition = () => {
    setFilterConditions([
      ...filterConditions,
      { id: Date.now().toString(), field: '', operator: '', value: '' }
    ]);
  };

  const removeFilterCondition = (id: string) => {
    setFilterConditions(filterConditions.filter(condition => condition.id !== id));
  };

  const updateFilterCondition = (id: string, field: string, value: any) => {
    setFilterConditions(filterConditions.map(condition =>
      condition.id === id ? { ...condition, [field]: value } : condition
    ));
  };

  const handleSelectAll = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      setSelectedRows(mockApplications.map(app => app.id));
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

  const handleShowOnlyCurrentUnits = (checked: boolean | "indeterminate") => {
    setShowOnlyCurrentUnits(checked === true);
  };

  const filteredApplications = mockApplications.filter(app => {
    // Filter by municipality type
    const municipalityMatch = selectedMunicipality === 'förskola' 
      ? app.unit.includes('Förskola')
      : app.unit.includes('Fritidshem');
    
    // Filter by search term
    const searchMatch = !searchTerm || 
      app.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.timetableId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.unit.toLowerCase().includes(searchTerm.toLowerCase());

    return municipalityMatch && searchMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <CheckCircle className="w-8 h-8 text-green-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Placement Management</h1>
          <p className="text-slate-600">Process applications, manage timetables, and track placements</p>
        </div>
      </div>

      {/* Municipality Selector */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Municipality & Settings</CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="currentUnits" 
                  checked={showOnlyCurrentUnits}
                  onCheckedChange={handleShowOnlyCurrentUnits}
                />
                <Label htmlFor="currentUnits">Show only current units</Label>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Label>Municipality Type:</Label>
            <Select value={selectedMunicipality} onValueChange={(value: 'förskola' | 'fritidshem') => setSelectedMunicipality(value)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="förskola">Förskola (Preschool)</SelectItem>
                <SelectItem value="fritidshem">Fritidshem (After-school)</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="outline" className="ml-2">
              {filteredApplications.length} applications
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="accept" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="accept">Accept</TabsTrigger>
          <TabsTrigger value="timetable">Timetable</TabsTrigger>
          <TabsTrigger value="end-request">End Request</TabsTrigger>
          <TabsTrigger value="replace-request">Replace Request</TabsTrigger>
          <TabsTrigger value="rate-category">Rate Category</TabsTrigger>
          <TabsTrigger value="reasontype">Reasontype</TabsTrigger>
        </TabsList>

        <TabsContent value="accept" className="space-y-6">
          {/* Advanced Filtering */}
          <Card>
            <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-slate-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="w-5 h-5" />
                      Advanced Filters
                    </CardTitle>
                    {isFilterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  {filterConditions.map((condition, index) => (
                    <div key={condition.id} className="flex items-center gap-4">
                      <Select value={condition.field} onValueChange={(value) => updateFilterCondition(condition.id, 'field', value)}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Select field" />
                        </SelectTrigger>
                        <SelectContent>
                          {filterFields.map(field => (
                            <SelectItem key={field} value={field}>{field}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={condition.operator} onValueChange={(value) => updateFilterCondition(condition.id, 'operator', value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Operator" />
                        </SelectTrigger>
                        <SelectContent>
                          {filterOperators.map(operator => (
                            <SelectItem key={operator} value={operator}>{operator}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Input
                        placeholder="Value"
                        value={condition.value}
                        onChange={(e) => updateFilterCondition(condition.id, 'value', e.target.value)}
                        className="w-48"
                      />

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFilterCondition(condition.id)}
                        disabled={filterConditions.length === 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={addFilterCondition}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      Apply Filters
                    </Button>
                    <Button variant="ghost" size="sm">
                      Clear All
                    </Button>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Search and Actions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Search applications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {selectedRows.length > 0 && (
                    <Badge variant="secondary">
                      {selectedRows.length} selected
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  {selectedRows.length > 0 && (
                    <>
                      <Button variant="outline" size="sm">
                        Bulk Approve
                      </Button>
                      <Button variant="outline" size="sm">
                        Bulk Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
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
                          checked={selectedRows.length === filteredApplications.length}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Timetable ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Child's Civic Number</TableHead>
                      <TableHead>Child's Name</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Timetable Type</TableHead>
                      <TableHead>Requested Start</TableHead>
                      <TableHead>Contracted Time</TableHead>
                      <TableHead>Average Time</TableHead>
                      <TableHead>Rate Category</TableHead>
                      <TableHead className="w-12">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((application) => (
                      <TableRow key={application.id} className="hover:bg-slate-50">
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.includes(application.id)}
                            onCheckedChange={(checked) => handleSelectRow(application.id, checked)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{application.timetableId}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(application.status)}>
                            {application.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{application.childCivicNumber}</TableCell>
                        <TableCell className="font-medium">{application.childName}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            {application.unit}
                          </div>
                        </TableCell>
                        <TableCell>{application.startDate}</TableCell>
                        <TableCell>{application.endDate}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{application.timetableType}</Badge>
                        </TableCell>
                        <TableCell>{application.requestedStartDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-slate-400" />
                            {application.contractedTime}h
                          </div>
                        </TableCell>
                        <TableCell>{application.averageTime}h</TableCell>
                        <TableCell>{application.rateCategory}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timetable" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Timetable Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Timetable management interface will be implemented here. This will include:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-slate-600">
                <li>Schedule builder for individual children</li>
                <li>Recurring pattern management</li>
                <li>Holiday and exception handling</li>
                <li>Capacity management and conflict detection</li>
                <li>Bulk schedule updates</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="end-request" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>End Request Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">End request processing interface will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="replace-request" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Replacement Request Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">Replacement request processing interface will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rate-category" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rate Category & Average Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">Rate category and average time management interface will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reasontype" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reason Type Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">Reason type configuration and management interface will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlacementManagement;
