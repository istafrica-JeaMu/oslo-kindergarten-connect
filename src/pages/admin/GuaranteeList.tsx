
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Shield, Plus, Calendar } from 'lucide-react';
import GuaranteeListTable from '@/components/admin/childcare/GuaranteeListTable';
import GuaranteeFilters from '@/components/admin/childcare/GuaranteeFilters';

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

const GuaranteeList = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  
  // Form state for creating offers
  const [offerForm, setOfferForm] = useState({
    childCivicNumber: '20200521-TF10',
    childName: 'Knurra Björnsson',
    areaName: '',
    cityDistrict: '',
    unit: 'Månadens förskola',
    department: '',
    operation: 'Barnehage',
    rateCategory: '',
    reasonType: 'Arbete',
    averageTime: '40',
    paragraphSet: '',
    startDate: '11/30/2023',
    latestAnswerDate: '06/27/2025'
  });

  // Mock data matching the images
  const mockApplications: GuaranteeApplication[] = [
    {
      id: '1',
      guaranteedDate: '01/01/2025',
      priority: '',
      application: 'Yes',
      offerCategory: 'Childcare application',
      civicNumber: '20200521-...',
      firstName: 'Knurra',
      lastName: 'Björnsson',
      birthdate: '05/21/2020',
      areaCode: '',
      areaName: 'Krugens vä...',
      cityDistrict: '',
      address: '',
      queueDate: '05/21/2020',
      requestedDate: '11/30/2023',
      process: ''
    },
    {
      id: '2',
      guaranteedDate: '01/01/2025',
      priority: '',
      application: 'Yes',
      offerCategory: 'Childcare application',
      civicNumber: '20180512-...',
      firstName: 'Lillan',
      lastName: 'Björnsson',
      birthdate: '05/12/2018',
      areaCode: '',
      areaName: 'Lillians väg ...',
      cityDistrict: '',
      address: '',
      queueDate: '05/12/2018',
      requestedDate: '05/31/2024',
      process: ''
    },
    {
      id: '3',
      guaranteedDate: '04/11/2025',
      priority: 'FÖRST I KÖN',
      application: 'Yes',
      offerCategory: 'Childcare application',
      civicNumber: '20221106-...',
      firstName: 'Mikaela',
      lastName: 'Nyström',
      birthdate: '11/06/2022',
      areaCode: '',
      areaName: 'Floristgatan...',
      cityDistrict: '',
      address: '',
      queueDate: '11/06/2022',
      requestedDate: '12/13/2024',
      process: ''
    }
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(mockApplications.map(app => app.id));
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

  const handleOfferFormChange = (field: string, value: string) => {
    setOfferForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateOffer = () => {
    console.log('Creating offer:', offerForm);
    // Here you would typically make an API call to create the offer
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
          <TabsTrigger value="list">Guarantee List</TabsTrigger>
          <TabsTrigger value="create">Create admission offer</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Guarantee List</h2>
            
            <GuaranteeFilters 
              isExpanded={filtersExpanded}
              onToggle={() => setFiltersExpanded(!filtersExpanded)}
            />

            <GuaranteeListTable
              applications={mockApplications}
              selectedRows={selectedRows}
              onSelectAll={handleSelectAll}
              onSelectRow={handleSelectRow}
              currentPage={1}
              totalPages={1}
              itemsPerPage={15}
              onPageChange={() => {}}
              onItemsPerPageChange={() => {}}
            />
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Offer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="childCivicNumber">Child civic number</Label>
                  <Input
                    id="childCivicNumber"
                    value={offerForm.childCivicNumber}
                    onChange={(e) => handleOfferFormChange('childCivicNumber', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="childName">Child name</Label>
                  <Input
                    id="childName"
                    value={offerForm.childName}
                    onChange={(e) => handleOfferFormChange('childName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="areaName">Area name (code)</Label>
                  <Input
                    id="areaName"
                    value={offerForm.areaName}
                    onChange={(e) => handleOfferFormChange('areaName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="cityDistrict">City district</Label>
                  <Input
                    id="cityDistrict"
                    value={offerForm.cityDistrict}
                    onChange={(e) => handleOfferFormChange('cityDistrict', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Units</Label>
                  <Select value={offerForm.unit} onValueChange={(value) => handleOfferFormChange('unit', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Månadens förskola">Månadens förskola</SelectItem>
                      <SelectItem value="Björnens förskola">Björnens förskola</SelectItem>
                      <SelectItem value="Sunflower Preschool">Sunflower Preschool</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select value={offerForm.department} onValueChange={(value) => handleOfferFormChange('department', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="småbarn">Småbarn (1-3 years)</SelectItem>
                      <SelectItem value="mellanålder">Mellanålder (3-5 years)</SelectItem>
                      <SelectItem value="förskolebarn">Förskolebarn (5-6 years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="operation">Operation</Label>
                  <Select value={offerForm.operation} onValueChange={(value) => handleOfferFormChange('operation', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Barnehage">Barnehage</SelectItem>
                      <SelectItem value="Arbete">Arbete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="rateCategory">Ratecategory</Label>
                  <Select value={offerForm.rateCategory} onValueChange={(value) => handleOfferFormChange('rateCategory', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rate category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="reduced">Reduced</SelectItem>
                      <SelectItem value="low-income">Low Income</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="reasonType">Reasontype</Label>
                  <Select value={offerForm.reasonType} onValueChange={(value) => handleOfferFormChange('reasonType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Arbete">Arbete</SelectItem>
                      <SelectItem value="Studier">Studier</SelectItem>
                      <SelectItem value="Annat">Annat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="averageTime">Averagetime</Label>
                  <Input
                    id="averageTime"
                    value={offerForm.averageTime}
                    onChange={(e) => handleOfferFormChange('averageTime', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="paragraphSet">Paragraph Set</Label>
                  <Select value={offerForm.paragraphSet} onValueChange={(value) => handleOfferFormChange('paragraphSet', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select paragraph set" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="special">Special</SelectItem>
                      <SelectItem value="temporary">Temporary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div></div>
                <div>
                  <Label htmlFor="startDate">Startdate (mm/dd/yyyy)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="startDate"
                      value={offerForm.startDate}
                      onChange={(e) => handleOfferFormChange('startDate', e.target.value)}
                    />
                    <Calendar className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="latestAnswerDate">Latest answer date (mm/dd/yyyy)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="latestAnswerDate"
                      value={offerForm.latestAnswerDate}
                      onChange={(e) => handleOfferFormChange('latestAnswerDate', e.target.value)}
                    />
                    <Calendar className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-4 mt-6">
                <Button variant="outline">Custom Offer</Button>
                <Button onClick={handleCreateOffer}>Save</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GuaranteeList;
