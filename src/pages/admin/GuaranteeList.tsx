
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Shield, Plus, Search, Filter, Users, Calendar } from 'lucide-react';
import AdmissionsTable from '@/components/admin/childcare/AdmissionsTable';
import { Admission } from '@/types/childcare';

const GuaranteeList = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Mock data for demonstration
  const mockAdmissions: Admission[] = [
    {
      id: '1',
      child: {
        id: '1',
        civicNumber: '20200521-1110',
        firstName: 'Knoura',
        lastName: 'Björnsson',
        fullName: 'Knoura Björnsson',
        unitId: '1',
        unitName: 'Månadens förskola',
        specialNeedsFlag: false
      },
      department: {
        id: '1',
        name: 'Månadens förskola',
        unitName: 'Förskola',
        capacity: 25,
        currentOccupancy: 20
      },
      admissionStart: '2023-11-20',
      endDate: '2024-06-15',
      startDate: '2023-11-20',
      status: 'active',
      changeStop: null,
      rateCategory: {
        id: '1',
        name: 'Standard',
        description: 'Standard rate'
      },
      averageTime: '40',
      reasonType: 'Arbete',
      timetable: {
        id: '1',
        schedulePattern: 'full-time',
        weeklyHours: 40,
        flexibleSchedule: false
      }
    }
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(mockAdmissions.map(admission => admission.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows(prev => [...prev, id]);
    } else {
      setSelectedRows(prev => prev.filter(rowId => rowId !== id));
    }
  };

  const handleEditChild = (admission: Admission) => {
    console.log('Edit child:', admission);
  };

  const handleViewAdmission = (admission: Admission) => {
    console.log('View admission:', admission);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="w-8 h-8 text-indigo-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Guarantee List</h1>
          <p className="text-slate-600">Manage statutory guarantee rights and create placement offers</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'list' | 'create')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Guarantee List
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Admission Offer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Applications in Guarantee List</span>
                <Badge variant="secondary">{mockAdmissions.length} applications</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="mb-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search by child civic number or name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All units" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All units</SelectItem>
                      <SelectItem value="månaden">Månadens förskola</SelectItem>
                      <SelectItem value="björnens">Björnens Förskola</SelectItem>
                      <SelectItem value="sunflower">Sunflower Preschool</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" />
                    More Filters
                  </Button>
                </div>
              </div>

              {/* Applications Table */}
              <AdmissionsTable
                admissions={mockAdmissions}
                selectedRows={selectedRows}
                onSelectAll={handleSelectAll}
                onSelectRow={handleSelectRow}
                onEditChild={handleEditChild}
                onViewAdmission={handleViewAdmission}
                sortField="childName"
                sortDirection="asc"
                onSort={() => {}}
                currentPage={1}
                totalPages={1}
                itemsPerPage={25}
                onPageChange={() => {}}
                onItemsPerPageChange={() => {}}
                activeTab="current"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Create Admission Offer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="mb-4">
                  <Plus className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  Create New Placement Offers
                </h3>
                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                  Use the "Create Offer" buttons in the Guarantee List to create placement offers for specific children, 
                  or select multiple applications for bulk offer creation.
                </p>
                <div className="flex items-center justify-center gap-4">
                  <Button 
                    onClick={() => setActiveTab('list')}
                    className="gap-2"
                  >
                    <Users className="w-4 h-4" />
                    Go to Guarantee List
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Bulk Create Offers
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GuaranteeList;
